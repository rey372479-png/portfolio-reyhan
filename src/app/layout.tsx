import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./Navbar";

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
          <Navbar />
        </header>

        {children}
      </body>
    </html>
  );
}