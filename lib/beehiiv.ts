/**
 * Beehiiv API client (placeholder)
 * 
 * Replace BEEHIIV_API_KEY and PUBLICATION_ID with real values
 * when connecting to Beehiiv.
 */

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || "";
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID || "";

interface SubscribeResult {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  // Validate email
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // If no API key configured, simulate success for development
  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    console.log(`[DEV] Would subscribe: ${email}`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message || "Failed to subscribe. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Beehiiv subscription error:", error);
    return {
      success: false,
      error: "Failed to connect. Please try again later.",
    };
  }
}

export async function getSubscriberCount(): Promise<number | null> {
  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data?.subscriber_count || null;
  } catch {
    return null;
  }
}
