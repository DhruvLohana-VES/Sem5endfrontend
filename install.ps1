# Medication Adherence System - Installation Script
# Run this script in PowerShell to set up the project

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Medication Adherence System Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Check if npm is available
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not available!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

# Install dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host "Setup Complete!" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure your backend API is running on http://localhost:5001" -ForegroundColor White
    Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
    Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
    Write-Host ""
    Write-Host "For more information, check README.md or QUICKSTART.md" -ForegroundColor Gray
    Write-Host ""
    
    # Ask if user wants to start dev server
    $response = Read-Host "Would you like to start the development server now? (Y/N)"
    if ($response -eq 'Y' -or $response -eq 'y') {
        Write-Host ""
        Write-Host "Starting development server..." -ForegroundColor Yellow
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host ""
        npm run dev
    } else {
        Write-Host ""
        Write-Host "To start later, run: npm run dev" -ForegroundColor Gray
    }
} else {
    Write-Host ""
    Write-Host "✗ Installation failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above and try again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
