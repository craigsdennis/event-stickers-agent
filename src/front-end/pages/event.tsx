import React, { useState, useEffect, useRef } from 'react';
import { useAgent } from 'agents/react';
import QRious from 'qrious';
import type { HackathonState } from '../../agents/hackathon';
export default function Event({ name }: { name: string }) {
  const [heartCount, setHeartCount] = useState(0);
  const [stickers, setStickers] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickerCanvasRef = useRef<HTMLCanvasElement>(null);
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
  useEffect(() => {
    const canvas = stickerCanvasRef.current;
    if (!canvas || stickers.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const n = stickers.length;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    (async () => {
      try {
        const images = await Promise.all(
          stickers.map(name =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.src = `/images/${name}`;
              img.onload = () => resolve(img);
              img.onerror = reject;
            })
          )
        );
        images.forEach((img, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const centerX = col * cellWidth + cellWidth / 2;
          const centerY = row * cellHeight + cellHeight / 2;
          const offsetX = (Math.random() * 2 - 1) * (cellWidth * 0.2);
          const offsetY = (Math.random() * 2 - 1) * (cellHeight * 0.2);
          const angle = ((Math.random() * 30 - 15) * Math.PI) / 180;
          const maxImgWidth = cellWidth * 0.8;
          const scale = maxImgWidth / img.width;
          const imgWidth = img.width * scale;
          const imgHeight = img.height * scale;
          ctx.save();
          ctx.translate(centerX + offsetX, centerY + offsetY);
          ctx.rotate(angle);
          ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
          ctx.restore();
        });
      } catch (err) {
        console.error('Error loading sticker images', err);
      }
    })();
  }, [stickers]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-8">
      <header className="max-w-4xl mx-auto mb-8 p-6 bg-[var(--color-primary)] text-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold glow uppercase tracking-widest text-center">Event: {name}</h1>
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Stickers
          </h2>
          <canvas
            ref={stickerCanvasRef}
            width={600}
            height={400}
            className="w-full h-auto bg-white rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
