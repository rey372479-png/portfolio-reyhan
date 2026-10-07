import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-branding">
          <p className="footer-kicker">M. Reyhan Purnomo Putra</p>
          <h3>Build. Lead. Explore.</h3>
        </div>

        <div className="footer-links" aria-label="Media sosial dan kontak">
          <a
            href="https://instagram.com/ryhnptraaaa_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@talk.to.who0?_r=1&_t=ZS-99ZrADQYCON"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            TikTok
          </a>
          <a
            href="https://discord.gg/JrqKJetr"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Discord
          </a>
          <Link href="/kontak" className="footer-link footer-link-primary">
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}