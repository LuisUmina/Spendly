# Deploying to Koyeb

Deploying this fork to Koyeb with the Supabase PostgreSQL database configured in
`docs/supabase-postgres.md`. No code changes are required — everything is driven
by environment variables.

Start from `.env.koyeb.example`.

---

## 1. Supabase Storage does not work as the file backend

**Verified: it cannot be used.** This section records the evidence so the
question does not get reopened.

ezBookkeeping stores avatars, transaction pictures and custom icons through an
object storage backend. The `minio` backend speaks S3, so Supabase Storage's
S3-compatible endpoint looks like a natural fit. It is not.

### The blocker

`pkg/storage/minio_storage.go` builds its client with `minio.New(endpoint, ...)`.
In `minio-go` v7.2.1, `utils.go:163`:

```go
if endpointURL.Path != "/" && endpointURL.Path != "" {
    return errInvalidArgument("Endpoint url cannot have fully qualified paths.")
}
```

The client rejects any endpoint carrying a path. Supabase's S3 API is only
served under one:

| URL | Result |
|---|---|
| `https://<ref>.storage.supabase.co/` | `HTTP 404` — `Invalid Storage request` |
| `https://<ref>.storage.supabase.co/storage/v1/s3/` | `HTTP 403` — S3 XML `AccessDenied` |

The 403 with a well-formed S3 error body is the S3 API answering. It exists
**only** under `/storage/v1/s3`. The root, which is the only form `minio-go`
accepts, is not an S3 endpoint at all.

Passing the full endpoint fails at client construction:

```
<your-project-ref>.storage.supabase.co/storage/v1/s3
  -> Endpoint url cannot have fully qualified paths.
```

Making this work would require changing `pkg/storage/minio_storage.go`, which
means diverging from upstream in a file upstream actively maintains. Not worth
it for a storage backend with several drop-in alternatives.

### Endpoint shapes that do work

Checked against the same `minio.New` validation:

| Provider | Endpoint | Accepted |
|---|---|---|
| Cloudflare R2 | `<account_id>.r2.cloudflarestorage.com` | ✅ |
| Backblaze B2 | `s3.<region>.backblazeb2.com` | ✅ |
| AWS S3 | `s3.<region>.amazonaws.com` | ✅ |
| Wasabi | `s3.<region>.wasabisys.com` | ✅ |
| Self-hosted MinIO | `host:9000` | ✅ |
| **Supabase Storage** | `<ref>.storage.supabase.co/storage/v1/s3` | ❌ |

### The minio backend itself is fine

An end-to-end round trip through `MinIOObjectStorage` against an in-process S3
server confirms the code path is correct:

```
UPLOAD   transaction_pictures/1234567890.png -> OK (82 bytes)
EXISTS   -> OK
DOWNLOAD transaction_pictures/1234567890.png -> OK (82 bytes)
BYTES    identical -> OK
IMAGE    decoded correctly: 8x8 PNG
DELETE   -> OK
```

Object keys are built correctly as `<bucket>/<prefix>/<file>`. So pointing
`EBK_STORAGE_MINIO_*` at R2 or B2 should work; only Supabase is excluded, and
only because of the endpoint path.

> This ran against an in-process S3 server, not a live R2 account. It proves the
> application's storage code is correct, not that any given provider is
> configured correctly.

---

## 2. Choosing a storage strategy

Koyeb's filesystem is **ephemeral**. Anything written to `storage/` is gone on
the next redeploy, restart or rescale — silently, with no error. Only the
database is durable, because it lives in Supabase.

**Option A — S3-compatible provider.** Keeps avatars and transaction pictures
working. Cloudflare R2 pairs well: S3-compatible, no egress fees, and a free
tier. Uncomment the Option A block in `.env.koyeb.example`.

**Option B — disable uploads.** No external dependency, no silent data loss.
This is the default in the template so that a first deploy cannot lose files:

```
EBK_USER_AVATAR_PROVIDER=gravatar
EBK_USER_ENABLE_TRANSACTION_PICTURE=false
EBK_USER_ENABLE_CUSTOM_ICON=false
```

Everything else — transactions, accounts, categories, tags — is unaffected. It
all lives in PostgreSQL.

Switching from B to A later is just an environment variable change.

### Why `gravatar` and not an empty value

An empty environment variable **cannot** clear a setting. `getConfigItemStringValue`
in `pkg/settings/setting.go:1426` treats it as unset and falls back to the INI:

```go
environmentValue := getConfigItemValueFromEnvironment(sectionName, itemName)

if len(environmentValue) > 0 {   // "" fails this, so the INI wins
    return environmentValue
}
```

Verified behaviour for the avatar provider:

