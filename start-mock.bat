@echo off
REM Enable Mock Mode - No Backend Required

echo.
echo ========================================
echo    ENABLING MOCK API MODE
echo ========================================
echo.
echo This will configure the app to use
echo static demo data WITHOUT a backend.
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
echo VITE_USE_MOCK_API=true
) > .env

echo.
echo [SUCCESS] Mock Mode ENABLED!
echo.
echo ----------------------------------------
echo Demo Accounts:
echo ----------------------------------------
echo Caretaker:
echo   Email: caretaker@demo.com
echo   Pass:  Demo@123
echo.
echo Patient:
echo   Email: patient@demo.com
echo   Pass:  Demo@123
echo ----------------------------------------
echo.
echo Starting development server...
echo.
echo Press Ctrl+C to stop the server
echo.
pause

REM Start dev server
npm run dev
