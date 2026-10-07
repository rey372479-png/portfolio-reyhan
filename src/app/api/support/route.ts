import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("support_messages").insert([
      {
        name,
        email,
        message,
        status: "new",
      },
    ]);

    if (error) {
      console.error("Support message insert failed:", error.message);
      return NextResponse.json(
        {
          ok: false,
          message: "Unable to send your support message right now.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Support message request failed:", error);
    return NextResponse.json(
      { ok: false, message: "Unable to send your support message right now." },
      { status: 500 },
    );
  }
}
