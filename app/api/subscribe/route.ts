import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || "";
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID || "";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    console.log(`[DEV] Would subscribe: ${email}`);
    return NextResponse.json({ success: true });
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
      return NextResponse.json(
        { success: false, error: data.message || "Failed to subscribe. Please try again." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Beehiiv subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect. Please try again later." },
      { status: 500 }
    );
  }
}
