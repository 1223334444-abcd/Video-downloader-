# 🚀 Quick Start Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/1223334444-abcd/Video-downloader-.git
cd Video-downloader-
```

## 2️⃣ Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- cors (cross-origin requests)
- axios (HTTP client)
- dotenv (environment variables)
- compression (response compression)
- morgan (HTTP logging)
- nodemon (dev auto-reload)
- jest (testing)

## 3️⃣ Setup Environment

```bash
cp .env.example .env
```

Default settings are fine for local development.

## 4️⃣ Run Backend

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

**Expected Output:**
```
✅ Server running on port 3000
📋 Health check: http://localhost:3000/health
📋 API endpoint: http://localhost:3000/api/info
🔧 Environment: development
```

## 5️⃣ Test the Backend

### Test 1: Health Check
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{"status": "ok", "timestamp": "2026-07-05T12:00:00.000Z"}
```

### Test 2: Get Video Info
```bash
curl -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"}'
```

**Response:**
```json
{
  "downloadUrl": "https://...",
  "title": "BigBuckBunny",
  "size": "276.4 MB",
  "format": "mp4",
  "contentType": "video/mp4",
  "url": "https://..."
}
```

## 6️⃣ Run Tests

```bash
npm test
```

## 7️⃣ Test with Frontend

1. Open `index.html` in a text editor
2. Find: `const BACKEND_URL = 'https://video-dl-backend.onrender.com';`
3. Change to: `const BACKEND_URL = 'http://localhost:3000';`
4. Open `index.html` in your browser
5. Test with a video URL

---

## 📚 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start with auto-reload (development) |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm test -- --coverage` | Run tests with coverage report |
| `npm install <pkg>` | Install new package |
| `npm update` | Update all packages |
| `npm audit` | Check for vulnerabilities |
| `npm audit fix` | Fix vulnerabilities |

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
rm -rf node_modules
npm install
```

### CORS Errors
- CORS is already enabled
- Make sure backend is running
- Check frontend URL in browser console

---

## 🌐 Deploy to Production

See `DEPLOYMENT.md` for detailed instructions for:
- ✅ Render.com
- ✅ Heroku
- ✅ Railway.app
- ✅ DigitalOcean

---

## 📖 Full Documentation

- **Backend API**: `README-BACKEND.md`
- **Setup Guide**: `SETUP.md`
- **Deployment**: `DEPLOYMENT.md`
- **Fixes & Improvements**: `FIXES-AND-IMPROVEMENTS.md`

---

## 🎯 What's Next?

✅ Backend server running  
✅ Tests passing  
✅ Frontend connected  

👉 **Next Steps:**
1. Deploy to production (see DEPLOYMENT.md)
2. Add custom domain
3. Set up monitoring
4. Add more features

---

## 💡 Pro Tips

💡 Use Postman for API testing instead of cURL  
💡 Check `FIXES-AND-IMPROVEMENTS.md` for planned features  
💡 Read error messages carefully - they're very descriptive  
💡 Keep logs running in a separate terminal  

---

## ❓ Need Help?

📖 Check documentation files  
🐛 Open a GitHub issue  
💬 Check discussions section  
