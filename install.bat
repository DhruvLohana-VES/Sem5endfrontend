@echo off
title Medication Adherence System - Setup

echo ===================================
echo Medication Adherence System Setup
echo ===================================
echo.

:: Check for Node.js
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

:: Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% equ 0 (
    echo.
    echo ===================================
    echo Setup Complete!
    echo ===================================
    echo.
    echo Next Steps:
    echo 1. Make sure your backend API is running on http://localhost:5001
    echo 2. Run 'npm run dev' to start the development server
    echo 3. Open http://localhost:3000 in your browser
    echo.
    echo For more information, check README.md or QUICKSTART.md
    echo.
    
    set /p start="Would you like to start the development server now? (Y/N): "
    if /i "%start%"=="Y" (
        echo.
        echo Starting development server...
        echo Press Ctrl+C to stop the server
        echo.
        npm run dev
    ) else (
        echo.
        echo To start later, run: npm run dev
    )
) else (
    echo.
    echo [ERROR] Installation failed!
    echo Please check the error messages above and try again.
)

echo.
pause
