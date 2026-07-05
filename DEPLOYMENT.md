# Deployment Guide

## Quick Start for Deployment

### Option 1: Render.com (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Backend server ready for deployment"
git push origin main
```

#### Step 2: Create Render Service
1. Go to [https://render.com](https://render.com)
2. Sign up / Log in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: video-dl-backend
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Choose "Free" tier (optional paid plans)
7. Click "Create Web Service"

#### Step 3: Wait for Deployment
- Render will automatically build and deploy
- You'll get a URL like: `https://video-dl-backend-xxxx.onrender.com`

#### Step 4: Update Frontend
In your `index.html`, update the backend URL:
```javascript
const BACKEND_URL = 'https://video-dl-backend-xxxx.onrender.com';
```

---

### Option 2: Heroku

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh

# Windows
choco install heroku-cli
```

#### Step 2: Deploy
```bash
# Login
heroku login

# Create app
heroku create video-dl-backend

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Step 3: Get Your URL
```bash
heroku open
# URL will be shown or check: heroku domains
```

---

### Option 3: Railway.app

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

#### Step 2: Deploy on Railway
1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js
6. Add environment variables (if needed):
   - `PORT` = 3000
   - `NODE_ENV` = production
7. Click "Deploy"

#### Step 3: Get Domain
1. Go to Settings → Domains
2. Add a domain or use Railway's default URL
3. Copy the URL

---

### Option 4: DigitalOcean App Platform

#### Step 1: Connect GitHub
1. Go to [https://cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create new App
3. Connect GitHub repository

#### Step 2: Configure
- **Build Command**: `npm install`
- **Run Command**: `npm start`
- **HTTP Port**: 3000

#### Step 3: Deploy
- Click "Deploy"
- Wait for build to complete

---

## Testing Your Deployment

### Test Health Endpoint
```bash
curl https://your-backend-url.com/health
```

Should return:
```json
{"status": "ok", "timestamp": ".."}
```

### Test Video Info Endpoint
```bash
curl -X POST https://your-backend-url.com/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/video.mp4"}'
```

---

## Monitoring & Maintenance

### View Logs

**Render:**
```
Dashboard → Service → Logs
```

**Heroku:**
```bash
heroku logs --tail
```

**Railway:**
```
Dashboard → Deployments → Logs
```

### Common Issues

#### Build Fails
- Check `package.json` syntax
- Verify all dependencies are listed
- Check Node version compatibility

#### Runtime Errors
- Review logs for error messages
- Check environment variables
- Verify API endpoint paths

#### Timeout Issues
- Increase timeout value in server.js
- Check if video URLs are valid
- Test with different video sources

---

## Environment Variables

Set these on your deployment platform:

```env
PORT=3000
NODE_ENV=production
```

### On Render:
1. Service Settings → Environment
2. Add variable
3. Redeploy

### On Heroku:
```bash
heroku config:set PORT=3000
heroku config:set NODE_ENV=production
```

---

## Domain Setup (Optional)

### Add Custom Domain

**Render:**
1. Settings → Custom Domains
2. Add domain
3. Follow DNS instructions

**Heroku:**
```bash
heroku domains:add example.com
```

---

## Troubleshooting Deployment

### "Port already in use"
- Platform automatically assigns port
- Remove `PORT` from env if not needed

### "npm: command not found"
- Platform needs Node.js buildpack
- Verify `package.json` exists in root

### "Module not found"
- Run `npm install` locally first
- Commit `package-lock.json`

### "CORS errors in browser"
- CORS is already enabled in server.js
- Check frontend URL in browser console

---

## Performance Optimization

### For Production:

1. **Enable Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Request Logging**
   ```javascript
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```

3. **Implement Caching**
   - Cache video info for repeated URLs
   - Set TTL of 1 hour

4. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

---

## Next Steps

After deployment:

1. ✅ Update frontend `BACKEND_URL` constant
2. ✅ Test all endpoints
3. ✅ Monitor logs for errors
4. ✅ Add custom domain (optional)
5. ✅ Set up uptime monitoring
6. ✅ Plan scaling strategy

---

## Support

- Render support: [https://render.com/docs](https://render.com/docs)
- Heroku support: [https://devcenter.heroku.com](https://devcenter.heroku.com)
- Railway support: [https://docs.railway.app](https://docs.railway.app)
