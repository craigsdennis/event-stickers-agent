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
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-8">
      <header className="max-w-4xl mx-auto mb-8 p-6 bg-primary text-white rounded-lg shadow-md">
        <h1 className="text-4xl glow uppercase">Event: {name}</h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md border border-primary-light inline-block">
          <button
            onClick={heartEvent}
            className="heartbeat glow text-4xl text-primary"
            aria-label="Heart Event"
          >
            🧡
          </button>
          <span className="text-2xl font-semibold">{heartCount}</span>
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
        <ul className="mt-8 grid grid-cols-3 gap-4">
          {stickers.map((sticker) => (
            <li key={sticker}>
              <img src={`/images/${sticker}`} alt={sticker} className="w-full h-auto rounded-lg shadow" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
