# Local Setup & Development Guide

## Step 1: Clone or Setup Project Locally

### Option A: Clone from GitHub
```bash
git clone https://github.com/1223334444-abcd/Video-downloader-.git
cd Video-downloader-
```

### Option B: Already Have It
```bash
cd Video-downloader-
```

---

## Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will install:
# - express (web framework)
# - cors (cross-origin support)
# - axios (HTTP client)
# - dotenv (environment variables)
# - nodemon (dev auto-reload)
# - jest (testing)
```

---

## Step 3: Setup Environment

```bash
# Copy example to actual env file
cp .env.example .env

# Edit .env (optional - defaults are fine)
# nano .env
```

### Default .env:
```env
PORT=3000
NODE_ENV=development
```

---

## Step 4: Run Backend Locally

### Development Mode (with auto-reload on file changes)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output:
```
✅ Server running on port 3000
📋 Health check: http://localhost:3000/health
📋 API endpoint: http://localhost:3000/api/info
```

---

## Step 5: Test Backend Locally

### Test 1: Health Check
```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{"status": "ok", "timestamp": "2026-07-05T11:00:00.000Z"}
```

### Test 2: Get Video Info
```bash
curl -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"}'
```

**Expected Response:**
```json
{
  "downloadUrl": "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
  "title": "BigBuckBunny",
  "size": "276.4 MB",
  "format": "mp4",
  "contentType": "video/mp4",
  "url": "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"
}
```

### Test 3: Invalid URL
```bash
curl -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "not-a-url"}'
```

**Expected Response:**
```json
{"error": "Invalid URL format"}
```

---

## Step 6: Run Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run in watch mode (re-run on changes)
npm test -- --watch
```

---

## Step 7: Frontend Setup (Optional)

To use the frontend with your local backend:

1. Open `index.html` in a text editor
2. Find this line (~line 238):
   ```javascript
   const BACKEND_URL = 'https://video-dl-backend.onrender.com';
   ```
3. Change it to:
   ```javascript
   const BACKEND_URL = 'http://localhost:3000';
   ```
4. Open `index.html` in your browser
5. Test the app with a video URL

---

## Troubleshooting Local Setup

### Issue: "Port 3000 already in use"

**Solution A: Kill process on port 3000**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution B: Use different port**
```bash
PORT=3001 npm run dev
```

### Issue: "npm: command not found"

**Solution: Install Node.js**
- Download from [nodejs.org](https://nodejs.org)
- Install LTS version
- Restart terminal

### Issue: "Module not found" errors

**Solution: Reinstall dependencies**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: CORS errors in browser

**Solution: CORS is already enabled**
- The backend already has CORS enabled
- Check frontend URL in browser console
- Make sure backend is running on correct port

### Issue: "Cannot find module 'dotenv'"

**Solution: Install missing package**
```bash
npm install dotenv
npm install
```

---

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Make Changes
- Edit `server.js`
- Save file
- Server auto-reloads (thanks to nodemon)

### 3. Test Changes
```bash
curl -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "<test-video-url>"}'
```

### 4. Run Tests
```bash
npm test
```

### 5. Commit Changes
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

---

## Project Structure

```
Video-downloader-/
├── server.js              # Main backend server
├── server.test.js         # Test file
├── package.json           # Dependencies
├── .env                   # Environment variables (local)
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── README.md              # Main README
├── README-BACKEND.md      # Backend documentation
├── DEPLOYMENT.md          # Deployment guide
├── SETUP.md               # This file
├── index.html             # Frontend
├── manifest.json          # PWA manifest
└── sw.js                  # Service worker
```

---

## Common Commands

```bash
# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Install new package
npm install <package-name>

# Update all packages
npm update

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

---

## Next Steps After Setup

1. ✅ Run backend locally (`npm run dev`)
2. ✅ Test endpoints with cURL
3. ✅ Update frontend BACKEND_URL
4. ✅ Open frontend in browser
5. ✅ Test full flow
6. ✅ Run automated tests
7. ✅ Deploy to production (see DEPLOYMENT.md)

---

## Need Help?

### Check These Resources:
- `README-BACKEND.md` - Backend API documentation
- `DEPLOYMENT.md` - How to deploy
- `server.js` - Code comments and implementation
- GitHub Issues - Report bugs

### Quick Test URLs (Direct Video Links):
- BigBuckBunny: https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4
- ElephantsDream: https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4
- ForBiggerBlazes: https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4

---

## Pro Tips

💡 **Use Postman for API Testing**
- Download [Postman](https://www.postman.com)
- Import backend endpoints
- Test without command line

💡 **Enable Debug Logging**
- Add `console.log()` statements
- Watch nodemon output in terminal
- See requests in real-time

💡 **Monitor Performance**
- Check response times
- Monitor CPU/memory usage
- Use Chrome DevTools Network tab

---

## Useful Links

- Node.js Docs: https://nodejs.org/docs
- Express Docs: https://expressjs.com
- Axios Docs: https://axios-http.com
- Jest Testing: https://jestjs.io
- Render Deployment: https://render.com/docs

