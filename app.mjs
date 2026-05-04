import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import pages from './routes/pages.mjs';
import api from './routes/api.mjs';

const app = new Hono();

app.use(logger());
app.use('/*', serveStatic({ root: './public' }));

app.route('/', pages);
app.route('/api', api);

app.onError((err, c) => {
  const isDev = process.env.NODE_ENV !== 'production';
  console.error(err);
  return c.text(isDev ? err.stack : 'Internal Server Error', 500);
});

const port = Number(process.env.PORT) || 3333;

serve({ fetch: app.fetch, port }, () => {
  console.log(`okize.com server listening on port ${port} | http://localhost:${port}/`);
});
