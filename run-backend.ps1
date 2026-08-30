$winlibs = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\mingw64\bin"
$env:Path = "$winlibs;$env:Path"
$env:CC = Join-Path $winlibs "gcc.exe"

Set-Location $PSScriptRoot
go run . server run
