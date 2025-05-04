import { Agent, unstable_callable as callable } from 'agents';

export type HackathonState = {
	heartCount: number;
	stickers: string[];
};

export class HackathonAgent extends Agent<Env, HackathonState> {
	initialState: HackathonState = {
		heartCount: 0,
		stickers: [],
	};

	@callable()
	async heartEvent() {
		this.setState({
			...this.state,
			heartCount: this.state.heartCount + 1,
		});
	}

	// addPhoto
	// - Store photo
	// - Call Workflow
	// - Workflow stores {agent.name}/{sticker-}
}
