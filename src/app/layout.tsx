import type { Metadata } from "next";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "M. Reyhan Purnomo Putra | Portfolio",
  description:
    "Portfolio pribadi M. Reyhan Purnomo Putra - Web Developer, Forex Trader & Crypto Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="site-header">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container nav-wrapper">
              <Link href="/" className="brand-logo">
                MR<span>.</span>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="mainNavbar"
              >
                <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                  <Link href="/" className="nav-link">
                    Home
                  </Link>

                  <Link href="/tentang" className="nav-link">
                    About
                  </Link>

                  <Link href="/keahlian" className="nav-link">
                    Skills
                  </Link>

                  <Link href="/proyek" className="nav-link">
                    Projects
                  </Link>

                  <Link
                    href="/kontak"
                    className="nav-link nav-contact"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}