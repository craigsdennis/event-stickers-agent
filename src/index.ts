import { Hono } from 'hono';
import { agentsMiddleware } from 'hono-agents';
import { HackathonAgent } from './agents/hackathon';
import { StickerCreator } from './workflows/sticker-creator';

export { HackathonAgent, StickerCreator };

const app = new Hono<{ Bindings: Env }>();

app.get('/hello', async (c) => {
	return c.json({ hello: 'world' });
});

app.use('*', agentsMiddleware());

export default app;
