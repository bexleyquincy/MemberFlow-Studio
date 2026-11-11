import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindocsPlugin(),
      {
        name: 'netlify-functions-dev-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/send-contact' || req.url === '/.netlify/functions/send-contact') {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Method not allowed. Only POST is accepted.' }));
                return;
              }

              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });

              req.on('end', async () => {
                try {
                  const { handler } = await import('./netlify/functions/send-contact.js');
                  const event = {
                    httpMethod: req.method,
                    headers: req.headers,
                    body: body
                  };
                  const response = await handler(event);
                  res.statusCode = response.statusCode;
                  if (response.headers) {
                    for (const [key, val] of Object.entries(response.headers)) {
                      res.setHeader(key, val);
                    }
                  }
                  res.end(response.body);
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Internal server error processing contact form.' }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

function tailwindocsPlugin() {
  return tailwindcss();
}
