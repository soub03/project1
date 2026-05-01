@echo off
cd /d "c:\Users\souvi\Downloads\OneDrive_1_4-26-2026\backend"
echo Starting Django Server...
"c:\Users\souvi\Downloads\OneDrive_1_4-26-2026\venv\Scripts\python.exe" manage.py runserver 8000 2> ..\server_error.log
if %ERRORLEVEL% NEQ 0 (
    echo Server failed to start. Check server_error.log
    pause
)
