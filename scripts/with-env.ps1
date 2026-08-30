<#
.SYNOPSIS
    Loads a .env file into the environment and runs the given command.

.DESCRIPTION
    The ezBookkeeping binary does not read .env files: environment
    configuration is resolved with os.Getenv (pkg/settings/setting.go). This
    script fills that gap without adding dependencies or touching Go code.

    The variables only exist inside the spawned process; nothing is written to
    the user or machine environment.

.PARAMETER EnvFile
    Path to the environment file. Defaults to ".env" in the repository root.

.EXAMPLE
    .\scripts\with-env.ps1 go run ezbookkeeping.go server run

.EXAMPLE
    .\scripts\with-env.ps1 -EnvFile .env.staging .\ezbookkeeping.exe database update
#>
[CmdletBinding()]
param(
    [string]$EnvFile,

    [Parameter(Mandatory = $true, Position = 0, ValueFromRemainingArguments = $true)]
    [string[]]$Command
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

if ([string]::IsNullOrWhiteSpace($EnvFile)) {
    $EnvFile = Join-Path $repoRoot ".env"
}

if (-not (Test-Path -LiteralPath $EnvFile)) {
    Write-Error "Environment file '$EnvFile' not found. Copy .env.example to .env and fill it in."
    exit 1
}

$loaded = 0

foreach ($line in (Get-Content -LiteralPath $EnvFile -Encoding UTF8)) {
    $trimmed = $line.Trim()

    if ($trimmed.Length -eq 0) { continue }
    if ($trimmed.StartsWith("#")) { continue }

    # Accept an "export " prefix so the file can be shared with POSIX shells
    if ($trimmed.StartsWith("export ")) {
        $trimmed = $trimmed.Substring(7).Trim()
    }

    $separator = $trimmed.IndexOf("=")

    if ($separator -lt 1) {
        Write-Warning "Skipping line that is not KEY=VALUE: $trimmed"
        continue
    }

    $key = $trimmed.Substring(0, $separator).Trim()
    $value = $trimmed.Substring($separator + 1).Trim()

    # Strip surrounding quotes if present
    if ($value.Length -ge 2) {
        if (($value.StartsWith('"') -and $value.EndsWith('"')) -or
            ($value.StartsWith("'") -and $value.EndsWith("'"))) {
            $value = $value.Substring(1, $value.Length - 2)
        }
    }

    Set-Item -Path "Env:\$key" -Value $value
    $loaded++
}

Write-Host "Loaded $loaded variables from $EnvFile" -ForegroundColor DarkGray

$exe = $Command[0]
$rest = @()

if ($Command.Count -gt 1) {
    $rest = $Command[1..($Command.Count - 1)]
}

& $exe @rest

exit $LASTEXITCODE
