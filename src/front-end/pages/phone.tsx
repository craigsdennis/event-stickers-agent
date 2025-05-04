import React, { useEffect, useRef, useState } from 'react';
import { useAgent } from 'agents/react';
import type {HackathonState} from "../../agents/hackathon";

export default function Phone({ name }: { name: string }) {
  const [heartCount, setHeartCount] = useState(0);
  const agent = useAgent({
    agent: 'hackathon-agent',
    name,
    onStateUpdate: (state: HackathonState) => {
      setHeartCount(state.heartCount);
    },
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [photoKey, setPhotoKey] = useState<string | null>(null);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);

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
    setPhotoDataUri(dataUri);
    setLoading(true);
    try {
      const key = await agent.call('addAttendeePhoto', [dataUri]);
      setPhotoKey(key as string);
      // stop camera
      if (video.srcObject instanceof MediaStream) {
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
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
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-4 glow uppercase tracking-widest">
        Join {name} with your phone
      </h1>
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={heartEvent}
          className="heartbeat glow text-2xl text-primary"
          aria-label="Heart Event"
        >
          🧡
        </button>
        <span className="text-xl">{heartCount}</span>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!photoKey ? (
        <>
          <video
            ref={videoRef}
            className="w-full max-w-md rounded shadow mb-4"
            playsInline
          />
          <button
            onClick={capture}
            disabled={loading}
            className="btn-game bg-primary text-white glow w-full max-w-md tracking-widest disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Take Photo & Join'}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center mb-4">
          <img
            src={photoDataUri || `/images/attendee/${photoKey}`}
            alt="Uploaded photo"
            className="w-full max-w-md rounded shadow mb-4"
          />
          <p className="text-center text-gray-700">Photo uploaded! Waiting for sticker...</p>
        </div>
      )}
    </div>
  );
}
