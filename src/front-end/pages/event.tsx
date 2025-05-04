import React, { useState, useEffect, useRef } from 'react';
import { useAgent } from 'agents/react';
import QRious from 'qrious';
import type { HackathonState } from '../../agents/hackathon';
export default function Event({ name }: { name: string }) {
  const [heartCount, setHeartCount] = useState(0);
  const [stickers, setStickers] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
	const agent = useAgent({
		agent: 'hackathon-agent',
		name,
		onStateUpdate: (state: HackathonState, source) => {
			setHeartCount(state.heartCount);
			setStickers(state.stickers);
		},
	});
  const heartEvent = async () => {
    await agent.call('heartEvent');
  };
  useEffect(() => {
    if (canvasRef.current) {
      new QRious({
        element: canvasRef.current,
        value: `${window.location.origin}/events/${name}/phone`,
        size: 200,
      });
    }
  }, [name]);
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Scan to join from your phone
          </h2>
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="w-40 h-40"
          />
        </div>
		<ul>
		{stickers.map((sticker) => (
			<img key="sticker" src={"/images/" + sticker} />
		))}
		</ul>
      </main>
    </div>
  );
}
