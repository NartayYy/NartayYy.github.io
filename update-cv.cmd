@echo off
if "%~1"=="" (
  echo Usage: update-cv.cmd "C:\path\resume.pdf" [-Publish]
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\update-cv.ps1" %*
