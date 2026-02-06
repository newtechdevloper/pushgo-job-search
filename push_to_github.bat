@echo off
setlocal
echo ==========================================
echo      FutureJob App - GitHub Pusher
echo ==========================================

echo [1/5] Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/downloads
    echo After installing, restart your terminal and run this script again.
    pause
    exit /b
)
echo Git is found.

echo.
echo [2/5] Initializing Git Repository...
if not exist .git (
    git init
) else (
    echo Repository already initialized.
)

echo.
echo [3/5] Configuring User...
echo Please enter your GitHub details for the commit history.
set /p github_id="Enter your GitHub Username: "
set /p user_email="Enter your Email (optional, press Enter to skip): "

git config user.name "%github_id%"
if not "%user_email%"=="" git config user.email "%user_email%"

echo.
echo [4/5] Committing Code...
git add .
git commit -m "Initial commit: FutureJob App"

echo.
echo [5/5] Pushing to GitHub...
echo IMPORTANT: Go to https://github.com/new and create a new empty repository.
echo Paste the repository URL below (e.g., https://github.com/%github_id%/future-job-app.git)
echo.
set /p repo_url="Enter Repository URL: "

git branch -M main
git remote remove origin >nul 2>&1
git remote add origin %repo_url%

echo Pushing code...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo Check if the repository URL is correct and you have permissions.
) else (
    echo.
    echo [SUCCESS] Code pushed successfully!
)

pause
