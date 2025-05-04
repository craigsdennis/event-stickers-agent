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
    <div className="min-h-screen bg-white p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-primary">Event: {name}</h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={heartEvent}
            className="text-3xl hover:opacity-80 transition"
            aria-label="Heart Event"
          >
            🧡
          </button>
          <span className="text-xl">{heartCount}</span>
        </div>
      </main>
    </div>
  );
}
