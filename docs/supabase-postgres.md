# PostgreSQL with Supabase

How to point this fork at a PostgreSQL database hosted on Supabase, using
environment variables only. No code or UI changes required.

---

## 1. How ezBookkeeping configures PostgreSQL

### Where the configuration lives

The `[database]` section of `conf/ezbookkeeping.ini` is read by
`loadDatabaseConfiguration` in `pkg/settings/setting.go:721`:

| INI key | Environment variable | Notes |
|---|---|---|
| `type` | `EBK_DATABASE_TYPE` | `mysql`, `postgres` or `sqlite3`. Validated; anything else → `ErrDatabaseTypeInvalid` |
| `host` | `EBK_DATABASE_HOST` | **Must include a port**, or be a socket path starting with `/` |
| `name` | `EBK_DATABASE_NAME` | |
| `user` | `EBK_DATABASE_USER` | |
| `passwd` | `EBK_DATABASE_PASSWD` | |
| `ssl_mode` | `EBK_DATABASE_SSL_MODE` | Only read when `type = postgres`. **Not validated** |
| `max_idle_conn` | `EBK_DATABASE_MAX_IDLE_CONN` | uint16, default 2 |
| `max_open_conn` | `EBK_DATABASE_MAX_OPEN_CONN` | uint16, default 0 = unlimited |
| `conn_max_lifetime` | `EBK_DATABASE_CONN_MAX_LIFETIME` | seconds, default 14400 (4 h) |
| `log_query` | `EBK_DATABASE_LOG_QUERY` | |
| `auto_update_database` | `EBK_DATABASE_AUTO_UPDATE_DATABASE` | default true |

Every key also accepts `EBKCFP_DATABASE_<KEY>`, whose value is the **path to a
file** holding the content. Precedence: `EBKCFP_*` > `EBK_*` > INI > default.

### How the connection string is built

`getPostgresConnectionString` in `pkg/datastore/datastore_container.go:130`:

```go
// TCP
"postgres://%s:%s@%s:%s/%s?sslmode=%s"   // user, passwd, host, port, name, ssl_mode

// Unix socket (host starts with "/")
"postgres:///%s?sslmode=%s&host=%s&user=%s&password=%s"
```

Practical consequences:

- The host goes through `net.SplitHostPort()`. **Without a port it returns
  `ErrDatabaseHostInvalid`** — the INI default (`127.0.0.1:3306`) is the MySQL
  port and must be changed to `5432`.
- User and password are encoded with `url.QueryEscape`; the database name is not.
- `ssl_mode` is interpolated **raw** at the end of the query string. It is not
  validated against any list, so it accepts any value `lib/pq` understands:
  `disable`, `allow`, `prefer`, `require`, `verify-ca`, `verify-full`.
  Empty behaves like `require`.

### ORM and schema

- Driver: `lib/pq` v1.12.3 (pure Go, no cgo).
- ORM: xorm, via `NewEngineGroup(...)` with `RoundRobinPolicy`. The three
  logical `DataStore` instances (`UserStore`, `TokenStore`, `UserDataStore`)
  currently share the same engine.
- Postgres-specific: `SetSavePoint` / `RollbackToSavePoint`
  (`pkg/datastore/database.go:47`) for nested transactions.
- **There are no migration files.** With `auto_update_database = true`, boot
  runs xorm's `SyncStructs` over every struct in `pkg/models`. It is additive:
  it creates new tables and columns but never drops or renames.

---

## 2. Choosing the connection type in Supabase

Supabase exposes three endpoints. **They are not interchangeable for this project.**

| Type | Host | User | Recommendation |
|---|---|---|---|
| **Session pooler** | `aws-0-<region>.pooler.supabase.com:5432` | `postgres.<ref>` | ✅ **Use this** |
| Transaction pooler | `aws-0-<region>.pooler.supabase.com:6543` | `postgres.<ref>` | ⚠️ See below |
| Direct connection | `db.<ref>.supabase.co:5432` | `postgres` | ⚠️ IPv6 only |

**Why the session pooler (5432):**

- It is IPv4, so it works from any network and from CI runners.
- It keeps the session pinned to the connection, so **prepared statements work**.
  `lib/pq` uses the extended query protocol and prepares statements for every
  parameterized query.

**Why not the transaction pooler (6543) by default:** in transaction mode the
server connection is recycled between transactions. `lib/pq` can fail with
errors like `prepared statement "..." already exists`. If you want to use it,
test it under real load before settling on it.

**Why not the direct connection:** since 2024 `db.<ref>.supabase.co` resolves
to IPv6 only unless you buy the IPv4 add-on. If your network has no IPv6, it
will not connect.

The exact values are in the dashboard: **Project Settings → Database →
Connection string → mode**.

---

## 3. Getting started

### Step 1 — create the environment file

```bash
cp .env.example .env
```

`.env` is gitignored; `.env.example` holds no credentials and is committed.
**Never write real values into `conf/ezbookkeeping.ini`: that file is tracked
in Git.**

### Step 2 — fill in `.env`

```ini
EBK_DATABASE_TYPE=postgres
EBK_DATABASE_HOST=aws-0-us-east-1.pooler.supabase.com:5432
EBK_DATABASE_NAME=postgres
EBK_DATABASE_USER=postgres.yourprojectref
EBK_DATABASE_PASSWD=your-database-password
EBK_DATABASE_SSL_MODE=require
EBK_DATABASE_MAX_OPEN_CONN=10
EBK_DATABASE_CONN_MAX_LIFETIME=1800
EBK_SECURITY_SECRET_KEY=<openssl rand -base64 32>
```

