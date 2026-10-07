"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`page-shell${isTransitioning ? " page-shell-is-transitioning" : ""}`}>
      {children}
    </div>
  );
}
