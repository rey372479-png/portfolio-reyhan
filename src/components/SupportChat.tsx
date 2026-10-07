"use client";

import { FormEvent, useState } from "react";

type SendState = "idle" | "sending" | "success" | "error";

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SendState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setState("error");
      setMessage("Please fill in all fields before sending.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to send support message.");
      }

      form.reset();
      setState("success");
      setMessage("Message received. Thank you.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send support message right now.",
      );
    }
  }

  return (
    <div className="support-chat" aria-live="polite">
      <button
        type="button"
        className="support-trigger"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="support-trigger-dot" aria-hidden="true" />
        Need help?
      </button>

      {isOpen ? (
        <div className="support-panel" role="dialog" aria-modal="false" aria-label="Need help support form">
          <div className="support-panel-header">
            <div>
              <p className="support-kicker">LIVE CHAT</p>
              <h3>Need help?</h3>
            </div>
            <button
              type="button"
              className="support-close"
              aria-label="Close support chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <p className="support-copy">
            Found a problem or something not working? Send me a message and I&apos;ll take a look.
          </p>

          <form className="support-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={4} required />
            </label>

            {message ? (
              <p className={`support-status ${state === "error" ? "is-error" : "is-success"}`}>
                {message}
              </p>
            ) : null}

            <button type="submit" className="support-submit" disabled={state === "sending"}>
              {state === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
