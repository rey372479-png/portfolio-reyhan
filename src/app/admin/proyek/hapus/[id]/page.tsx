import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProjectAction } from "@/lib/actions/proyek";
import { createSupabaseServerClient } from "@/lib/supabase-server";

interface DeleteProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeleteProjectPage({
  params,
}: DeleteProjectPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: project } = await supabase
    .from("proyek")
    .select("id, judul")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="admin-content admin-narrow">
      <p className="section-label">DELETE</p>
      <h1 className="admin-title">Hapus Proyek?</h1>
      <div className="admin-confirm-box">
        <p>
          Kamu akan menghapus <strong>{project.judul}</strong>. Tindakan ini tidak
          dapat dibatalkan.
        </p>
        <div className="admin-row-actions">
          <form action={deleteProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <button type="submit" className="admin-button admin-button-danger">
              Ya, Hapus
            </button>
          </form>
          <Link href="/admin/proyek" className="admin-button admin-button-secondary">
            Batal
          </Link>
        </div>
      </div>
    </div>
  );
}
