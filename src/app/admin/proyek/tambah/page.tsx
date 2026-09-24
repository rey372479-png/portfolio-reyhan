import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/lib/actions/proyek";

interface AddProjectPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AddProjectPage({
  searchParams,
}: AddProjectPageProps) {
  const { error } = await searchParams;

  return (
    <div className="admin-content admin-narrow">
      <Link href="/admin/proyek" className="admin-back-link">
        ← Kembali ke dashboard
      </Link>
      <p className="section-label">CREATE</p>
      <h1 className="admin-title">Tambah Proyek.</h1>
      <ProjectForm action={createProjectAction} error={error} />
    </div>
  );
}
