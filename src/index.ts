import { Hono } from 'hono';
import { agentsMiddleware } from 'hono-agents';

const app = new Hono<{ Bindings: Env }>();

app.get('/hello', async(c) => {
    return c.json({hello: "world"});
});

app.use('*', agentsMiddleware());

export default app;
