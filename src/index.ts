import { Hono } from 'hono';
import { agentsMiddleware } from 'hono-agents';
import { HackathonAgent } from './agents/hackathon';

export { HackathonAgent };

const app = new Hono<{ Bindings: Env }>();

app.get('/hello', async (c) => {
	return c.json({ hello: 'world' });
});

app.use('*', agentsMiddleware());

export default app;
