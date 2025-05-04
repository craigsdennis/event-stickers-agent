import { WorkflowEntrypoint, WorkflowStep, type WorkflowEvent } from 'cloudflare:workers';
import { getAgentByName } from 'agents';

type Params = {
	agentName: string;
	photoFileName: string;
};

export class StickerCreator extends WorkflowEntrypoint<Env, Params> {
	async run(event: Readonly<WorkflowEvent<Params>>, step: WorkflowStep): Promise<string> {
		const agent = await getAgentByName(this.env.HackathonAgent, event.payload.agentName);
		return "yay";
	}
}
