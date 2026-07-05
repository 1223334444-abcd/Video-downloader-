# Video Downloader Backend

A robust Node.js/Express backend server for the Video Downloader application. Extracts video information and serves as a proxy for video downloads.

## Features

✨ **Core Features**
- Video information extraction (title, size, format)
- Direct URL validation and verification
- CORS-enabled for cross-origin requests
- Comprehensive error handling
- Health check endpoint
- Graceful timeout handling

🔒 **Security**
- Input validation
- URL scheme validation
- Timeout protection
- User-Agent spoofing to bypass restrictions
- Error message sanitization

⚡ **Performance**
- Request timeout: 30 seconds
- Automatic redirect following
- Efficient HEAD requests (no full download)
- Lightweight response payloads

## Installation

### Prerequisites
- Node.js >= 14.0.0
- npm or yarn

### Setup

1. **Clone or navigate to the project**
   ```bash
   cd Video-downloader-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env** (optional)
   ```env
   PORT=3000
   NODE_ENV=development
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will start on `http://localhost:3000`

## API Endpoints

### 1. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-05T11:00:00.000Z"
}
```

### 2. Get Video Information
```
POST /api/info
```

**Request Body:**
```json
{
  "url": "https://example.com/video.mp4"
}
```

**Success Response (200):**
```json
{
  "downloadUrl": "https://example.com/video.mp4",
  "title": "My Video",
  "size": "125.5 MB",
  "format": "mp4",
  "contentType": "video/mp4",
  "url": "https://example.com/video.mp4"
}
```

**Error Responses:**

- **400 Bad Request** - Missing or invalid URL
  ```json
  { "error": "URL is required" }
  { "error": "Invalid URL format" }
  ```

- **403 Forbidden** - Access denied
  ```json
  { "error": "Access denied. The server blocked this request." }
  ```

- **408 Timeout** - Request took too long
  ```json
  { "error": "Request timeout. The URL took too long to respond." }
  ```

- **500 Internal Server Error** - Server error
  ```json
  { "error": "Failed to fetch video information" }
  ```

## Testing

### Manual Testing with cURL

**Health check:**
```bash
curl http://localhost:3000/health
```

**Get video info:**
```bash
curl -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/video.mp4"}'
```

### Automated Tests
```bash
npm test
```

## Project Structure

```
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables (local)
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Error Handling

The server includes comprehensive error handling:

| Error Type | Status | Response |
|---|---|---|
| Missing URL | 400 | URL is required |
| Invalid URL format | 400 | Invalid URL format |
| URL not reachable | 400 | URL not reachable |
| Access denied | 403 | Access denied |
| Timeout | 408 | Request timeout |
| Server error | 500 | Failed to fetch |

## Environment Variables

```env
PORT=3000              # Server port (default: 3000)
NODE_ENV=development   # Environment mode
```

## Deployment

### Deploy to Render.com

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy!

### Deploy to Heroku

```bash
heroku create video-dl-backend
git push heroku main
```

### Deploy to Railway.app

1. Connect GitHub account
2. Select repository
3. Configure with `npm start`
4. Deploy

## Limitations

- ⚠️ Only validates HTTP HEAD requests (doesn't download full video)
- ⚠️ Some servers may block requests despite User-Agent spoofing
- ⚠️ Password-protected or age-restricted videos won't work
- ⚠️ Streaming services may have additional anti-bot protections

## Future Improvements

- [ ] Support for playlist downloads
- [ ] Multiple format extraction
- [ ] Advanced video metadata (duration, resolution)
- [ ] Rate limiting
- [ ] Request logging and analytics
- [ ] Cache layer for repeated URLs
- [ ] Support for popular video platforms (YouTube, Vimeo, etc.)
- [ ] Download progress tracking

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=3001 npm start
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Timeout Errors
- Increase timeout in server.js (line with `res.setTimeout`)
- Check if the video URL is valid
- Try a different video URL

### CORS Errors
- CORS is already enabled
- If issues persist, check frontend URL in browser console

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open a GitHub issue
- Check existing documentation
- Review error messages carefully

## Changelog

### v1.0.0 (Initial Release)
- Basic video info extraction
- Error handling
- CORS support
- Health check endpoint
