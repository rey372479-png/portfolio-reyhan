import { daftarProyek, type ProyekItem } from "@/data/proyek";
import { supabase } from "@/lib/supabase";

interface SupabaseProyekRow {
  id: number | string;
  judul: string;
  kategori: ProyekItem["kategori"];
  deskripsi_singkat: string;
  deskripsi_lengkap: string;
  teknologi: string[] | string;
  tautan: string | null;
  label_tautan: string | null;
}

function normalizeTechnologies(value: SupabaseProyekRow["teknologi"]) {
  return Array.isArray(value)
    ? value
    : value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function mapSupabaseProject(row: SupabaseProyekRow): ProyekItem {
  return {
    id: String(row.id),
    judul: row.judul,
    kategori: row.kategori,
    deskripsiSingkat: row.deskripsi_singkat,
    deskripsiLengkap: row.deskripsi_lengkap,
    teknologi: normalizeTechnologies(row.teknologi),
    tautan: row.tautan ?? undefined,
    labelTautan: row.label_tautan ?? undefined,
  };
}

export async function getProyek(): Promise<ProyekItem[]> {
  if (!supabase) {
    return daftarProyek;
  }

  const { data, error } = await supabase
    .from("proyek")
    .select(
      "id, judul, kategori, deskripsi_singkat, deskripsi_lengkap, teknologi, tautan, label_tautan",
    )
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase gagal mengambil data proyek; memakai data lokal:", error);
    return daftarProyek;
  }

  return (data as SupabaseProyekRow[]).map(mapSupabaseProject);
}

export async function getProyekById(id: string) {
  const proyek = await getProyek();
  return proyek.find((item) => item.id === id);
}