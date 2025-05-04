import React from "react";

export default function Home() {
	// TODO: aggregator
	const redirect = (form: FormData) => {
		const eventName = form.get("event-name")?.toString().toLowerCase();
		window.location.href = `/events/${eventName}`;
	}
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">Event Fun</h1>
        <form action={redirect} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Event Name</label>
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
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition"
          >
            View Event
          </button>
        </form>
      </div>
    </div>
  );
}
