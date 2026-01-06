@echo off
title Pakuri AI Server - Native Mode
echo ========================================================
echo        PAKURI AI SERVER (SAM 3) - NATIVE STARTUP
echo ========================================================
echo.

:: 1. Force Virtual Environment (.venv) - SIMPLE MODE
echo [1/3] Setting Python Environment...
if exist ".\.venv\Scripts\python.exe" (
    echo [OK] Found .venv locally.
    set PYTHON_CMD=.\.venv\Scripts\python.exe
) else (
    echo [ERROR] .venv not found at .\.venv\Scripts\python.exe
    pause
    exit /b
)

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
