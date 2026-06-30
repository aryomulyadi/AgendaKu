"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <img src="/AgendaKu_logo2.png" alt="AgendaKu" width={28} height={28} className="shrink-0 rounded-md object-contain" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            AgendaKu
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden h-9 items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center justify-center rounded-[10px] bg-primary px-5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-[#D0311E] active:translate-y-px"
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
