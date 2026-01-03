@echo off
REM Disable Mock Mode - Use Real Backend

echo.
echo ========================================
echo    DISABLING MOCK API MODE
echo ========================================
echo.
echo This will configure the app to use
echo the REAL backend API server.
echo.

REM Backup current .env
if exist .env (
    copy .env .env.backup >nul
    echo [BACKUP] Created .env.backup
)

REM Update .env file
(
echo # Backend API URL ^(used when USE_MOCK_API is false^)
echo VITE_API_BASE_URL=http://localhost:5001/api
echo.
echo # Toggle Mock API ^(true = no backend needed, false = use real backend^)
echo VITE_USE_MOCK_API=false
) > .env

echo.
echo [SUCCESS] Real API Mode ENABLED!
echo.
echo ----------------------------------------
echo IMPORTANT:
echo ----------------------------------------
echo Make sure your backend is running on:
echo http://localhost:5001
echo.
echo You can now use real user accounts
echo from your backend database.
echo ----------------------------------------
echo.
echo Starting development server...
echo.
echo Press Ctrl+C to stop the server
echo.
pause

REM Start dev server
npm run dev
