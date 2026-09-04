#!/bin/bash

# Resolve project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "=================================================="
echo "🎓 EduVision AI 2.0 - Starting Application Services"
echo "=================================================="

# Kill any existing processes on ports 8000 or 3000
lsof -ti:8000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "1. Starting FastAPI Backend (Port 8000)..."
cd "$PROJECT_DIR/backend"
python3 -m uvicorn app.main:app --host 127.0.0.1 --port 8000 > "$PROJECT_DIR/backend.log" 2>&1 &
BACKEND_PID=$!

sleep 2

echo "2. Starting Next.js Production Frontend (Port 3000)..."
cd "$PROJECT_DIR/frontend"
if [ ! -d ".next" ]; then
  npm run build
fi
npm run start -- -p 3000 > "$PROJECT_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!

sleep 2

echo ""
echo "=================================================="
echo "✅ EduVision AI 2.0 is now LIVE & READY!"
echo "=================================================="
echo "🌐 વેબ ડેશબોર્ડ ખોલો (Open in Browser):"
echo "   👉 http://localhost:3000"
echo ""
echo "📡 બેકએન્ડ API ડોક્યુમેન્ટેશન (FastAPI Swagger Docs):"
echo "   👉 http://127.0.0.1:8000/docs"
echo "=================================================="
echo "પ્રોસેસ રોકવા માટે Ctrl + C દબાવો (Press Ctrl+C to stop)"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM EXIT
wait
