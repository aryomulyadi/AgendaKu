![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-4169E1?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://agendaku.vercel.app)

# AgendaKu

Kelola aktivitas harian secara sederhana, cepat, dan nyaman.

![Preview](public/preview.png)

**[🔗 Live Demo](https://agendaku.vercel.app)**

---

## Fitur

- **📋 Manajemen Tugas** — Tambah, edit, hapus, tandai selesai, dan atur prioritas
- **📅 Kalender** — Lihat tugas per tanggal dengan grid bulanan
- **🔍 Pencarian & Filter** — Cari tugas, filter berdasarkan status dan deadline
- **🏷️ Kategori** — Kelompokkan tugas dengan kategori dan warna kustom
- **🌙 Dark Mode** — Tampilan terang/gelap mengikuti sistem
- **📱 Responsive** — Desktop & mobile
- **🔐 Autentikasi** — Login/register dengan Remember Me
- **⚡ Animasi** — Transisi halus dengan framer-motion

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| [Next.js 16](https://nextjs.org) (App Router) | Framework |
| [Prisma 7](https://prisma.io) | ORM |
| [Neon](https://neon.tech) (PostgreSQL) | Database |
| [Auth.js](https://authjs.dev) | Autentikasi |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [TanStack Query](https://tanstack.com/query) | Data fetching |
| [framer-motion](https://framer.com/motion) | Animasi |

## Development

```bash
git clone https://github.com/aryomulyadi/AgendaKu.git
cd AgendaKu
pnpm install
pnpm prisma generate
pnpm run dev
```

Buka `http://localhost:3000`.

## Environment Variables

Buat file `.env`:

```
DATABASE_URL="postgresql://user:password@host:5432/database"
AUTH_SECRET="openssl rand -hex 32"
AUTH_URL="http://localhost:3000"
```

## Deployment

Lihat [panduan deploy](docs/DEPLOY.md).
