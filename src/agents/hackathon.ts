import { Agent, unstable_callable as callable } from 'agents';

export type Host = {
	name: string;
	logoUrl: string;
	url: string;
}

export type HackathonState = {
	heartCount: number;
	hosts: Host[];
	stickers: string[];
};

export class HackathonAgent extends Agent<Env, HackathonState> {
	initialState: HackathonState = {
		heartCount: 0,
		stickers: [],
		hosts: []
	};

	@callable()
	async heartEvent() {
		this.setState({
			...this.state,
			heartCount: this.state.heartCount + 1,
		});
	}

	async addAttendeeSticker(photoUrl: string) {
		const stickers = this.state.stickers;
		stickers.push(photoUrl);
		this.setState({
			...this.state,
			stickers
		})
	}

	@callable()
	async addAttendeePhoto(photoDataUri: string) {
		const photoResponse = await fetch(photoDataUri);
		const transformed = await this.env.IMAGES.input(photoResponse.body as ReadableStream)
			.transform({ width: 400 })
			.output({ format: 'image/png' });
		// If GitHub use that
		const screenshotFileName = `attendee/${crypto.randomUUID()}.png`;
		// TODO: Bucket
		await this.env.EVENT_STICKERS.put(screenshotFileName, transformed.image());
		await this.env.STICKER_CREATOR.create({
			params: {
				agentName: this.name,
				photoFileName: screenshotFileName
			}
		})

	}

	// addPhoto
	// - Store photo
	// - Call Workflow
	// - Workflow stores {agent.name}/{sticker-}
}
