#!/usr/bin/env bash
# Idempotent dependency refresh for Spendly / ezBookkeeping Cloud Agent environments.
# Runs after the repository is checked out. Safe to run repeatedly.
#
# Local development defaults to SQLite and needs no secrets. For the Supabase /
# PostgreSQL path, copy .env.example to .env; the terminals below inject it with
# scripts/with-env.sh (see AGENTS.md and docs/supabase-postgres.md).
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "==> Downloading Go module dependencies"
go mod download

echo "==> Installing frontend (npm) dependencies"
npm install

echo "==> Ensuring runtime directories exist"
mkdir -p data storage log

# Warm the Go build/module cache and confirm the backend compiles.
# CGO + gcc are required for the embedded SQLite driver (mattn/go-sqlite3),
# even when running against PostgreSQL (see AGENTS.md).
echo "==> Building backend binary (warms build cache, validates CGO/gcc)"
CGO_ENABLED=1 go build -o ezbookkeeping ezbookkeeping.go

echo "==> Install complete"
