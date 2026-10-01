"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/tentang", label: "About" },
  { href: "/keahlian", label: "Skills" },
  { href: "/proyek", label: "Projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const shouldUseLightTheme = savedTheme === "light" || (!savedTheme && prefersLight);

    document.documentElement.dataset.theme = shouldUseLightTheme
      ? "light"
      : "dark";
    setIsLightTheme(shouldUseLightTheme);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container nav-wrapper">
        <Link href="/" className="brand-logo" onClick={closeMenu}>
          MR<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`site-nav-menu${isOpen ? " show" : ""}`}
          id="mainNavbar"
        >
          <div className="site-nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? " active" : ""}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/kontak"
              className={`nav-link nav-contact${pathname === "/kontak" ? " active" : ""}`}
              onClick={closeMenu}
            >
              Contact
            </Link>

            <button
              type="button"
              className="theme-toggle"
              aria-label={isLightTheme ? "Gunakan tema gelap" : "Gunakan tema terang"}
              title={isLightTheme ? "Gunakan tema gelap" : "Gunakan tema terang"}
              onClick={() => {
                const nextTheme = isLightTheme ? "dark" : "light";
                document.documentElement.dataset.theme = nextTheme;
                window.localStorage.setItem("theme", nextTheme);
                setIsLightTheme(nextTheme === "light");
              }}
            >
              <span aria-hidden="true">{isLightTheme ? "☾" : "☼"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}