"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const categories = new Set(["Web", "Mobile", "Design"]);

function textValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function parseProjectInput(formData: FormData) {
  const judul = textValue(formData, "judul");
  const kategori = textValue(formData, "kategori");
  const deskripsiSingkat = textValue(formData, "deskripsi_singkat");
  const deskripsiLengkap = textValue(formData, "deskripsi_lengkap");
  const teknologi = textValue(formData, "teknologi")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const rawLink = textValue(formData, "tautan");
  const labelTautan = textValue(formData, "label_tautan");

  if (!judul || !deskripsiSingkat || !deskripsiLengkap) {
    return { valid: false as const, error: "Judul dan kedua deskripsi wajib diisi." };
  }

  if (!categories.has(kategori)) {
    return { valid: false as const, error: "Pilih kategori proyek yang tersedia." };
  }

  let tautan: string | null = null;
  if (rawLink) {
    try {
      const parsedLink = new URL(rawLink);
      if (parsedLink.protocol !== "https:" && parsedLink.protocol !== "http:") {
        return { valid: false as const, error: "Link proyek harus menggunakan HTTP atau HTTPS." };
      }
      tautan = parsedLink.toString();
    } catch {
      return { valid: false as const, error: "Masukkan URL proyek yang valid." };
    }
  }

  if (teknologi.length > 20 || teknologi.some((item) => item.length > 80)) {
    return { valid: false as const, error: "Periksa kembali daftar teknologi proyek." };
  }

  return {
    valid: true as const,
    values: {
      judul,
      kategori,
      deskripsi_singkat: deskripsiSingkat,
      deskripsi_lengkap: deskripsiLengkap,
      teknologi,
      tautan,
      label_tautan: labelTautan || null,
    },
  };
}

function projectErrorPath(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
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
  const input = parseProjectInput(formData);
  if (!input.valid) {
    projectErrorPath("/admin/proyek/tambah", input.error);
  }

  const { error } = await supabase.from("proyek").insert(input.values);

  if (error) {
    projectErrorPath("/admin/proyek/tambah", error.message);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}

export async function updateProjectAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = textValue(formData, "id");
  const input = parseProjectInput(formData);

  if (!id) {
    projectErrorPath("/admin/proyek", "ID proyek tidak valid.");
  }
  if (!input.valid) {
    projectErrorPath(`/admin/proyek/edit/${encodeURIComponent(id)}`, input.error);
  }

  const { error } = await supabase
    .from("proyek")
    .update(input.values)
    .eq("id", id);

  if (error) {
    projectErrorPath(`/admin/proyek/edit/${encodeURIComponent(id)}`, error.message);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}

export async function deleteProjectAction(formData: FormData) {
  const supabase = await requireAdmin();
  const id = textValue(formData, "id");

  if (!id) {
    projectErrorPath("/admin/proyek", "ID proyek tidak valid.");
  }

  const { error } = await supabase.from("proyek").delete().eq("id", id);

  if (error) {
    projectErrorPath("/admin/proyek", error.message);
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}
