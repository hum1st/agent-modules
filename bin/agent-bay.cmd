@echo off
setlocal EnableExtensions
set "SH=%ProgramFiles%\Git\bin\sh.exe"
if not exist "%SH%" set "SH=%ProgramFiles(x86)%\Git\bin\sh.exe"
if not exist "%SH%" (
  echo Git for Windows is required. Install Git, then run this script again. 1>&2
  exit /b 1
)
"%SH%" "%~dp0agent-bay" %*
