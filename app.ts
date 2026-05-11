import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';
import pages from './routes/pages.tsx';

const app = new Hono();

app.use(logger());
app.use('/*', serveStatic({ root: './public' }));

app.route('/', pages);

app.onError((err, c) => {
  const isDev = process.env.NODE_ENV !== 'production';
  console.error(err);
  return c.text(isDev ? err.stack ?? 'Unknown error' : 'Internal Server Error', 500);
});

const port = Number(process.env.PORT) || 3333;

console.log(`okize.com server listening on port ${port} | http://localhost:${port}/`);

export default {
  port,
  fetch: app.fetch,
};
