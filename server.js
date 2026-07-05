const express = require('express');
const cors = require('cors');
const axios = require('axios');
const url = require('url');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Timeout middleware
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    res.status(408).json({ error: 'Request timeout' });
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main API endpoint - Get video info
app.post('/api/info', async (req, res) => {
  try {
    const { url: videoUrl } = req.body;

    // Validation
    if (!videoUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!isValidUrl(videoUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check if URL is reachable and get headers
    const videoInfo = await getVideoInfo(videoUrl);
    
    res.json(videoInfo);
  } catch (error) {
    console.error('Error processing request:', error.message);
    
    // Handle specific error types
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      return res.status(400).json({ error: 'URL not reachable. Please check the URL.' });
    }
    
    if (error.message.includes('timeout')) {
      return res.status(408).json({ error: 'Request timeout. The URL took too long to respond.' });
    }
    
    if (error.message.includes('403') || error.message.includes('401')) {
      return res.status(403).json({ error: 'Access denied. The server blocked this request.' });
    }

    res.status(500).json({ error: error.message || 'Failed to fetch video information' });
  }
});

// Helper: Validate URL format
function isValidUrl(urlString) {
  try {
    const urlObj = new URL(urlString);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// Helper: Get video information
async function getVideoInfo(videoUrl) {
  try {
    const response = await axios.head(videoUrl, {
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 300,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Extract filename from URL or Content-Disposition header
    let filename = extractFilename(videoUrl, response.headers);
    
    // Get file size
    const contentLength = response.headers['content-length'];
    const size = contentLength ? formatFileSize(parseInt(contentLength)) : 'Unknown';
    
    // Get content type
    const contentType = response.headers['content-type'] || 'video/mp4';
    const format = contentType.split('/')[1] || 'mp4';
    const title = filename.replace(/\.[^.]*$/, ''); // Remove extension

    return {
      downloadUrl: videoUrl,
      title: title,
      size: size,
      format: format,
      contentType: contentType,
      url: videoUrl
    };
  } catch (error) {
    throw new Error(`Failed to fetch video: ${error.message}`);
  }
}

// Helper: Extract filename from URL or headers
function extractFilename(videoUrl, headers) {
  // Try Content-Disposition header first
  const contentDisposition = headers['content-disposition'];
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?(.+?)"?$/i);
    if (match) return match[1];
  }

  // Extract from URL
  const urlObj = new URL(videoUrl);
  const pathname = urlObj.pathname;
  const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
  
  if (filename && filename.includes('.')) {
    return decodeURIComponent(filename);
  }

  return 'video.mp4';
}

// Helper: Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/info`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
