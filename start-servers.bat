@echo off
echo.
echo ===================================
echo   AvlokAI Server Startup Script
echo ===================================
echo.

echo Starting Backend Server (Port 5000)...
cd server
start "AvlokAI Backend" cmd /k "node server.js"
cd ..

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server (Port 3000)...
start "AvlokAI Frontend" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo ===================================
echo   Servers Starting...
echo ===================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Check the new terminal windows for logs
echo.
echo Press any key to exit this window...
pause > nul
