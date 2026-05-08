import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import for the server handler
async function getServerHandler() {
  const serverPath = path.join(__dirname, '../dist/server/index.js');
  const handler = await import(serverPath);
  return handler.default;
}

let serverHandler;

export default async function handler(req, res) {
  try {
    // Load server handler on first request
    if (!serverHandler) {
      serverHandler = await getServerHandler();
    }

    // Construct URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    // Convert Node.js request to Fetch API Request
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = JSON.stringify(req.body);
    }

    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    // Call Cloudflare Worker handler and convert response
    const response = await serverHandler.fetch(fetchRequest, {}, {});

    // Set response status and headers
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Stream response body
    const responseText = await response.text();
    res.end(responseText);
  } catch (error) {
    console.error('Server handler error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', message: error.message }));
  }
}
