# Deploying to Render

Deploying this fork to Render on the **free plan**, against the Supabase
PostgreSQL database set up in `docs/supabase-postgres.md`. No code changes are
required — everything is driven by environment variables.

Start from `.env.render.example`, or let `render.yaml` declare the service.

> Render's plans and limits change. Every claim about the free plan below is
> worth checking against Render's current documentation before relying on it.

---

## 1. What the free plan costs you

Two accepted trade-offs. Neither loses data.

### The service sleeps

Free web services spin down after roughly 15 minutes without traffic and cold
start on the next request, taking something like 30-60 seconds. For a
single-user personal finance app this is a wait the first time you open it in a
day, not a blocker.

### Supabase can pause

Supabase free projects pause after **7 days of inactivity**, where activity
means database queries.

These two interact, which is the part worth understanding:

```
Render sleeps the service  ->  the app issues no queries
                           ->  Supabase sees no activity
                           ->  after 7 days, the project pauses
```

On a host that never sleeps this would not happen: ezBookkeeping's own cron jobs
(`RemoveExpiredTokens`, `CreateScheduledTransaction`) hit the database
periodically and keep it active by themselves. A sleeping service runs no cron.

**Pausing is not deletion.** The data is retained. Recovery is
*Supabase dashboard -> Restore project*, a minute or two, and everything returns
exactly as it was. Opening the app and logging in issues queries and resets the
7-day clock, so ordinary weekly use means you never see it.

Do not build a keep-alive for this. The obvious approach — pinging
`/healthz.json` on a schedule — does not work: that handler returns version and
status from memory and **never touches the database**
(`pkg/api/healths.go`). It would wake Render without generating the Supabase
activity that actually matters.

---

## 2. The PORT gotcha

Render injects a `PORT` environment variable and expects the service to listen
on it. **ezBookkeeping does not read `PORT`** — it reads `EBK_SERVER_HTTP_PORT`
(`pkg/settings/setting.go`, `[server] http_port`).

If the two disagree, the container starts fine, logs look healthy, and the
health check simply never passes — with no error explaining why.

Set both, to the same value:

```
PORT=8080
EBK_SERVER_HTTP_PORT=8080
EBK_SERVER_HTTP_ADDR=0.0.0.0
```

`8080` matches the `EXPOSE` line in the repository `Dockerfile`.

---

## 3. Storage: uploads stay disabled

Render's free plan has **no persistent disk**, so the filesystem is ephemeral —
anything written to `storage/` is gone on every deploy and every wake from
sleep, silently.

```
EBK_USER_AVATAR_PROVIDER=gravatar
EBK_USER_ENABLE_TRANSACTION_PICTURE=false
EBK_USER_ENABLE_CUSTOM_ICON=false
```

What this actually costs: you lose keeping receipt photos attached to a
transaction, and custom icons. Transactions, accounts, categories and tags are
unaffected — they live in PostgreSQL. Avatars work through Gravatar. **AI
receipt recognition still works**, because it processes the image in memory and
never touches object storage.

### Why `gravatar` and not an empty value

An empty environment variable **cannot** clear a setting.
`getConfigItemStringValue` (`pkg/settings/setting.go:1426`) treats it as unset
and falls back to the INI:

```go
environmentValue := getConfigItemValueFromEnvironment(sectionName, itemName)

if len(environmentValue) > 0 {   // "" fails this, so the INI wins
    return environmentValue
}
```

Verified behaviour:

| Value | Result |
|---|---|
| `EBK_USER_AVATAR_PROVIDER=` (empty) | Falls back to the INI → stays `internal` |
| `EBK_USER_AVATAR_PROVIDER=none` | Startup aborts: `invalid avatar provider` |
| `EBK_USER_AVATAR_PROVIDER=gravatar` | Works → `AvatarProvider="gravatar"` |

This applies to **every** string setting: no `EBK_*` variable can blank a value.

### Enabling uploads later

Two routes, both a pure configuration change:

1. **S3-compatible storage.** Set `EBK_STORAGE_TYPE=minio` and the
   `EBK_STORAGE_MINIO_*` variables. Cloudflare R2, Backblaze B2, AWS S3, Wasabi
   and self-hosted MinIO all work.
