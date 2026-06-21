import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

function showFatal(message) {
    const html = `
    <div style="padding:24px;font-family:Inter,system-ui,Arial,sans-serif;margin:24px">
      <h2 style="color:#b91c1c">Fatal error</h2>
      <pre style="white-space:pre-wrap;color:#111">${message}</pre>
    </div>`;
    // try to write inside #root if possible
    if (container) container.innerHTML = html;
    else document.body.innerHTML = html;
    console.error("Fatal:", message);
}

if (!container) {
    showFatal("No #root element found in index.html. Ensure <div id=\"root\"></div> exists.");
} else {
    try {
        console.log("main.jsx: mounting React app");
        console.log("main.jsx: Vite env:", import.meta?.env?.MODE ?? "unknown");
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        );
    } catch (err) {
        showFatal(String(err));
    }

    // global runtime handlers to display errors instead of a white screen
    window.addEventListener("error", (e: ErrorEvent) => {
        const msg = e.error ? e.error.stack || e.error.message : e.message || String(e);
        showFatal(msg);
    });

    window.addEventListener("unhandledrejection", (ev: PromiseRejectionEvent) => {
        const reason = ev.reason ? (ev.reason && typeof ev.reason === "object" ? (ev.reason as any).stack || (ev.reason as any).message || JSON.stringify(ev.reason) : String(ev.reason)) : "Unhandled rejection";
        showFatal(reason);
    });
}
