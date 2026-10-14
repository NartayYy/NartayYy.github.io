param([switch]$Check)
$ErrorActionPreference = 'Stop'
$bundledPython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$pythonCommand = if (Test-Path -LiteralPath $bundledPython) { $bundledPython } else { 'python' }
$buildArguments = @((Join-Path $PSScriptRoot 'build.py'))
if ($Check) { $buildArguments += '--check' }
& $pythonCommand @buildArguments
if ($LASTEXITCODE -ne 0) { throw 'Website build or validation failed.' }
