import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-2">
        <p>Portfolio M. Reyhan Purnomo Putra</p>
        <Link href="/kontak" className="footer-link">
          Mari terhubung <span>↗</span>
        </Link>
      </div>
    </footer>
  );
}