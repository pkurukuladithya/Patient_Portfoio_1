    pause
    exit /b 1
)

REM Check if PostgreSQL is running
psql -U postgres -c "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: PostgreSQL is not running or credentials are wrong
    echo Make sure PostgreSQL is running on localhost:5432
    echo Username: postgres, Password: 1234
    pause
)

echo.
echo [1/4] Setting up Backend...
echo.

cd backend

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo Backend setup completed successfully!

cd ..

echo.
echo [2/4] Setting up Frontend...
echo.

cd frontend

REM Install Node dependencies
echo Installing Node dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Node dependencies
    pause
    exit /b 1
)

echo Frontend setup completed successfully!

cd ..

echo.
echo ====================================
echo Setup Completed Successfully!
echo ====================================
echo.
echo Next Steps:
echo 1. Ensure PostgreSQL is running
echo 2. Initialize database with: psql -U postgres -d patient_portfolio -f patient_portfolio.sql
echo 3. Start Backend: cd backend && python main.py
echo 4. Start Frontend (in new terminal): cd frontend && npm run dev
echo.
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173
echo API Documentation: http://localhost:8000/docs
echo.
pause
@echo off
REM Patient Portfolio - Complete Setup Script for Windows
REM This script sets up both backend and frontend

setlocal enabledelayedexpansion

echo.
echo ====================================
echo Patient Portfolio - Setup Script
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/

