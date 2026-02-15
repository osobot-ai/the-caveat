interface SubscribeResult {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data: SubscribeResult = await response.json();
    return data;
  } catch {
    return {
      success: false,
      error: "Failed to connect. Please try again later.",
    };
  }
}
