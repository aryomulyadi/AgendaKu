import Image from "next/image";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center gap-3">
        <Image src="/AgendaKu_logo2.svg" alt="AgendaKu" width={36} height={36} className="rounded-md object-contain" unoptimized />
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-[14px] border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {children}
      </div>
    </div>
  );
}
