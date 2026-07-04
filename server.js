const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'Video Downloader API is running' });
});

app.post('/api/info', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // For now, return the direct URL
        // Add yt-dlp or other download logic here later
        res.json({
            title: 'Video',
            downloadUrl: url,
            size: 'Unknown',
            format: 'mp4'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});