About `EBK_SECURITY_SECRET_KEY`: it encrypts 2FA TOTP secrets and hashes the
app-lock passcode. Set it **before** first boot; changing it later invalidates
already-registered 2FA enrollments. If left empty the literal `"ezbookkeeping"`
is used and boot logs a warning.

### Step 3 — create the schema in Supabase

```powershell
.\scripts\with-env.ps1 go run ezbookkeeping.go database update
```

```bash
./scripts/with-env.sh go run ezbookkeeping.go database update
```

This runs `SyncStructs` and creates all the tables. It doubles as a
connectivity test: if the credentials or host are wrong, it fails here.

### Step 4 — start

```powershell
.\scripts\with-env.ps1 go run ezbookkeeping.go server run
```

And in another terminal, the frontend:

```bash
npm run serve      # :8081, proxies to the backend on :8080
```

### Step 5 — create a user

Web registration is open by default (`enable_register = true`), but the CLI
works too:

```powershell
.\scripts\with-env.ps1 go run ezbookkeeping.go userdata user-add `
    --username demo --email demo@example.com --nickname Demo `
    --password "change-me" --default-currency USD
```

---

## 4. Why the `with-env` scripts are needed

The Go binary **does not read `.env` files**. Environment configuration is
resolved with `os.Getenv` (`pkg/settings/setting.go:1527`), so a `.env` file on
its own does nothing.

`scripts/with-env.ps1` and `scripts/with-env.sh` load the file into the child
process environment and run whatever command you pass. They add no
dependencies, touch no Go code, and write nothing to the user environment.

Equivalent alternatives, if you would rather not use them:

- Export the variables manually in the terminal session.
- Define them in the IDE run configuration.
- In Docker, `--env-file .env` or `environment:` in compose.

---

## 5. Verified notes

Checked by running this repository's code, not inferred:

**The pooler responds correctly with `sslmode=require`.** Booting with a fake
`project-ref`, the returned error is
`pq: (ENOTFOUND) tenant/user postgres.fakeprojectref not found (XX000)` — a
protocol-level response from Supavisor. That means DNS, TCP, TLS and the
handshake all worked; only the credentials were fake. That specific error means
"wrong user or project-ref", not a network problem.

**Do not use spaces in the database password.** The code uses
`url.QueryEscape` for the password, which encodes a space as `+`. In the
*userinfo* section of a URL, `+` is a literal `+`, not a space, so the password
would arrive wrong. Special characters without spaces (`@ / : ? # [ ] & = +`)
are correctly encoded as `%XX`. This is an upstream limitation; the practical
fix is to generate a password without spaces.

**The dotted pooler username works.** `postgres.abcdefghijklmnop` passes through
`url.QueryEscape` intact and Supavisor parses it correctly as `tenant/user`.

**A host without a port fails explicitly** with `database host is invalid`.

**Escape hatch for extra parameters.** Because `ssl_mode` is interpolated raw,
additional parameters can be smuggled in:

```ini
EBK_DATABASE_SSL_MODE=require&connect_timeout=10
```

produces `?sslmode=require&connect_timeout=10`, which `lib/pq` parses fine. It
is the only way to pass `sslrootcert` if you wanted `verify-full` with the
Supabase CA. It is a trick that depends on the string format: if upstream
changes `getPostgresConnectionString`, it breaks. Use it only if you need it.

**You can build without cgo if you only use PostgreSQL.** `lib/pq` is pure Go;
the one requiring `gcc` is `mattn/go-sqlite3`. Verified in this repo:

```bash
CGO_ENABLED=0 go build -o ezbookkeeping.exe ezbookkeeping.go
CGO_ENABLED=0 go test ./pkg/datastore/...
```

Both compile and pass. This is a fallback for machines without a 64-bit
toolchain, where cgo builds fail with
`cc1.exe: sorry, unimplemented: 64-bit mode not compiled in`.

The resulting binary **cannot use SQLite** (the driver becomes a stub that fails
at runtime), so prefer a real toolchain when available. This workstation has
WinLibs MinGW-w64 (gcc 16.1.0 x86_64) installed; `run-backend.ps1` in the repo
root puts it on the PATH, and `CGO_ENABLED=1 go test ./...` passes with it. For
distribution builds, keep using `build.sh` / `build.ps1`, which force
`CGO_ENABLED=1`.

**Connection limits matter.** The default `max_open_conn = 0` is unlimited,
which burns through the pooler quota fast. A `conn_max_lifetime` of 4 h is too
long: the pooler closes idle connections sooner and you end up handing out dead
ones. That is why `.env.example` suggests 10 and 1800.

---

## 6. Troubleshooting

| Error | Cause |
|---|---|
| `database host is invalid` | Missing port in `EBK_DATABASE_HOST` |
| `pq: (ENOTFOUND) tenant/user ... not found` | Wrong `EBK_DATABASE_USER`: with the pooler it must be `postgres.<ref>` |
| `pq: password authentication failed` | Wrong password, or it contains spaces |
| `dial tcp ... connect: network is unreachable` | Direct connection over IPv6 without IPv6 support → use the pooler |
| `pq: SSL is not enabled on the server` | `ssl_mode = disable` against Supabase → use `require` |
| `prepared statement ... already exists` | Transaction pooler (6543) → switch to the session pooler (5432) |
| `cc1.exe: sorry, unimplemented: 64-bit mode` | 32-bit gcc on the PATH → use the 64-bit toolchain (`run-backend.ps1` sets it up), or `CGO_ENABLED=0` for Postgres-only development |

To inspect the effective configuration, boot dumps the full config to the log
with secrets masked as `****` (`cmd/initializer.go:151`). It is the fastest way
to confirm which variables were applied.
