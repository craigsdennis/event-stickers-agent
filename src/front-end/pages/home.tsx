import React from "react";

export default function Home() {
	// TODO: aggregator
	const redirect = (form: FormData) => {
		const eventName = form.get("event-name")?.toString().toLowerCase();
		window.location.href = `/events/${eventName}`;
	}
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border-l-4 border-primary transform hover:scale-105 transition-all">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center glow uppercase tracking-widest">
          Event Fun
        </h1>
        <form action={redirect} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-primary-dark">Event Name</label>
            <input
              type="text"
              name="event-name"
              placeholder="Enter event name"
              className="border border-gray-300 rounded p-2 w-full focus:border-primary focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-game w-full tracking-widest"
          >
            View Event
          </button>
        </form>
      </div>
    </div>
  );
}
