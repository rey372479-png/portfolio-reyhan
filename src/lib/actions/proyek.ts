"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { ADMIN_USER_ID } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const categories = new Set(["Web", "Mobile", "Design"]);
const projectImagesBucket = "project-images";
const maxProjectImageBytes = 4 * 1024 * 1024;
const maxProjectImagePixels = 25_000_000;

interface ProjectImageUpload {
  bytes: Buffer;
  contentType: string;
  extension: string;
}

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

async function parseProjectImage(value: FormDataEntryValue | null) {
  if (value === null || (value instanceof File && value.size === 0 && !value.name)) {
    return { valid: true as const, image: null };
  }

  if (!(value instanceof File)) {
    return { valid: false as const, error: "Pilih file gambar yang valid." };
  }

  if (value.size > maxProjectImageBytes) {
    return { valid: false as const, error: "Ukuran gambar maksimal 4 MB." };
  }

  const bytes = Buffer.from(await value.arrayBuffer());
  let extension: string;
  let contentType: string;

  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) {
    extension = "jpg";
    contentType = "image/jpeg";
  } else if (
    bytes.length >= 8 &&
    bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    extension = "png";
    contentType = "image/png";
  } else if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  ) {
    extension = "webp";
    contentType = "image/webp";
  } else if (
    bytes.toString("ascii", 4, 8) === "ftyp" &&
    /avif|avis/.test(bytes.toString("ascii", 8, 32))
  ) {
    extension = "avif";
    contentType = "image/avif";
  } else {
    return {
      valid: false as const,
      error: "Gunakan gambar JPEG, PNG, WebP, atau AVIF yang valid.",
    };
  }

  let metadata: Awaited<ReturnType<ReturnType<typeof sharp>["metadata"]>>;
  try {
    metadata = await sharp(bytes, { limitInputPixels: maxProjectImagePixels }).metadata();
  } catch {
    return { valid: false as const, error: "File gambar tidak dapat dibaca." };
  }

  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width * metadata.height > maxProjectImagePixels
  ) {
    return {
      valid: false as const,
      error: "Resolusi gambar terlalu besar. Maksimal 25 megapiksel.",
    };
  }

  return {
    valid: true as const,
    image: { bytes, contentType, extension } satisfies ProjectImageUpload,
  };
}

async function uploadProjectImage(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  projectId: string,
  image: ProjectImageUpload,
) {
  const path = `${projectId}/${randomUUID()}.${image.extension}`;
  const { error } = await supabase.storage
    .from(projectImagesBucket)
    .upload(path, image.bytes, {
      cacheControl: "3600",
      contentType: image.contentType,
      upsert: false,
    });

  return error ? { path: null, error } : { path, error: null };
}

async function removeProjectImage(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  path: string,
) {
  const { error } = await supabase.storage.from(projectImagesBucket).remove([path]);
  return error;
}

function logRollbackFailure(message: string, error: unknown) {
  console.error(message, error);
}

