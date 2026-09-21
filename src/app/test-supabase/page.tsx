import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  if (!supabase || !isSupabaseConfigured) {
    return (
      <main className="page">
        <div className="container">
          <p className="section-label">SUPABASE CHECK</p>
          <h1 className="section-title">Belum Terhubung.</h1>
          <p className="inner-intro">
            Tambahkan NEXT_PUBLIC_SUPABASE_URL dan
            NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local terlebih dahulu.
          </p>
        </div>
      </main>
    );
  }

  const { data, error } = await supabase.from("proyek").select("*");

  return (
    <main className="page">
      <div className="container">
        <p className="section-label">SUPABASE CHECK</p>
        <h1 className="section-title">
          {error ? "Koneksi Bermasalah." : "Koneksi Berhasil."}
        </h1>
        <p className="inner-intro">
          {error
            ? `Supabase mengembalikan error: ${error.message}`
            : `Tabel proyek terbaca dengan ${data.length} data.`}
        </p>
      </div>
    </main>
  );
}