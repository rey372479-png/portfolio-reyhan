"use client";

import { FormEvent, useState } from "react";

interface FeedbackResponse {
  ok?: boolean;
  message?: string;
  saved?: boolean;
  emailSent?: boolean;
}

export default function FeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      type: String(formData.get("type") ?? "Suggestion").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFeedbackMessage("Please complete all required fields before sending your feedback.");
      return;
    }

    setStatus("sending");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let result: FeedbackResponse | null = null;

      try {
        result = rawText ? (JSON.parse(rawText) as FeedbackResponse) : null;
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.message ||
            rawText ||
            "Unable to send feedback right now.",
        );
      }

      setStatus("success");
      setFeedbackMessage(
        result.message || "Feedback received. Thank you for your input.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Unable to send feedback right now.",
      );
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="feedback-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        <span>Feedback type</span>
        <select name="type" defaultValue="Suggestion" aria-label="Feedback type">
          <option value="Suggestion">Suggestion</option>
          <option value="Criticism">Criticism</option>
          <option value="General Feedback">General Feedback</option>
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>

      {feedbackMessage ? (
        <p className={`feedback-status ${status === "error" ? "is-error" : "is-success"}`}>
          {feedbackMessage}
        </p>
      ) : null}

      <button type="submit" className="feedback-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}
