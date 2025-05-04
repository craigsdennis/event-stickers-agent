import { Hono } from 'hono';
import { agentsMiddleware } from 'hono-agents';
import { HackathonAgent } from './agents/hackathon';
import { StickerCreator } from './workflows/sticker-creator';

export { HackathonAgent, StickerCreator };

const app = new Hono<{ Bindings: Env }>();

app.get('/hello', async (c) => {
	return c.json({ hello: 'world' });
});

app.get("/images/:photoType/:id", async(c) => {
	const id = c.req.param("id");
	const photoType = c.req.param("photoType");
	const image = await c.env.EVENT_STICKERS.get(`${photoType}/${id}`);
	if (image === null) {
		return c.notFound();
	}
	// TODO: Right? Might return http metadata!
	return c.body(image.body);
})

app.use('*', agentsMiddleware());

export default app;
