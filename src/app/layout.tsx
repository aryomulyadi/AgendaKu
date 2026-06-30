import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AgendaKu",
  description: "Kelola aktivitas harian secara sederhana, cepat, dan nyaman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
