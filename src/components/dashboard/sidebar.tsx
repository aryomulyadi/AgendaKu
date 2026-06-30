"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sun,
  CalendarDays,
  ListTodo,
  Tags,
  Calendar,
  Settings,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Hari Ini", href: "/dashboard/hari-ini", icon: Sun },
  { label: "Besok", href: "/dashboard/besok", icon: CalendarDays },
  { label: "Semua Agenda", href: "/dashboard/semua-tugas", icon: ListTodo },
  { label: "Kategori", href: "/dashboard/kategori", icon: Tags },
  { label: "Kalender", href: "/dashboard/kalender", icon: Calendar },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const handleNavClick = useCallback(() => {
    setSheetOpen(false);
  }, []);

  const navContent = (closeOnClick?: boolean) => (
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeOnClick ? handleNavClick : undefined}
            className={cn(
              "flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-all duration-150",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
          <img src="/AgendaKu_logo2.png" alt="AgendaKu" width={28} height={28} className="shrink-0 rounded-md object-contain" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            AgendaKu
          </span>
        </div>
        {navContent()}
      </aside>

      <span className="lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
              <img src="/AgendaKu_logo2.png" alt="AgendaKu" width={28} height={28} className="shrink-0 rounded-md object-contain" />
              <span className="text-base font-semibold tracking-tight text-foreground">
                AgendaKu
              </span>
            </div>
            {navContent(true)}
          </SheetContent>
        </Sheet>
      </span>
    </>
  );
}
