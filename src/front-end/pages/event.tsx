import React from 'react';
import { useAgent } from 'agents/react';
import { useState } from "react";
import type { HackathonState } from '../../agents/hackathon';
export default function Event({ name }: { name: string }) {
	const [heartCount, setHeartCount] = useState(0);
	const agent = useAgent({
		agent: 'hackathon-agent',
		name,
		onStateUpdate: (state: HackathonState, source) => {
			setHeartCount(state.heartCount);
		},
	});
	const heartEvent = async () => {
		await agent.call('heartEvent');
	};
	return (
		<div>
			<h1>Hi mom</h1>
			<p>
				<button onClick={heartEvent}>🧡</button>
				<span>{heartCount}</span>
			</p>
		</div>
	);
}
