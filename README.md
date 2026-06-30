# AgendaKu

**Fokus hari ini. Siap untuk besok.**

AgendaKu adalah aplikasi manajemen agenda harian yang membantu kamu mencatat, mengatur, dan menyelesaikan agenda harian dengan tetap menyiapkan apa yang perlu dikerjakan besok.

## Fitur

- **Agenda Hari Ini** — fokus pada tugas yang perlu diselesaikan hari ini
- **Besok** — rencanakan agenda untuk esok hari
- **Semua Agenda** — lihat semua agenda dengan grouping per tanggal (Hari Ini / Besok / Kemarin / tanggal)
- **Kategori** — kelompokkan agenda dengan kategori warna
- **Kalender** — lihat agenda per bulan dengan task dots
- **Agenda Selesai** — arsip agenda yang sudah selesai
- **Pencarian** — cari agenda dengan debounce 300ms
- **Dark Mode** — dukungan tema gelap

## Design

- Palet warm neutral (#F8F6F3 bg, #FFFFFF card)
- Brand red (#BE1A1A), gold (#F7D87F)
- Radius: 14px card, 10px button
- Transisi maksimal 180ms
- Tanpa glassmorphism, glow, atau heavy shadow

## Tech Stack

- **Framework:** Next.js 16.2.9, React 19
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui (base-nova)
- **Database:** Prisma 7 + SQLite (development)
- **Autentikasi:** Auth.js v5 (Credentials)
- **State:** TanStack Query (data fetching), React Hook Form + Zod (form)
- **Tooling:** pnpm, ESLint, sonner (toast)

## Getting Started

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Push schema ke SQLite
pnpm prisma db push

# Jalankan dev server
pnpm dev
```

Buka `http://localhost:3000`, buat akun, dan mulai kelola agenda harian.

## Scripts

| Command | Deskripsi |
|---|---|
| `pnpm dev` | Jalankan development server |
| `pnpm build` | Build untuk production |
| `pnpm lint` | Jalankan ESLint |
| `pnpm prisma studio` | Buka database browser |
