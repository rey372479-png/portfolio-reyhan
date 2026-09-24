"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const categories = new Set(["Web", "Mobile", "Design"]);

function textValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function technologiesValue(formData: FormData) {
  return textValue(formData, "teknologi")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function categoryValue(formData: FormData) {
  const category = textValue(formData, "kategori");
  return categories.has(category) ? category : "Web";
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

function refreshProjectPages() {
  revalidatePath("/proyek");
  revalidatePath("/proyek/[id]", "page");
  revalidatePath("/admin/proyek");
}

export async function createProjectAction(formData: FormData) {
  const supabase = await requireAdmin();
  const judul = textValue(formData, "judul");
  const deskripsiSingkat = textValue(formData, "deskripsi_singkat");
  const deskripsiLengkap = textValue(formData, "deskripsi_lengkap");

  if (!judul || !deskripsiSingkat || !deskripsiLengkap) {
    redirect("/admin/proyek/tambah?error=Judul%20dan%20deskripsi%20wajib%20diisi");
  }

  const { error } = await supabase.from("proyek").insert({
    judul,
    kategori: categoryValue(formData),
    deskripsi_singkat: deskripsiSingkat,
    deskripsi_lengkap: deskripsiLengkap,
    teknologi: technologiesValue(formData),
    tautan: textValue(formData, "tautan") || null,
    label_tautan: textValue(formData, "label_tautan") || null,
  });

  if (error) {
    redirect(`/admin/proyek/tambah?error=${encodeURIComponent(error.message)}`);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}

export async function updateProjectAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = textValue(formData, "id");
  const judul = textValue(formData, "judul");
  const deskripsiSingkat = textValue(formData, "deskripsi_singkat");
  const deskripsiLengkap = textValue(formData, "deskripsi_lengkap");

  if (!id || !judul || !deskripsiSingkat || !deskripsiLengkap) {
    redirect(`/admin/proyek/edit/${id}?error=Data%20wajib%20diisi`);
  }

  const { error } = await supabase
    .from("proyek")
    .update({
      judul,
      kategori: categoryValue(formData),
      deskripsi_singkat: deskripsiSingkat,
      deskripsi_lengkap: deskripsiLengkap,
      teknologi: technologiesValue(formData),
      tautan: textValue(formData, "tautan") || null,
      label_tautan: textValue(formData, "label_tautan") || null,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/proyek/edit/${id}?error=${encodeURIComponent(error.message)}`);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}

export async function deleteProjectAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = textValue(formData, "id");

  if (!id) {
    redirect("/admin/proyek?error=ID%20proyek%20tidak%20valid");
  }

  const { error } = await supabase.from("proyek").delete().eq("id", id);

  if (error) {
    redirect(`/admin/proyek?error=${encodeURIComponent(error.message)}`);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}