2. **A Render paid plan with a persistent disk** mounted at
   `/ezbookkeeping/storage`, keeping `local_filesystem`. Simplest of all, but a
   service with a disk cannot run more than one instance — which is already the
   constraint here anyway.

**Supabase Storage does not work.** Its S3 API is served only under the path
`/storage/v1/s3`, and the `minio-go` client rejects endpoints carrying a path
(`utils.go:163`: `Endpoint url cannot have fully qualified paths.`). Probing
confirmed the host root returns `404 Invalid Storage request` while the path
returns a well-formed S3 error. Making it work would mean patching
`pkg/storage/minio_storage.go` and diverging from upstream.

---

## 4. Deployment steps

### Option A — Blueprint (recommended)

`render.yaml` in the repository root declares the whole service. In Render:
**New → Blueprint → connect `LuisUmina/Spendly` → branch `personal`**.

Render prompts for every variable marked `sync: false`, so no secret is ever
committed:

- `EBK_DATABASE_USER`
- `EBK_DATABASE_PASSWD`
- `EBK_SECURITY_SECRET_KEY`
- `EBK_SERVER_DOMAIN` and `EBK_SERVER_ROOT_URL`

> If Render rejects `runtime: docker`, older Blueprint versions spell this key
> `env: docker`. Check the current Blueprint reference.

### Option B — manual service

**New → Web Service → connect the repo → branch `personal`**, with:

| Setting | Value |
|---|---|
| Runtime | Docker (root `Dockerfile`) |
| Region | **Oregon** |
| Plan | Free |
| Health check path | `/healthz.json` |

Then paste the variables from `.env.render.example`.

### Region

Pick **Oregon**. The Supabase project is in `us-west-2`, which is Oregon, so
this keeps the app and the database in the same place. Every query crosses that
gap, and the session pooler adds a round trip of its own — a cross-country
region choice is felt on every page load.

### The build is heavy

The `Dockerfile` compiles the Go backend with CGO and static linking, then the
frontend with Node. On a small builder it can exhaust memory. If the Node step
fails, pass a bigger heap as a build argument — the Dockerfile already accepts it:

```
BUILD_NODE_OPTIONS=--max-old-space-size=2048
```

### After the first deploy

The hostname does not exist until the service does, so `EBK_SERVER_DOMAIN` and
`EBK_SERVER_ROOT_URL` are wrong on the first deploy. Set them to the real
`https://<name>.onrender.com/` and redeploy. Until then, verification emails,
the mobile QR code and OAuth 2.0 callbacks all point somewhere wrong.

### Schema

`EBK_DATABASE_AUTO_UPDATE_DATABASE=true` runs `SyncStructs` at boot, so the
schema is created or updated on deploy. The tables already exist from local
setup, so the first deploy finds them in place and changes nothing.

---

## 5. Constraints to respect

**Do not scale beyond one instance without changing `EBK_UUID_SERVER_ID`.** The
UUID generator is snowflake-style and keys on that value (0-255, default `0`).
Two instances sharing it generate colliding UUIDs across every table. The free
plan runs a single instance, so this is only a concern if you upgrade.

**Two things are per-instance, not shared.** The duplicate-submission checker
and the login rate limiter both use in-memory stores
(`duplicate_checker.checker_type = in_memory`, the only type implemented).

**Registration is open by default.** `EBK_USER_ENABLE_REGISTER=true` means
anyone reaching the URL can create an account. Set it to `false` once your own
account exists.

---

## 6. Post-deploy checklist

1. `https://<name>.onrender.com/healthz.json` returns `"status":"ok"`
2. Logs show `"DatabaseType":"postgres"` with the pooler host — if it says
   `sqlite3`, the environment variables did not apply
3. Logs show `"SecretKeyNoSet":false` — if true, `EBK_SECURITY_SECRET_KEY` is
   missing and the built-in default key is in use
4. Log in with the account created locally; it is the same Supabase database
5. Update `EBK_SERVER_DOMAIN` / `EBK_SERVER_ROOT_URL` to the real hostname, redeploy
6. Set `EBK_USER_ENABLE_REGISTER=false` and redeploy
7. Enroll 2FA, once `EBK_SECURITY_SECRET_KEY` is final

Boot logs print the full effective configuration with secrets masked as `****`
(`cmd/initializer.go:151`). It is the fastest way to confirm what applied.
