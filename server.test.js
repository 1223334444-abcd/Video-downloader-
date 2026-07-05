const request = require('supertest');
const app = require('./server');

describe('Video Downloader Backend', () => {
  
  // Health Check Tests
  describe('GET /health', () => {
    test('should return 200 with ok status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Video Info Tests
  describe('POST /api/info', () => {
    
    test('should return 400 when URL is missing', async () => {
      const response = await request(app)
        .post('/api/info')
        .send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('URL is required');
    });

    test('should return 400 for invalid URL format', async () => {
      const response = await request(app)
        .post('/api/info')
        .send({ url: 'not-a-valid-url' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid URL');
    });

    test('should return 400 for non-http/https URLs', async () => {
      const response = await request(app)
        .post('/api/info')
        .send({ url: 'ftp://example.com/video.mp4' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should handle network errors gracefully', async () => {
      const response = await request(app)
        .post('/api/info')
        .send({ url: 'https://nonexistent-domain-12345.com/video.mp4' });
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // 404 Handler
  describe('Invalid Routes', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/invalid-route');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('not found');
    });
  });

  // CORS Tests
  describe('CORS Headers', () => {
    test('should include CORS headers in response', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://localhost:3000');
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
