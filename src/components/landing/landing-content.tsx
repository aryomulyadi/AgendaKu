import Link from "next/link";
import { AppPreview } from "@/components/landing/app-preview";

export function LandingContent() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] size-[600px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] size-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[45fr_55fr] lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 pt-4 lg:pt-0">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Fokus hari ini. Siap untuk besok.
              </h1>
              <p className="text-base text-foreground/85 sm:text-lg">
                Semua aktivitasmu, dalam satu tempat.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                AgendaKu membantu kamu mencatat, mengatur, dan menyelesaikan agenda harian dengan tetap menyiapkan apa yang perlu dikerjakan besok.
              </p>
              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-[10px] bg-primary px-5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-[#D0311E] active:translate-y-px"
                >
                  Mulai Sekarang
                </Link>
              </div>
            </div>

            <div className="flex items-start justify-center lg:items-center">
              <AppPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