| Value | Result |
|---|---|
| `EBK_USER_AVATAR_PROVIDER=` (empty) | Falls back to the INI → stays `internal` |
| `EBK_USER_AVATAR_PROVIDER=none` | Startup aborts: `invalid avatar provider` |
| `EBK_USER_AVATAR_PROVIDER=gravatar` | Works → `AvatarProvider="gravatar"` |
| `EBK_USER_AVATAR_PROVIDER=internal` | Works, but needs object storage |

So through environment variables the provider cannot be turned off, only
switched. `gravatar` is served externally and writes nothing to disk, which is
what makes it safe on an ephemeral filesystem.

This applies to **every** string setting, not just this one: no `EBK_*` variable
can set a value to empty. Blanking a setting requires editing the INI, and
`conf/ezbookkeeping.ini` is tracked in Git.

---

## 3. Deployment steps

### 3.1 Create the service

Koyeb → **Create Service** → **GitHub** → pick `LuisUmina/Spendly`, branch
`personal`.

Set the builder to **Dockerfile** (the repo root `Dockerfile`), not buildpacks.
The build is heavy: it compiles the Go backend with CGO and static linking, then
the frontend with Node. On a small builder it can exhaust memory. The Dockerfile
accepts `BUILD_NODE_OPTIONS` as a build arg if Node needs a bigger heap:

```
BUILD_NODE_OPTIONS=--max-old-space-size=2048
```

### 3.2 Port and health check

| Setting | Value |
|---|---|
| Port | `8080` |
| Protocol | HTTP |
| Health check path | `/healthz.json` |

`/healthz.json` is a real endpoint (`cmd/webserver.go:213`) returning
`{"result":{"status":"ok"},"success":true}`.

### 3.3 Region

The Supabase project is in **us-west-2 (Oregon)**. Pick the Koyeb region
geographically closest to it — every query crosses that gap, and the session
pooler adds a round trip of its own. Check Koyeb's current region list; if there
is no US West region, consider moving the Supabase project instead, since it is
still small.

### 3.4 Environment variables

Copy from `.env.koyeb.example`. Mark these as Koyeb **Secrets**, never plain
variables:

- `EBK_DATABASE_PASSWD`
- `EBK_SECURITY_SECRET_KEY`
- `EBK_STORAGE_MINIO_ACCESS_KEY_ID` and `EBK_STORAGE_MINIO_SECRET_ACCESS_KEY` (Option A only)

After the first deploy, update `EBK_SERVER_DOMAIN` and `EBK_SERVER_ROOT_URL` to
the real Koyeb hostname and redeploy. They are wrong until you do, which breaks
email links, the mobile QR code and OAuth 2.0 callbacks.

### 3.5 Schema

`EBK_DATABASE_AUTO_UPDATE_DATABASE=true` runs `SyncStructs` at boot, so the
schema is created or updated on deploy. The tables already exist from local
setup, so the first deploy finds them in place and changes nothing.

To control it manually instead, set it to `false` and run
`ezbookkeeping database update` before rolling out.

---

## 4. Constraints to respect

**Do not enable autoscaling without changing `EBK_UUID_SERVER_ID`.** The UUID
generator is snowflake-style and keys on that value (0-255, default `0`). Two
instances sharing it generate colliding UUIDs across every table. Koyeb has no
per-instance ordinal to derive it from, so a single instance is the safe
configuration.

**Two more things are per-instance, not shared.** The duplicate-submission
checker and the login rate limiter both use in-memory stores
(`duplicate_checker.checker_type = in_memory`, the only type implemented). With
multiple instances, both become per-instance and their guarantees weaken.

**Connection budget.** `instances x EBK_DATABASE_MAX_OPEN_CONN` must stay under
the Supabase pooler quota. At `10` with one instance there is plenty of room.

**Registration is open by default.** `EBK_USER_ENABLE_REGISTER=true` means
anyone reaching the URL can create an account. Set it to `false` once your own
account exists.

**Supabase free-tier pausing.** Projects pause after 7 days of inactivity. A
deployed app holding connections counts as activity, so this stops being a
concern once Koyeb is running — but it applies to any gap before then.

---

## 5. Post-deploy checklist

1. `https://<your-app>.koyeb.app/healthz.json` returns `"status":"ok"`
2. Boot logs show `"DatabaseType":"postgres"` with the pooler host — if it says
   `sqlite3`, the environment variables did not apply
3. Boot logs show `"SecretKeyNoSet":false` — if true, `EBK_SECURITY_SECRET_KEY`
   is missing and the default key is in use
4. Log in with the account created locally; the data is the same Supabase database
5. Set `EBK_USER_ENABLE_REGISTER=false` and redeploy
6. Enroll 2FA, once `EBK_SECURITY_SECRET_KEY` is final

The boot log prints the full effective configuration with secrets masked as
`****` (`cmd/initializer.go:151`). It is the fastest way to confirm what applied.
