import Link from "next/link";
import { deleteProjectAction } from "@/lib/actions/proyek";
import { createSupabaseServerClient } from "@/lib/supabase-server";

interface AdminProjectsPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  const { error } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: projects, error: projectsError } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="admin-content">
      <div className="admin-heading-row">
        <div>
          <p className="section-label">PRIVATE WORKSPACE</p>
          <h1 className="admin-title">Manajemen Proyek.</h1>
          <p className="admin-muted">
            Selamat datang kembali. Kelola data portfolio dari satu tempat.
          </p>
        </div>
        <Link href="/admin/proyek/tambah" className="admin-button admin-button-primary">
          + Tambah Proyek
        </Link>
      </div>

      <div className="admin-stat">
        <span>Total Projects</span>
        <strong>{projects?.length ?? 0}</strong>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {projectsError ? (
        <p className="admin-error">Gagal membaca proyek: {projectsError.message}</p>
      ) : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Teknologi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.judul}</td>
                <td>{project.kategori}</td>
                <td>{project.teknologi.join(", ")}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/proyek/edit/${project.id}`}
                      className="admin-button admin-button-secondary"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/proyek/hapus/${project.id}`}
                      className="admin-button admin-button-danger"
                    >
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form action={deleteProjectAction} className="admin-hidden-action" aria-hidden="true">
        <input name="id" readOnly />
      </form>
    </div>
  );
}
