import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProjectAction } from "@/lib/actions/proyek";
import { createSupabaseServerClient } from "@/lib/supabase-server";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: row } = await supabase
    .from("proyek")
    .select("*")
    .eq("id", id)
    .single();

  if (!row) {
    notFound();
  }

  const project = {
    id: String(row.id),
    judul: row.judul,
    kategori: row.kategori,
    deskripsiSingkat: row.deskripsi_singkat,
    deskripsiLengkap: row.deskripsi_lengkap,
    teknologi: Array.isArray(row.teknologi) ? row.teknologi : [],
    tautan: row.tautan ?? undefined,
    labelTautan: row.label_tautan ?? undefined,
  };

  return (
    <div className="admin-content admin-narrow">
      <Link href="/admin/proyek" className="admin-back-link">
        ← Kembali ke dashboard
      </Link>
      <p className="section-label">UPDATE</p>
      <h1 className="admin-title">Edit Proyek.</h1>
      <ProjectForm action={updateProjectAction} project={project} error={error} />
    </div>
  );
}
