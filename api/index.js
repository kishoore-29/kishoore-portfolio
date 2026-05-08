export default async function handler(req, res) {
  try {
    console.log(`[API] ${req.method} ${req.url}`);
    
    // Import the server handler
    const { default: serverHandler } = await import('../dist/server/index.js');
    
    if (!serverHandler || typeof serverHandler.fetch !== 'function') {
      console.error('[API] Server handler missing or invalid');
      throw new Error('Server handler does not export a fetch function');
    }

    // Build the URL - ensure protocol and host are correct
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = `${protocol}://${host}${req.url}`;
    
    console.log(`[API] Constructed URL: ${url}`);

    // Prepare request body
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      }
    }

    // Create a Fetch API Request
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body,
    });

    // Call the server handler
    console.log('[API] Calling server handler...');
    const fetchResponse = await serverHandler.fetch(fetchRequest, {}, {});

    console.log(`[API] Server returned status: ${fetchResponse.status}`);

    // Set status code
    res.statusCode = fetchResponse.status;

    // Copy response headers
    for (const [key, value] of fetchResponse.headers.entries()) {
      res.setHeader(key, value);
    }

    // Send response body
    const responseBody = await fetchResponse.text();
    console.log(`[API] Response body length: ${responseBody.length}`);
    res.end(responseBody);
  } catch (error) {
    console.error('[API] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.DEBUG ? error.stack : undefined,
    }));
  }
}
