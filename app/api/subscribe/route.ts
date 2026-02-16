import { NextRequest, NextResponse } from "next/server";

const PARAGRAPH_API_KEY = process.env.PARAGRAPH_API_KEY || "";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!PARAGRAPH_API_KEY) {
    console.log(`[DEV] Would subscribe: ${email}`);
    return NextResponse.json({ success: true });
  }

  try {
    const response = await fetch(
      "https://public.api.paragraph.com/api/v1/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PARAGRAPH_API_KEY}`,
        },
        body: JSON.stringify({ email }),
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
    console.error("Paragraph subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect. Please try again later." },
      { status: 500 }
    );
  }
}
