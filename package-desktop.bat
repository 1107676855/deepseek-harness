@echo off
rem One-click unsigned Windows x64 Desktop packaging for local use.

setlocal
cd /d "%~dp0"

set "DSH_DESKTOP_APP_ID=dev.dsh.desktop"

for /f "usebackq delims=" %%v in (`node -p "require('./package.json').version"`) do set "DSH_VERSION=%%v"

echo [1/2] Packaging win-x64 unsigned (official pipeline: build, pack, runtime, smoke) ...
call pnpm run package:desktop:win:x64:unsigned
if %errorlevel% equ 0 goto :ok

echo.
echo Full run failed; retrying the electron-builder step from cached artifacts ...
pushd apps\desktop
set "DSH_DESKTOP_TARGET_PLATFORM=win32"
set "DSH_DESKTOP_TARGET_ARCH=x64"
set "DSH_DESKTOP_UNSIGNED=1"
set "CSC_IDENTITY_AUTO_DISCOVERY=false"
set "ELECTRON_BUILDER_7Z_FILTER=BCJ"
call pnpm exec electron-builder --config electron-builder.config.mjs --win --x64 --publish never
if errorlevel 1 (
  popd
  echo.
  echo Packaging failed. See the log above.
  exit /b 1
)
popd

:ok
echo.
echo Done. Artifacts:
echo   installer: apps\desktop\.desktop-build\targets\win-x64\unsigned-artifacts\deepseek-harness-%DSH_VERSION%-win-x64.exe
echo   portable:  apps\desktop\.desktop-build\targets\win-x64\unsigned-artifacts\win-unpacked\DeepSeek Harness.exe
endlocal
