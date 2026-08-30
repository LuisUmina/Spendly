# AGENTS.md

Guidance for AI agents working in this repository.

## Repository context

This is a **fork of [`mayswind/ezbookkeeping`](https://github.com/mayswind/ezbookkeeping)** (MIT). The upstream
code is a self-hosted personal finance app: a monolithic Go backend (Gin + xorm) serving a prebuilt Vue 3 SPA.

| | |
|---|---|
| `origin` | `LuisUmina/Spendly` |
| `upstream` | `mayswind/ezbookkeeping` |
| Working branch | `personal` |
| Upstream mirror branch | `main` |
| Go module | `github.com/mayswind/ezbookkeeping` |

The name "Spendly" currently exists only at the repository/folder level. The code, module path, binary and
configuration are all still `ezbookkeeping`. **This is intentional** — see "Upstream compatibility".

## Core rules

### 1. All work goes on `personal`

- Never commit directly to `main`. `main` exists to track upstream so `merge`/`rebase` stays clean.
- Check the branch before starting: `git rev-parse --abbrev-ref HEAD`.
- Do not `push` or open PRs unless explicitly asked.
- Never push to `upstream`.

### 2. Maintain upstream compatibility

This fork must be able to absorb upstream changes indefinitely. Every line that diverges from upstream is a
future merge conflict. Therefore:

**Never do without being explicitly asked:**

- Rename the Go module (`github.com/mayswind/ezbookkeeping`). It would touch every import in the project and
  make any merge unrecoverable.
- Rename the binary, `package.json:name`, `conf/ezbookkeeping.ini`, or the `/ezbookkeeping/` paths in the Dockerfile.
- Reformat, reorder imports, or "clean up" files that are not being modified for another reason.
- Update dependencies (`go.mod`, `package.json`) on your own initiative.
- Change the directory structure, move files, or reorganize packages.
- Rewrite upstream code in a different style because it seems better.

**Always prefer:**

- The smallest diff that solves the problem.
- New files over modifying existing ones, where reasonable. A new file never causes a merge conflict.
- Extending the hook points upstream already provides instead of patching its code:
  - `docker/custom-backend-pre-setup.sh` and `docker/custom-frontend-pre-setup.sh` — build hooks already invoked
    by `docker/{backend,frontend}-build-pre-setup.sh` when present and executable.
  - New keys in `conf/ezbookkeeping.ini` plus `EBK_*` variables (the settings system picks them up automatically).
- Following the conventions the file being edited already uses, even when they are not your preferred ones.

If a change requires touching upstream code broadly, **say so before doing it** and propose alternatives.

### 3. Never commit secrets

**`conf/ezbookkeeping.ini` IS TRACKED IN GIT.** It is not covered by `.gitignore`. This is the easiest mistake
to make in this repo.

Never write real values into `conf/ezbookkeeping.ini` for:
`security.secret_key`, `database.passwd`, `mail.smtp_passwd`, `storage.minio_secret_access_key`,
`storage.webdav_password`, `auth.oauth2_client_secret`, any `*_api_key` / `*_token` in the `[llm*]` sections,
`map.amap_application_secret`.

Use the environment override system in `pkg/settings/setting.go` instead:

| Form | Pattern | Example |
|---|---|---|
| Value from env | `EBK_<SECTION>_<KEY>` | `EBK_DATABASE_PASSWD=...` |
| Value from file | `EBKCFP_<SECTION>_<KEY>` | `EBKCFP_DATABASE_PASSWD=/run/secrets/db_pw` |

Precedence: file (`EBKCFP_*`) > environment (`EBK_*`) > INI > code default. Works for any key in any section,
without writing code.

Additional rules:

- `.env` files are in `.gitignore` (`.env`, `**/.env`). That is the right place for local credentials.
  Start from `.env.example`, which *is* committed and therefore never holds real values.
- The binary does not read `.env` on its own. Use `scripts/with-env.ps1` / `scripts/with-env.sh` to inject it.
  Supabase setup is documented in `docs/supabase-postgres.md`.
- Do not create new config files holding secrets that `.gitignore` does not already cover.
- `data/`, `log/` and `storage/` are ignored and hold user data. Never force them into a commit, and never
  paste their contents into commits, issues or messages.
- The SQLite database (`data/ezbookkeeping.db`) contains password hashes and TOTP secrets. Do not copy it
  outside `data/`.
- Review the diff before committing: `git diff --cached`. If `conf/ezbookkeeping.ini` shows up, verify it
  carries no real values.
- If a secret has already been committed, report it immediately and do not rewrite history without approval.

## Commands

### Development (two processes)

```bash
# terminal 1 — backend on :8080
go run ezbookkeeping.go server run

# terminal 2 — frontend on :8081 with HMR
npm install
npm run serve
```

Vite (`:8081`) proxies `/api`, `/mcp`, `/oauth2`, `/avatar`, `/pictures`, `/icons`, `/qrcode`, `/proxy`,
`/_AMapService` and `*/server_settings.js` to `127.0.0.1:8080`. **Always work against `:8081`.**
The port is `strictPort: true` — if it is taken, Vite fails instead of picking another.

### Verification (run before calling work done)

```bash
npm run lint      # vue-tsc --noEmit && eslint . --fix
npm run test      # vitest run
go vet ./...
go test ./...
```

### Full build

```powershell
.\build.ps1 package -Output spendly.zip   # Windows PowerShell
```

```bash
./build.sh package -o spendly.tar.gz      # Linux / macOS
./build.sh docker                         # Docker image
```

Types: `backend`, `frontend`, `package`, `docker`. Flags: `--no-lint`, `--no-test`.

**Non-obvious requirement:** the backend build requires `gcc` on the PATH and forces `CGO_ENABLED=1` with
static linking, because of the `mattn/go-sqlite3` driver. On Windows this means MinGW/TDM-GCC. It applies even
when using PostgreSQL, because the SQLite driver is compiled regardless.

### Binary CLI

```
ezbookkeeping server run [--conf-path FILE] [--no-boot-log]
ezbookkeeping database update
ezbookkeeping userdata user-add --username X --email Y --nickname Z --password W --default-currency USD
ezbookkeeping userdata user-modify-password --username X --password Y
ezbookkeeping cronjobs | security | utility
```

`userdata user-add` is how to create test users without going through web registration.

## Architecture map

```
ezbookkeeping.go          entrypoint, urfave/cli v3
cmd/
  initializer.go          shared boot: config → datastore → log → storage → llm → uuid →
                          duplicatechecker → avatars → mail → exchangerates
  webserver.go            gin: routes + middlewares. This is the API map (~35 KB)
  database.go             SyncStructs (xorm struct-driven migration, additive)
  user_data.go            user administration commands
pkg/
  api/                    HTTP handlers, one file per domain
  services/               business logic
  datastore/              xorm engine group + connection
  models/                 structs = database schema
  middlewares/            JWT (header/cookie/querystring), per-IP rate limit, request-id, recovery
  settings/               INI loading + EBK_*/EBKCFP_* overrides
  core/                   cross-cutting types (Context, TokenClaims, errors)
src/                      Vue 3 + TypeScript + Pinia SPA
  views/desktop/          desktop UI (Vuetify 4)
  views/mobile/           mobile UI (Framework7 9)
  views/base/             logic shared by both
  stores/                 Pinia stores
  models/                 frontend domain types
  lib/services.ts         axios client + token refresh interceptor
  lib/userstate.ts        token and session state in localStorage
```

There are **three frontend entrypoints**: `index.html` (device router), `desktop.html`, `mobile.html`.
A UI change usually has to be applied in both variants, or in `views/base/` when it is shared logic.

### Details that are commonly misread

- **`security.secret_key` does NOT sign the JWTs.** Each token is signed with its own random secret stored in
  the `TokenRecord` row in the database (`pkg/services/tokens.go`). `secret_key` is used to encrypt 2FA TOTP
  secrets, hash the app-lock passcode, and derive request IDs.
- Validating a token means a database query on every request. Deleting the row revokes the session instantly.
- Passwords: PBKDF2-HMAC-SHA256, 10,000 iterations, 48 bytes, per-user salt (`pkg/utils/strings.go`).
- **There are no migration files.** The schema is synced from the structs in `pkg/models` via xorm's
  `SyncStructs` at boot (`auto_update_database = true`). Changing a struct changes the schema. It is additive:
  it does not drop or rename columns.
- PostgreSQL: `database.host` must include a port (`127.0.0.1:5432`) because it goes through `net.SplitHostPort`.
  The INI default is `127.0.0.1:3306`, which is the MySQL port.
- The backend generates `/server_settings.js` at runtime to tell the frontend which features are enabled.
  Adding a feature toggle means touching `pkg/api/server_settings.go` and `src/lib/server_settings.ts`.

## Code style

Respect `.editorconfig`:

- Go: **tabs**, indent 4. Standard formatting (`gofmt`).
- TypeScript / Vue / SCSS: **4 spaces**.
- `package.json`: 2 spaces.
- UTF-8, no trailing whitespace, final newline.

Project conventions worth keeping:

- Go handlers log with a `[package.function]` prefix — follow that format.
- Domain errors are defined in `pkg/errs`, not created inline with `errors.New`.
- Go doc comments on exported functions start with the function name.
- User-facing text always goes to `src/locales/` (i18n), never hardcoded in a component.
- **Write everything in English** — code, comments, docs, commit messages, and any file added to this fork.
  Upstream is English-only; keeping one language avoids a mixed-language codebase.

## Before finishing a task

1. `npm run lint` and `npm run test` if `src/` was touched.
2. `go vet ./...` and `go test ./...` if Go was touched.
3. `git status` and `git diff` — confirm there are no unexpected files and no real values in
   `conf/ezbookkeeping.ini`.
4. Check the diff is the minimum necessary: no accidental reformatting, no stray line changes.
