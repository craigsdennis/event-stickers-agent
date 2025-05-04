import { WorkflowEntrypoint, WorkflowStep, type WorkflowEvent } from 'cloudflare:workers';
import { getAgentByName } from 'agents';
import { Buffer } from 'node:buffer';
import Replicate from 'replicate';

type Params = {
	agentName: string;
	photoFileName: string;
};

export class StickerCreator extends WorkflowEntrypoint<Env, Params> {
	async run(event: Readonly<WorkflowEvent<Params>>, step: WorkflowStep): Promise<string> {
		const agent = await getAgentByName(this.env.HackathonAgent, event.payload.agentName);
		const photoDataUri = await step.do('Get photo data URI from R2', async () => {
			const obj = await this.env.EVENT_STICKERS.get(event.payload.photoFileName);
			if (obj === null) {
				return;
			}
			const aBuffer = await obj.arrayBuffer();
			const base64String = Buffer.from(aBuffer).toString('base64');
			return `data:${obj?.httpMetadata?.contentType};base64,${base64String}`;
		});
		const stickerFileName = await step.do('Create a sticker', async () => {
			const replicate = new Replicate({
				auth: this.env.REPLICATE_API_TOKEN,
			});
			// Going to do a full generation and then rescale
			const output = await replicate.run('fofr/face-to-sticker:764d4827ea159608a07cdde8ddf1c6000019627515eb02b6b449695fd547e5ef', {
				input: {
					image: photoDataUri,
					// steps: 20,
					// width: 400,
					// height: 400,
					// // prompt: 'person',
					// upscale: false,
					// upscale_steps: 10,
					// negative_prompt: '',
					// prompt_strength: 4.5,
					// ip_adapter_noise: 0.5,
					// ip_adapter_weight: 0.2,
					// instant_id_strength: 0.7,
				},
			});
			// Second is transparent?
			const transformed = await this.env.IMAGES.input(output[1])
				.transform({ width: 200 })
				.output({ format: 'image/png' });
			const stickerFileName = event.payload.photoFileName.replace("attendee/", "sticker/");
			await this.env.EVENT_STICKERS.put(stickerFileName, transformed.image());
			return stickerFileName;
		});
		const success = await step.do('Update agent', async () => {
			await agent.addAttendeeSticker(stickerFileName);
		});
		return stickerFileName;
	}
}
