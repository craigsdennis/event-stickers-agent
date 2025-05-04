import React, { useEffect, useRef, useState } from 'react';
import { useAgent } from 'agents/react';

export default function Phone({ name }: { name: string }) {
  const [heartCount, setHeartCount] = useState(0);
  const agent = useAgent({
    agent: 'hackathon-agent',
    name,
    onStateUpdate: (state) => {
      setHeartCount(state.heartCount);
    },
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        setError('Could not access camera: ' + err.message);
      });
  }, []);

  const capture = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Canvas not supported');
      return;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/png');
    setLoading(true);
    try {
      await agent.call('addAttendeePhoto', [dataUri]);
      alert('Photo sent!');
    } catch (e: any) {
      setError('Error sending photo: ' + e.message);
    } finally {
      setLoading(false);
    }
  };
  const heartEvent = async () => {
    await agent.call('heartEvent');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Join {name} with your phone
      </h1>
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={heartEvent}
          className="text-2xl hover:opacity-80 transition"
          aria-label="Heart Event"
        >
          🧡
        </button>
        <span className="text-xl">{heartCount}</span>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <video
        ref={videoRef}
        className="w-full max-w-md rounded shadow mb-4"
        playsInline
      />
      <button
        onClick={capture}
        disabled={loading}
        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Take Photo & Join'}
      </button>
    </div>
  );
}
