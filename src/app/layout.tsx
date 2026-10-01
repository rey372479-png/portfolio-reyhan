import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "M. Reyhan Purnomo Putra | Portfolio",
  description:
    "Portfolio pribadi M. Reyhan Purnomo Putra - Web Developer, Forex Trader & Crypto Enthusiast",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getAdminEmail = async () => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return null;
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.email ?? null;
  };

  return (
    <html lang="id">
      <body>
        <header className="site-header">
          <Navbar adminEmail={await getAdminEmail()} />
        </header>

        {children}

        <Footer />
      </body>
    </html>
  );
}