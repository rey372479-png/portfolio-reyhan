"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function updateSupportMessageAction(formData: FormData) {
  const id = Number(formData.get("id") ?? "0");
  const status = String(formData.get("status") ?? "read");
  const adminReply = String(formData.get("admin_reply") ?? "").trim();

  if (!id) {
    redirect("/admin/chat?error=Pesan%20tidak%20valid");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const updatePayload: {
    status: string;
    admin_reply?: string;
    replied_at?: string;
  } = {
    status,
  };

  if (adminReply) {
    updatePayload.admin_reply = adminReply;
    updatePayload.replied_at = new Date().toISOString();
  }

  if (status === "replied" && !adminReply) {
    updatePayload.admin_reply = "Pesan sudah dibalas oleh admin.";
    updatePayload.replied_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("support_messages")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/chat");
}
