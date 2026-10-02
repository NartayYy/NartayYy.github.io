param([string]$Message = 'Update website content')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot
try {
    & python tools/build.py
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    & python tools/build.py --check
    if ($LASTEXITCODE -ne 0) { throw 'Validation failed.' }
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 1) { throw 'There are already staged changes. Commit or unstage them before publishing.' }
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect Git status.' }
    & git add -- content.json content.js index.html i18n.js assets/cv.pdf 'assets/Симагамбетов_Нартай_CV.pdf' tools README.md update-cv.cmd publish.cmd
    if ($LASTEXITCODE -ne 0) { throw 'Git add failed.' }
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 1) {
        & git commit -m $Message
        if ($LASTEXITCODE -ne 0) { throw 'Git commit failed.' }
    } elseif ($LASTEXITCODE -ne 0) { throw 'Could not inspect staged changes.' }
    & git push origin HEAD
    if ($LASTEXITCODE -ne 0) { throw 'Push failed. Local changes are saved; try publish.cmd again.' }
    Write-Host 'Published to GitHub. GitHub Pages will deploy the update.'
} finally { Pop-Location }
