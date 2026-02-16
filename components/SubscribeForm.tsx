"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/paragraph";

interface SubscribeFormProps {
  className?: string;
  compact?: boolean;
}

export function SubscribeForm({ className = "", compact = false }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus("success");
        setMessage("You're in! 🐻 Welcome to The Caveat.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Try again?");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again?");
    }
  };

  if (status === "success") {
    return (
      <div className={`bg-accent-dim border border-accent rounded-lg p-4 ${className}`}>
        <p className="text-accent font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex gap-3 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-5 py-4 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">{message}</p>
      )}
      {!compact && (
        <p className="mt-4 text-sm text-muted">
          Free weekly newsletter. No spam, unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
