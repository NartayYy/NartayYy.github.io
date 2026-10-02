param(
    [Parameter(Mandatory=$true, Position=0)][string]$Path,
    [switch]$Publish
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceFile = (Resolve-Path -LiteralPath $Path).Path
$bytes = [System.IO.File]::ReadAllBytes($sourceFile)
if ($bytes.Length -lt 5 -or [System.Text.Encoding]::ASCII.GetString($bytes, 0, 5) -ne '%PDF-') {
    throw 'The selected file is not a PDF.'
}
$content = Get-Content -LiteralPath (Join-Path $projectRoot 'content.json') -Raw -Encoding utf8 | ConvertFrom-Json
$targetFile = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $content.cv.file))
if (-not $targetFile.StartsWith($projectRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'CV destination must be inside the project.'
}
if ($sourceFile -ne $targetFile) { Copy-Item -LiteralPath $sourceFile -Destination $targetFile -Force }
& python (Join-Path $PSScriptRoot 'build.py')
if ($LASTEXITCODE -ne 0) { throw 'Build failed. Changes were not published.' }
Write-Host 'CV updated. Run publish.cmd to publish, or use -Publish.'
if ($Publish) { & (Join-Path $PSScriptRoot 'publish.ps1') -Message 'Update downloadable CV' }
