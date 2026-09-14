import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>Portfolio M. Reyhan Purnomo Putra</p>
        <Link href="/kontak" className="footer-link">
          Mari terhubung <span>↗</span>
        </Link>
      </div>
    </footer>
  );
}