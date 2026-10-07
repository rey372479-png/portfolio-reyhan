"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_USER_ID } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/admin/login?error=Email%20dan%20password%20wajib%20diisi");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || data.user?.id !== ADMIN_USER_ID) {
    if (!error && data.user) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "global" });
      if (signOutError) {
        console.error("Supabase rejected-admin logout failed:", signOutError.message);
      }
    }
    redirect("/admin/login?error=Email%20atau%20password%20tidak%20valid");
  }

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut({ scope: "global" });
  if (error) {
    console.error("Supabase logout gagal:", error.message);
  }

  const cookieStore = await cookies();
  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith("sb-")) {
      cookieStore.delete(cookie.name);
    }
  }

  redirect("/admin/login");
}
