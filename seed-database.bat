@echo off
REM SmartWaste Database Seeding Script

cd /d "%~dp0"

echo.
echo ================================
echo SmartWaste Database Seeder
echo ================================
echo.
echo This will populate your database with 9 test accounts:
echo - 3 Admin accounts
echo - 3 Worker accounts
echo - 3 Regular User accounts
echo.

pause /prompt "Press any key to continue..."

echo.
echo Seeding database...
npm run seed

pause
