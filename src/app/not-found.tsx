import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page not-found-page">
      <div className="container not-found-content">
        <div className="not-found-orbit not-found-orbit-one"></div>
        <div className="not-found-orbit not-found-orbit-two"></div>

        <div className="not-found-mark" aria-hidden="true">
          <span className="not-found-face">
            <i></i>
            <i></i>
            <b></b>
          </span>
          <span className="not-found-sticker">404!</span>
        </div>

        <p className="section-label">OOPS, ROUTE NYASAR</p>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Halaman ini sedang main petak umpet.</h2>
        <p className="not-found-description">
          Sepertinya alamat yang kamu cari tersesat di internet. Tenang,
          project-project keren masih menunggu di tempatnya.
        </p>

        <div className="not-found-terminal" aria-hidden="true">
          <span>guest@portfolio:~$</span> find halaman
          <br />
          <strong>hasil: tidak ditemukan</strong>
        </div>

        <Link href="/proyek" className="hero-btn hero-btn-primary not-found-link">
          Lihat Semua Project <span>↗</span>
        </Link>
      </div>
    </main>
  );
}
