@echo off
setlocal
title Pakuri Plugin Installer
echo ========================================================
echo      PAKURI SMART SELECTOR - PLUGIN INSTALLER
echo ========================================================
echo.

set "SOURCE=%~dp0smart-selector-plugin"
set "DEST=%APPDATA%\Adobe\CEP\extensions\com.notoow.smart.selector"

:: 1. Check Source
if not exist "%SOURCE%" (
    echo [ERROR] Could not find the plugin folder!
    echo Expected path: %SOURCE%
    pause
    exit /b
)

:: 2. Enable Player Debug Mode (Required for unsigned custom plugins)
echo [*] Enabling Player Debug Mode for Adobe Products...
echo     (This allows you to run custom plugins without an official signature)
REG ADD HKCU\Software\Adobe\CSXS.9 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.10 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.12 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.13 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.14 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.15 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.16 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.17 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.18 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.19 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.20 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
echo     [OK] Registry updated.

:: 3. Copy Plugin Files
echo.
echo [*] Installing Plugin files...
if not exist "%APPDATA%\Adobe\CEP\extensions" (
    mkdir "%APPDATA%\Adobe\CEP\extensions" >nul 2>&1
)

:: Remove old version if exists
if exist "%DEST%" (
    echo     - Removing old version...
    rmdir /s /q "%DEST%"
)

:: Copy new version
xcopy "%SOURCE%" "%DEST%" /E /I /Y >nul
echo     [OK] Copied to: %DEST%

echo.
echo ========================================================
echo [SUCCESS] Installation Complete!
echo.
echo 1. Restart Adobe Premiere Pro.
echo 2. Go to Window - Extensions - Smart Selector.
echo 3. Make sure 'start_pakuri_ai.bat' is running in the background.
echo ========================================================
pause
