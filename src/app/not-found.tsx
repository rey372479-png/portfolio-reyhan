import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page not-found-page">
      <div className="container not-found-content">
        <p className="section-label">404 / NOT FOUND</p>
        <h1 className="section-title">
          Project
          <br />
          Tidak Ditemukan.
        </h1>
        <p className="inner-intro">
          Project dengan ID tersebut belum tersedia di portfolio saya.
        </p>
        <Link href="/proyek" className="minimal-link">
          Kembali ke Project <span>→</span>
        </Link>
      </div>
    </main>
  );
}
