#!/usr/bin/env sh
#
# Loads a .env file into the environment and runs the given command.
#
# The ezBookkeeping binary does not read .env files: environment configuration
# is resolved with os.Getenv (pkg/settings/setting.go). This script fills that
# gap without adding dependencies or touching Go code.
#
# Usage:
#     ./scripts/with-env.sh go run ezbookkeeping.go server run
#     ENV_FILE=.env.staging ./scripts/with-env.sh ./ezbookkeeping database update

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="${ENV_FILE:-$REPO_ROOT/.env}"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: environment file '$ENV_FILE' not found." >&2
    echo "Copy .env.example to .env and fill it in." >&2
    exit 1
fi

if [ "$#" -eq 0 ]; then
    echo "Error: no command given." >&2
    echo "Usage: $0 <command> [args...]" >&2
    exit 2
fi

loaded=0

while IFS= read -r line || [ -n "$line" ]; do
    # Strip leading whitespace
    line="${line#"${line%%[![:space:]]*}"}"

    case "$line" in
        ''|'#'*) continue ;;
        'export '*) line="${line#export }" ;;
    esac

    case "$line" in
        *=*) ;;
        *) continue ;;
    esac

    key="${line%%=*}"
    value="${line#*=}"

    # Trim whitespace around the key
    key="${key%"${key##*[![:space:]]}"}"
    key="${key#"${key%%[![:space:]]*}"}"

    # Strip surrounding quotes if present
    case "$value" in
        \"*\") value="${value#\"}"; value="${value%\"}" ;;
        \'*\') value="${value#\'}"; value="${value%\'}" ;;
    esac

    export "$key=$value"
    loaded=$((loaded + 1))
done < "$ENV_FILE"

echo "Loaded $loaded variables from $ENV_FILE" >&2

exec "$@"
