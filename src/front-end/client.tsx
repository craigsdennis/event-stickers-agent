import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home";
import Event from "./pages/event";
import "./styles.css";

const url = new URL(window.location.href);
const root = createRoot(document.getElementById("app")!);

if (url.pathname.startsWith("/events/")) {
	const eventName = url.pathname.split("/").at(-1) as string;
	root.render(<Event name={eventName} />)
} else {
	root.render(<Home />);
}