function projectErrorPath(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== ADMIN_USER_ID) {
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

  const parsedImage = await parseProjectImage(formData.get("image"));
  if (!parsedImage.valid) {
    projectErrorPath("/admin/proyek/tambah", parsedImage.error);
  }

  const { data: project, error } = await supabase
    .from("proyek")
    .insert({ ...input.values, image_path: null })
    .select("id")
    .single();

  if (error) {
    projectErrorPath("/admin/proyek/tambah", error.message);
  }

  if (parsedImage.image) {
    const uploaded = await uploadProjectImage(
      supabase,
      String(project.id),
      parsedImage.image,
    );

    if (uploaded.error || !uploaded.path) {
      const { error: rollbackError } = await supabase
        .from("proyek")
        .delete()
        .eq("id", project.id);
      if (rollbackError) {
        logRollbackFailure("Project rollback failed after image upload error:", rollbackError);
      }
      projectErrorPath(
        "/admin/proyek/tambah",
        uploaded.error?.message ?? "Gambar proyek gagal diunggah.",
      );
    }

    const { error: imagePathError } = await supabase
      .from("proyek")
      .update({ image_path: uploaded.path })
      .eq("id", project.id);

    if (imagePathError) {
      const cleanupError = await removeProjectImage(supabase, uploaded.path);
      if (cleanupError) {
        logRollbackFailure("Uploaded project image cleanup failed:", cleanupError);
      }
      const { error: rollbackError } = await supabase
        .from("proyek")
        .delete()
        .eq("id", project.id);
      if (rollbackError) {
        logRollbackFailure("Project rollback failed after image save error:", rollbackError);
      }
      projectErrorPath("/admin/proyek/tambah", imagePathError.message);
    }
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

  const editPath = `/admin/proyek/edit/${encodeURIComponent(id)}`;
  const parsedImage = await parseProjectImage(formData.get("image"));
  if (!parsedImage.valid) {
    projectErrorPath(editPath, parsedImage.error);
  }

  const removeImage = formData.get("remove_image") === "on";
  if (parsedImage.image && removeImage) {
    projectErrorPath(editPath, "Pilih gambar baru atau hapus gambar saat ini, bukan keduanya.");
  }

  const { data: currentProject, error: currentProjectError } = await supabase
    .from("proyek")
    .select("image_path")
    .eq("id", id)
    .single();

  if (currentProjectError || !currentProject) {
    projectErrorPath(editPath, currentProjectError?.message ?? "Proyek tidak ditemukan.");
  }

  let newImagePath: string | null = null;
  if (parsedImage.image) {
    const uploaded = await uploadProjectImage(supabase, id, parsedImage.image);
    if (uploaded.error || !uploaded.path) {
      projectErrorPath(
        editPath,
        uploaded.error?.message ?? "Gambar proyek gagal diunggah.",
      );
    }
    newImagePath = uploaded.path;
  }

  const updateValues = {
    ...input.values,
    ...(newImagePath ? { image_path: newImagePath } : {}),
    ...(removeImage ? { image_path: null } : {}),
  };
  const { error } = await supabase
    .from("proyek")
    .update(updateValues)
    .eq("id", id);

  if (error) {
    if (newImagePath) {
      const cleanupError = await removeProjectImage(supabase, newImagePath);
      if (cleanupError) {
        logRollbackFailure("Uploaded project image cleanup failed:", cleanupError);
      }
    }
    projectErrorPath(editPath, error.message);
  }

  const previousImagePath = currentProject.image_path;
  if ((removeImage || newImagePath) && previousImagePath) {
    const cleanupError = await removeProjectImage(supabase, previousImagePath);
    if (cleanupError) {
      logRollbackFailure("Previous project image cleanup failed:", cleanupError);
      refreshProjectPages();
      projectErrorPath(
        editPath,
        "Perubahan tersimpan, tetapi gambar lama gagal dibersihkan dari Storage.",
      );
    }
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

  const { data: project, error: projectReadError } = await supabase
    .from("proyek")
    .select("image_path")
    .eq("id", id)
    .single();

  if (projectReadError || !project) {
    projectErrorPath("/admin/proyek", projectReadError?.message ?? "Proyek tidak ditemukan.");
  }

  const { error } = await supabase.from("proyek").delete().eq("id", id);

  if (error) {
    projectErrorPath("/admin/proyek", error.message);
  }

  if (project.image_path) {
    const cleanupError = await removeProjectImage(supabase, project.image_path);
    if (cleanupError) {
      logRollbackFailure("Deleted project image cleanup failed:", cleanupError);
      refreshProjectPages();
      projectErrorPath(
        "/admin/proyek",
        "Proyek terhapus, tetapi file gambar lama gagal dibersihkan dari Storage.",
      );
    }
  }

  refreshProjectPages();
  redirect("/admin/proyek");
}
