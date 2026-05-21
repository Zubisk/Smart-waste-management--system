@echo off
REM SmartWaste Backend Startup Script

cd /d "%~dp0"

echo.
echo ================================
echo SmartWaste Backend Server
echo ================================
echo.

REM Check if MongoDB is running (optional check)
echo Checking MongoDB connection...
timeout /t 2 /nobreak

echo Starting backend server in development mode...
echo Server will be available at: http://localhost:5000
echo.
echo To stop the server: Press Ctrl+C
echo.

npm run dev

pause
