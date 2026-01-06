@echo off
title Pakuri AI Server - Native Mode
echo ========================================================
echo        PAKURI AI SERVER (SAM 3) - NATIVE STARTUP
echo ========================================================
echo.

:: 1. Check Python
echo [1/3] Checking Python...
python --version 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] 'python' command not found.
    echo Trying 'py' launcher...
    py --version 2>nul
    if %errorlevel% neq 0 (
        echo [ERROR] Python not found via 'python' or 'py'.
        echo We will attempt to run anyway, but it will likely fail.
        echo Please ensure Python 3.10+ is installed and added to PATH.
    ) else (
        echo [OK] Python found via 'py'.
        set PYTHON_CMD=py
    )
) else (
    echo [OK] Python found.
    set PYTHON_CMD=python
)
if not defined PYTHON_CMD set PYTHON_CMD=python

:: 2. Install Dependencies
echo.
echo [2/3] Verifying Dependencies...
%PYTHON_CMD% -m pip install -r requirements.txt >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Failed to install dependencies automatically.
    echo            Continuing anyway...
) else (
    echo [OK] Dependencies ready.
)

:: 3. Start Server
echo.
echo [3/3] Starting AI Server...
echo.
echo    * Server: http://localhost:8000
echo    * Swagger UI: http://localhost:8000/docs
echo.
echo [PRESS CTRL+C TO STOP]
echo.

:: Run Uvicorn
:: Run Uvicorn (No Reload to ensure Env consistency)
%PYTHON_CMD% -m uvicorn api_server:app --host 0.0.0.0 --port 8000

if %errorlevel% neq 0 (
    echo.
    echo [CRASH] The server stopped unexpectedly.
    echo         Please check the error messages above.
    pause
)
