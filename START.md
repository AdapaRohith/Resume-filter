# Quick Start Scripts

## Windows

**Start both servers:**
```bash
.\start-servers.bat
```

Or manually:
```bash
# Terminal 1 - Backend
cd server
node server.js

# Terminal 2 - Frontend
npm run dev
```

## Mac/Linux

**Start both servers:**
```bash
chmod +x start-servers.sh
./start-servers.sh
```

Or manually:
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
npm run dev
```

## Verify Servers

**Backend Health:**
```bash
curl http://localhost:5000/api/health
```

**Frontend:**
Open http://localhost:3000 in browser

## Stop Servers

Press `Ctrl + C` in each terminal window

Or find and kill processes:
```bash
# Windows PowerShell
Get-Process -Name node | Stop-Process -Force

# Mac/Linux
killall node
```
