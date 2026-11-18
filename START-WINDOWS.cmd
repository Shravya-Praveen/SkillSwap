@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or later, then run this file again.
  pause
  exit /b 1
)
echo Starting SkillSwap Studio at http://localhost:3000
echo Keep this window open while using SkillSwap.
node --env-file-if-exists=.env server.mjs
pause
