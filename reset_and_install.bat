@echo off
setlocal
title Pakuri Plugin - HARD RESET INSTALLER
echo ========================================================
echo      PAKURI HARD RESET & CLEAN INSTALL
echo ========================================================
echo.

set "DEST=%APPDATA%\Adobe\CEP\extensions\com.notoow.smart.selector"
set "CEF_CACHE=%APPDATA%\Adobe\CEP\extensions\com.notoow.smart.selector\.debug_cache" 
:: Note: Actual CEF cache location varies, but deleting the extension folder forces reload usually.
:: We will also clear the common CEF cache locations if possible.

echo [1/4] Kill Premiere Pro...
taskkill /F /IM "Adobe Premiere Pro.exe" >nul 2>&1
if %errorlevel% equ 0 (
    echo      [OK] Premiere Pro terminated.
) else (
    echo      [INFO] Premiere Pro was not running.
)

echo.
echo [2/4] Wiping old files and caches...
if exist "%DEST%" (
    rmdir /s /q "%DEST%"
    echo      [OK] Old extension removed.
) else (
    echo      [INFO] No old extension found.
)

:: Try to clear general CEP cache (risky but effective)
:: del /q /s "%APPDATA%\Adobe\CEP\cache\*.*" >nul 2>&1

echo.
echo [3/4] Re-enabling Debug Mode (Registry)...
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
REG ADD HKCU\Software\Adobe\CSXS.21 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.22 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.23 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.24 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
REG ADD HKCU\Software\Adobe\CSXS.25 /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
echo      [OK] Registry updated for all versions (CSXS 9-25).

echo.
echo [4/4] Installing Fresh Copy...
set "SOURCE=%~dp0smart-selector-plugin"
xcopy "%SOURCE%" "%DEST%" /E /I /Y >nul
echo      [OK] Copied to: %DEST%
echo.

echo ========================================================
echo [SUCCESS] CLEAN INSTALL COMPLETE.
echo ========================================================
echo.
echo NOW:
echo 1. Start Adobe Premiere Pro.
echo 2. Open Window - Extensions - Smart Selector.
echo.
pause
