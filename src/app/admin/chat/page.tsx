import Link from "next/link";
import { redirect } from "next/navigation";
import { updateSupportMessageAction } from "@/lib/actions/support";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminChatPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: messages, error } = await supabase
    .from("support_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const totalNew = messages?.filter((message) => message.status === "new").length ?? 0;
  const totalRead = messages?.filter((message) => message.status === "read").length ?? 0;
  const totalReplied = messages?.filter((message) => message.status === "replied").length ?? 0;

  return (
    <div className="admin-content">
      <div className="admin-heading-row">
        <div>
          <p className="section-label">PRIVATE INBOX</p>
          <h1 className="admin-title">Support Inbox.</h1>
          <p className="admin-muted">Kelola pesan yang masuk dari pengunjung portfolio.</p>
        </div>
        <Link href="/admin/proyek" className="admin-button admin-button-secondary">
          Kembali ke admin
        </Link>
      </div>

      <div className="admin-chat-summary">
        <div className="admin-stat">
          <span>New</span>
          <strong>{totalNew}</strong>
        </div>
        <div className="admin-stat">
          <span>Read</span>
          <strong>{totalRead}</strong>
        </div>
        <div className="admin-stat">
          <span>Replied</span>
          <strong>{totalReplied}</strong>
        </div>
      </div>

      {error ? <p className="admin-error">Gagal memuat pesan: {error.message}</p> : null}

      <div className="admin-chat-list">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <article key={message.id} className="admin-chat-item">
              <div className="admin-chat-header">
                <div>
                  <h2>{message.name}</h2>
                  <p>{message.email}</p>
                </div>
                <div className="admin-chat-meta">
                  <span className={`admin-chat-badge status-${message.status}`}>
                    {message.status}
                  </span>
                  <time>{new Date(message.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</time>
                </div>
              </div>

              <blockquote>{message.message}</blockquote>

              {message.admin_reply ? (
                <div className="admin-chat-reply">
                  <p className="admin-chat-reply-label">Admin reply</p>
                  <p>{message.admin_reply}</p>
                </div>
              ) : null}

              <form action={updateSupportMessageAction} className="admin-chat-form">
                <input type="hidden" name="id" value={message.id} />

                <label>
                  <span>Reply</span>
                  <textarea name="admin_reply" rows={3} defaultValue={message.admin_reply ?? ""} />
                </label>

                <div className="admin-chat-actions">
                  <select name="status" defaultValue={message.status ?? "new"} aria-label={`Update status for ${message.name}`}>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button type="submit" className="admin-button admin-button-primary">
                    Update status
                  </button>
                </div>
              </form>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <p>Belum ada pesan masuk.</p>
          </div>
        )}
      </div>
    </div>
  );
}
