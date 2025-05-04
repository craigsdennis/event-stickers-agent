import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home";
import Event from "./pages/event";
import Phone from "./pages/phone";
import "./styles.css";

const url = new URL(window.location.href);
const root = createRoot(document.getElementById("app")!);

const path = url.pathname;
if (path.startsWith("/events/") && path.endsWith("/phone")) {
  const segments = path.split("/");
  const eventName = segments[2];
  root.render(<Phone name={eventName} />);
} else if (path.startsWith("/events/")) {
  const eventName = path.split("/").at(-1) as string;
  root.render(<Event name={eventName} />);
} else {
  root.render(<Home />);
}

