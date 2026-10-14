param([string]$Message = 'Update website content', [string]$AssistantHost = 'my-vps')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot
try {
    & (Join-Path $PSScriptRoot 'build.ps1')
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    & (Join-Path $PSScriptRoot 'build.ps1') -Check
    if ($LASTEXITCODE -ne 0) { throw 'Validation failed.' }
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 1) { throw 'There are already staged changes. Commit or unstage them before publishing.' }
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect Git status.' }
    & git add -- content.json content.js index.html i18n.js assets/cv.pdf 'assets/Симагамбетов_Нартай_CV.pdf' tools assistant assistant.js assistant.css .gitignore .dockerignore README.md update-cv.cmd publish.cmd
    if ($LASTEXITCODE -ne 0) { throw 'Git add failed.' }
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 1) {
        & git commit -m $Message
        if ($LASTEXITCODE -ne 0) { throw 'Git commit failed.' }
    } elseif ($LASTEXITCODE -ne 0) { throw 'Could not inspect staged changes.' }
    & git push origin HEAD
    if ($LASTEXITCODE -ne 0) { throw 'Push failed. Local changes are saved; try publish.cmd again.' }
    $siteContent = Get-Content -LiteralPath content.json -Raw -Encoding utf8 | ConvertFrom-Json
    if ($AssistantHost -and $siteContent.assistant.enabled) {
        & scp -o BatchMode=yes content.json "${AssistantHost}:vcard-assistant/data/content.next.json"
        if ($LASTEXITCODE -ne 0) { throw 'Site published, but assistant data sync failed. Check SSH and run publish.cmd again.' }
        & ssh -o BatchMode=yes $AssistantHost 'mv ~/vcard-assistant/data/content.next.json ~/vcard-assistant/data/content.json'
        if ($LASTEXITCODE -ne 0) { throw 'Site published, but assistant data update failed.' }
        Write-Host 'Assistant CV data updated on the server.'
    }
    Write-Host 'Published to GitHub. GitHub Pages will deploy the update.'
} finally { Pop-Location }
