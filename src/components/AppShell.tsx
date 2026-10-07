"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="page-shell">
      <ViewTransition enter="portfolio-page-enter" exit="portfolio-page-exit" default="none">
        <div className="page-transition-content" key={pathname}>
          {children}
        </div>
      </ViewTransition>
    </div>
  );
}
