import { loginAction } from "@/lib/actions/auth";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="admin-page">
      <div className="admin-auth-card">
        <p className="section-label">ADMIN ACCESS</p>
        <h1 className="section-title">Masuk.</h1>
        <p className="admin-muted">Masuk untuk mengelola project portfolio.</p>

        {error ? <p className="admin-error">{error}</p> : null}

        <form action={loginAction} className="admin-form">
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className="admin-button admin-button-primary">
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
