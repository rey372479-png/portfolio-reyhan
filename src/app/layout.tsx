import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AppShell from "@/components/AppShell";
import InitialLoader from "@/components/InitialLoader";
import SupportChat from "@/components/SupportChat";
import { ADMIN_USER_ID } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-reyhan-omega.vercel.app"),
  title: {
    default: "M. Reyhan Purnomo Putra | Portfolio",
    template: "%s | M. Reyhan Purnomo Putra",
  },
  description:
    "Portfolio M. Reyhan Purnomo Putra, siswa SMKN 1 Kota Pasuruan yang belajar web development, forex, dan cryptocurrency.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://portfolio-reyhan-omega.vercel.app",
    siteName: "Portfolio M. Reyhan Purnomo Putra",
    title: "M. Reyhan Purnomo Putra | Portfolio",
    description:
      "Portfolio web development dan project pilihan M. Reyhan Purnomo Putra.",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Reyhan Purnomo Putra | Portfolio",
    description:
      "Portfolio web development dan project pilihan M. Reyhan Purnomo Putra.",
  },
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

    return user?.id === ADMIN_USER_ID ? user.email ?? null : null;
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <InitialLoader />

        <header className="site-header">
          <Navbar adminEmail={await getAdminEmail()} />
        </header>
        <AppShell>{children}</AppShell>
        <Footer />
        <SupportChat />
      </body>
    </html>
  );
}