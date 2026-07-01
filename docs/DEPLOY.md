# Deployment ke Vercel

## Prasyarat

- Akun Vercel (vercel.com)
- Database PostgreSQL (Neon, Supabase, Railway, dll.)
- Domain (opsional)

## Langkah-langkah

### 1. Setup Database PostgreSQL

Buat database PostgreSQL (misal via [Neon](https://neon.tech) atau [Supabase](https://supabase.com)).
Salin connection string yang diberikan.

### 2. Persiapan Environment Variables

Di Vercel Dashboard → Project → Settings → Environment Variables, tambahkan:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://user:password@host:5432/dbname?sslmode=require` |
| `AUTH_SECRET` | Hasilkan dengan `openssl rand -hex 32` |
| `AUTH_URL` | URL aplikasi, misal `https://agendaku.vercel.app` |

### 3. Migrasi Database

Setelah `DATABASE_URL` terisi, jalankan migrasi:

```bash
npx prisma migrate deploy
```

### 4. Deploy ke Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

Atau hubungkan repositori GitHub dan Vercel akan otomatis deploy setiap push ke branch utama.

### 5. Build & Deploy

Vercel akan menjalankan perintah berikut secara otomatis:
1. `pnpm install`
2. `prisma generate`
3. `next build`

Pastikan build berhasil (0 error) sebelum mengarahkan domain.

## Production Checklist

- [ ] Environment variables terisi semua
- [ ] Database sudah termigrasi
- [ ] Build lulus (0 error, 0 TypeScript error)
- [ ] Domain sudah diarahkan (jika pakai custom domain)
- [ ] SSL aktif (otomatis via Vercel)
