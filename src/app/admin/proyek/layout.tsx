import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <Link href="/admin/proyek" className="admin-brand">
            Admin Portfolio
          </Link>
          <p className="admin-muted">{user.email}</p>
        </div>
        <div className="admin-nav-actions">
          <Link href="/" className="admin-button admin-button-secondary">
            Lihat Website
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="admin-button admin-button-secondary">
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}