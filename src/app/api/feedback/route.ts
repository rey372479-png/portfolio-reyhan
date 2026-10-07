import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function jsonError(message: string, status = 500, extra: Record<string, unknown> = {}) {
  return NextResponse.json(
    {
      ok: false,
      saved: false,
      emailSent: false,
      message,
      ...extra,
    },
    { status },
  );
}

export async function POST(request: Request) {
  let saved = false;
  let emailSent = false;

  try {
    let body: Record<string, unknown> | null = null;

    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return jsonError("Invalid request payload.", 400);
    }

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const type = String(body?.type ?? "Suggestion").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return jsonError("Please complete all required fields.", 400);
    }

    try {
      const supabase = await createSupabaseServerClient();
      const { error: feedbackError } = await supabase
        .from("feedback")
        .insert([
          {
            name,
            email,
            type,
            message,
            status: "new",
          },
        ]);

      if (feedbackError) {
        console.error("Feedback insert failed:", feedbackError.message);
        return jsonError("Unable to save your feedback right now.", 500);
      }

      saved = true;
    } catch (supabaseError) {
      console.error("Feedback Supabase error:", supabaseError);
      return jsonError("Unable to save your feedback right now.", 500);
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const feedbackToEmail = process.env.FEEDBACK_TO_EMAIL;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resendApiKey || !feedbackToEmail || !resendFromEmail) {
      console.info(
        "Feedback email not sent because RESEND_API_KEY, FEEDBACK_TO_EMAIL, or RESEND_FROM_EMAIL is not configured.",
      );

      return NextResponse.json(
        {
          ok: true,
          saved: true,
          emailSent: false,
          message:
            "Feedback received successfully. Email notification is currently unavailable.",
        },
        { status: 200 },
      );
    }

    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: resendFromEmail,
        to: [feedbackToEmail],
        replyTo: email,
        subject: "New Portfolio Feedback",
        text: [
          "New Portfolio Feedback",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Type: ${type}`,
          `Message: ${message}`,
          `Date: ${new Date().toISOString()}`,
        ].join("\n"),
      });

      emailSent = true;

      return NextResponse.json(
        {
          ok: true,
          saved: true,
          emailSent: true,
          message: "Feedback received successfully.",
        },
        { status: 200 },
      );
    } catch (emailError) {
      console.error("Feedback email failed:", emailError);

      return NextResponse.json(
        {
          ok: true,
          saved: true,
          emailSent: false,
          message:
            "Feedback received successfully. Email notification is currently unavailable.",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Feedback request failed:", error);
    return jsonError("Unable to process your feedback right now.", 500, {
      saved,
      emailSent,
    });
  }
}
