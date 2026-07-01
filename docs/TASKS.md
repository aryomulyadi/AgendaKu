# Development Progress

## Phase 1 â€” Setup

- [x] Setup Project
- [x] Install Dependencies
- [x] Configure Tailwind
- [x] Configure Prisma
- [x] Configure Database
- [x] Configure Authentication

---

## Phase 2 â€” Landing Page (First Experience)

- [x] Sync dokumentasi final v1
- [x] Hapus komponen lama (Hero, Trusted By, Feature Grid, Dashboard Preview, CTA gradient)
- [x] Update font ke Geist
- [x] Navbar minimal (flat, logo kiri, Masuk kanan)
- [x] TodaySection (greeting, task count, task items)
- [x] TomorrowPreview (compact, 2 items, reduced opacity)
- [x] BrandStatement (filosofi 2 baris)
- [x] CTA (input field + Mulai Gratis)
- [x] Footer minimal (nama + tahun)
- [x] Theme Provider & Dark Mode
- [x] Theme Toggle
- [x] Responsive
- [x] Self-review (Taste Skill)
- [x] Lint & Build

---

## Phase 3 â€” Dashboard Layout

- [x] Dashboard page + route group layout
- [x] Sidebar (desktop persistent, mobile Sheet)
- [x] Dashboard Header (greeting, date, search, quick add)
- [x] Today Summary (progress bar + count)
- [x] Focus Task (1 priority task)
- [x] Today Task List (mock di Phase 3, real data di Phase 4)
- [x] Tomorrow Preview (mock di Phase 3, real data di Phase 4)
- [x] Mini Calendar
- [x] Auth pages (login, register)
- [x] SQLite database
- [x] TanStack React Query setup
- [x] Responsive sidebar

---

## Phase 4 â€” CRUD Todo

- [x] Server actions (createTodo, toggleTodo, deleteTodo, getTodayTodos, getTodayStats, getFocusTask, getTomorrowTodos)
- [x] Zod schemas (createTodoSchema)
- [x] React Query hooks (useTodayTodos, useTodayStats, useFocusTask, useTomorrowTodos, useCreateTodo, useToggleTodo, useDeleteTodo)
- [x] QueryProvider di dashboard layout
- [x] TaskItem: interactive checkbox (toggle), delete button on hover
- [x] TaskInput: form dengan controlled input + Enter submit
- [x] TodayTaskList: real data dari DB, loading skeleton, empty state
- [x] TodaySummary: real stats dari DB, loading skeleton
- [x] FocusTask: real data dari DB, loading skeleton, hidden when empty
- [x] TomorrowPreview: real data dari DB, loading skeleton, empty state

---

## Phase 5 â€” Task Management & Categories

- [x] updateTodo server action + hook (prerequisite for all below)
- [x] Priority cycle on TaskItem (click accent bar)
- [x] Inline edit title on TaskItem (double-click)
- [x] Deadline with date picker on TaskItem
- [x] Category CRUD (schemas, actions, hooks, page at /dashboard/kategori)
- [x] Search bar functional (useSearchTodos hook, dropdown results)
- [x] Filter chips (Semua / Aktif / Selesai) in TodayTaskList (sort dropdown removed â€” data sorted by priority from server)
- [x] Category selector in TaskInput â€” tag icon dropdown to pick category when adding task
- [x] Category tooltip on TaskItem â€” hover over color dot shows category name with tooltip
- [x] ~~Focus task selector~~ (dihapus â€” tidak diperlukan, digantikan kategori)
- [x] ~~toggleFocusTask~~ (dihapus â€” ikut fokus feature)

---

## Phase 6 — Profile & Settings

- [x] Settings page (/dashboard/pengaturan) — update name, email, change password
- [x] Server actions: getProfile, updateProfile, changePassword
- [x] Zod schemas: updateProfileSchema, changePasswordSchema
- [ ] Profile page (future)

## Phase 6b — Calendar & Tomorrow Preview

- [x] Calendar date picker — klik tanggal di MiniCalendar, TodayTaskList menampilkan tugas di tanggal itu
- [x] Server action: getDateTodos(dateStr) — filter tasks by specific date
- [x] Hook: useDateTodos(dateStr)
- [x] MiniCalendar — selectedDate + onDateSelect props, ring highlight pada tanggal dipilih
- [x] TodayTaskList — selectedDate prop, dynamic header ("Tugas, Senin 29 Juni 2026")
- [x] TomorrowPreview — CRUD lengkap (TaskInput + toggle + delete), deadline otomatis set ke besok
- [x] createTodoSchema — tambah field deadline (nullable, optional)

---

## Phase 7a — 5 Halaman Sidebar

- [x] `/dashboard/hari-ini` — reuse TodaySummary + TodayTaskList dengan selectedDate=today
- [x] `/dashboard/besok` — pure tomorrow tasks (tanpa carry-over), full CRUD (TaskInput + TaskItem)
- [x] `/dashboard/semua-tugas` — semua tasks user, search bar + filter chips (Semua/Aktif/Selesai)
- [x] Server action: getAllTodos — query semua tasks user
- [x] Hook: useAllTodos
- [x] `/dashboard/selesai` — completed tasks archive (50 terbaru), toggle uncheck + delete
- [x] Server action: getCompletedTodos — query completed tasks
- [x] Hook: useCompletedTodos
- [x] `/dashboard/kalender` — full month grid 7 kolom (Senin-Minggu), prev/next nav, Hari ini button
- [x] Detail panel bawah — klik tanggal tampilkan tasks di tanggal itu via useDateTodos
- [x] Task dots per hari (3 dot max + "+N" overflow)

## Phase 7b — Polish

- [x] ErrorBoundary component (`src/components/ui/error-boundary.tsx`)
- [x] Dashboard error page (`src/app/(dashboard)/error.tsx`)
- [x] Error boundaries wrapping TodaySummary, TodayTaskList, TomorrowPreview, MiniCalendar di Dashboard
- [x] Query error UI (`isError` fallback) — semua pages & sections: hari-ini, besok, semua-tugas, selesai, kalender, kategori, today-summary, today-task-list, tomorrow-preview
- [x] TodaySummary: infinite skeleton fix (added `isError` check)
- [x] TodayTaskList: tasks created with selectedDate now inherit the date as deadline
- [x] MiniCalendar: cells memoized (`useMemo`), loading skeleton during fetch
- [x] Kalender grid: loading skeleton selama `useCalendarTasks` fetch
- [x] Shared utility: `numToPriority(n)` — replaces 6 inline priority mappings
- [x] Shared utility: `getTodayISO()`, `getTomorrowISO()` — reusable + memoized via `useMemo`
- [x] Pengaturan: fixed shared `showCurr` state (split into `showProfilePw` + `showCurr`)
- [x] Dashboard header: removed non-functional `+` button (no-op), cleaned unused imports
- [x] Sidebar: close Sheet otomatis setelah klik link navigasi (controlled `open` state)
- [x] Delete confirmation kategori (modal overlay + Batal/Hapus)
- [x] Username di greeting navbar (`getProfile` → "Selamat malam, Rifqi")
- [x] Search debounce 300ms di DashboardHeader (`searchQuery` state via `useEffect` + `setTimeout`)
- [x] Targeted query invalidation — tiap mutation invalidate subset query spesifik, bukan semua `["todos"]`
- [x] `getCompletedTodos` — limit dinaikkan 50→200 + return `{ todos, total, hasMore }`
- [x] TaskItem: category dot + tooltip diganti → top colored bar 3px + badge inline (pill dot + nama) sebelum checkbox
- [x] Besok page: tambah kategori selector di TaskInput (useCategories + selectedCategoryId)
- [x] Semua Tugas: grouping task per tanggal spesifik (Hari Ini/Besok/Kemarin/tanggal) + header separator
- [x] Kalender: hapus "Hari ini" button (redundan, tidak berfungsi)
- [x] mapTodo: tambah `createdAt` ke return value (untuk grouping di semua-tugas)
- [x] Sidebar: hapus "Selesai" dari navItems + import CheckCheck
- [x] TomorrowPreview: tambah kategori selector (selectedCategoryId state + props ke TaskInput)
- [x] Logo: placeholder SVG (public/logo.svg), ganti badge "K" di navbar + sidebar
- [x] Logo: ganti ke AgendaKu_logo.png + rounded-md (pakai `<img>` karena PNG tidak tampil via `next/image`)
- [x] Landing: headline/subheadline/description/CTA copy revamp
- [x] Landing preview: mock data + categoryColor/categoryName showcase
- [x] Landing preview: ganti contoh agenda ke general (Belanja, Olahraga, Meeting Kerjaan)
- [x] "Tugas" → "Agenda" di semua user-facing text (11 file)
- [x] TaskItem: hapus Calendar icon dekoratif (duplicate, tidak interaktif)
- [x] AppPreview: ganti TaskInput → mock visual-only (tidak bisa diketik)

## Phase 7c — Bugfixes

- [x] TaskItem: hapus label "Hari Ini" redundant di date span (deadline hari ini tidak tampil)
- [x] TaskItem: perbaiki icon Calendar tidak berfungsi — ganti `<label>` wrapping SVG jadi `<button>` + `showPicker()`
- [x] TaskItem: pindahkan class `group` dari outer card ke inner content div agar hover priority bar tidak trigger icon calendar/delete

## Phase 7d — Bugfixes (icon Calendar)

- [x] TaskItem: hapus seluruh icon Calendar + hidden date input karena tidak berfungsi

## Phase 8 — Performance Polish

- [x] QueryProvider: `staleTime` 30s → 5min, tambah `refetchOnWindowFocus: false`
- [x] Hook baru `use-profile.ts` — React Query wrapper untuk `getProfile()` dengan staleTime 5min
- [x] DashboardHeader: ganti raw `useEffect` + `getProfile()` → `useProfile()`
- [x] `getTomorrowTodos()`: merge 2 sequential Prisma queries → 1 query dengan `OR`
- [x] `loading.tsx` dashboard: skeleton layout (sidebar + header + spinner)
- [x] Semua Tugas: date header real-time via `now` state + interval 60s
- [x] Semua Tugas: `toDateKey` pakai local timezone (`.getFullYear/getMonth/getDate`) bukan UTC `slice(0,10)`
- [x] TaskItem: date picker icon hanya render jika `onUpdate` ada

## Phase 8b — Remember Me

- [x] loginSchema: hapus rememberMe (pakai state lokal, bukan react-hook-form)
- [x] LoginForm: tambah checkbox "Ingat Saya" + kirim rememberMe ke signIn
- [x] auth.ts: tambah field rememberMe di credentials + pass ke authorize return
- [x] auth.config.ts: custom JWT encode/decode (Web Crypto HMAC-SHA256) — rememberMe=true → 30 hari, false → 24 jam
- [x] RegisterForm + registerAction: kirim rememberMe: "true" saat auto-login

## Phase 8c — Jam Opsional di Kalender

- [x] TaskItem: `formatDate` tampilkan jam (HH:mm) jika deadline bukan midnight UTC
- [x] TaskItem: prop baru `timePickerDate` — render hanya input time (date dari konteks kalender)
- [x] Kalender page: task detail panel pakai `timePickerDate` agar user bisa set jam

## Phase 9 — Finalisasi Rilis

- [x] Migrasi `middleware.ts` → `proxy.ts` (convention Next.js 16)
- [x] callbackUrl: baca `useSearchParams()` di LoginForm + redirect setelah login sukses
- [x] Sidebar: tambah tombol "Keluar" dengan `signOut({ callbackUrl: "/login" })`
- [x] Login page: bungkus `<LoginForm />` dengan `<Suspense>` (required untuk `useSearchParams`)
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

## Phase 10 — Bugfix & Polish

- [x] Fix auto-login register — hapus server-side `signIn` dari `registerAction`, client-side `signIn` saja
- [x] Tambah `.env.example` — dokumentasi env vars (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`)
- [x] Pindah `prisma` dari `dependencies` → `devDependencies` di `package.json`
- [x] Hapus dummy Credentials provider di `auth.config.ts` (real provider di `auth.ts`, array dikosongkan)
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

## Phase 11 — Bugfix Batch

- [x] Fix `getTomorrowTodos()` — naikkan `take: 5` → `take: 10`, perbaiki slicing logic, tambah `include: { category }`, return full shape via `mapTodo`
- [x] Fix `TomorrowPreview` — ganti hardcoded `priority={1}` ke data asli (`priority`, `deadline`, `categoryColor`, `categoryName`)
- [x] Fix query invalidation — tambah `["todos", "focus"]` & `["todos", "completed"]` ke semua mutation, ganti `onSettled` → `onSuccess` di `useToggleTodo`
- [x] Konsolidasi Pengaturan page — ganti `useEffect` + `getProfile()` manual ke `useProfile()` hook
- [x] Fix double-fetch Hari Ini — `TodayTaskList` panggil `useQuery` kondisional, bukan kedua hook selalu
- [x] Validasi input `getDateTodos` — cek format `YYYY-MM-DD`, return `[]` kalau invalid
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

## Phase 12 — Aksesibilitas & Mobile Polish

- [x] Mobile search fallback — tombol Search icon di `<sm` yang toggle search bar
- [x] `aria-label` di icon-only buttons: Sheet trigger, delete, priority bar, prev/next month, search clear, password toggle
- [x] Search dropdown: `role="listbox"`, `role="option"`, `aria-selected`, `aria-live="polite"`
- [x] Modal delete kategori: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [x] Form `aria-invalid` + `aria-describedby` di login & register inputs
- [x] Hapus duplicate `--color-accent` di `globals.css` (hardcoded + CSS variable, duplikat)
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

## Phase 13 — Polish & Configuration

- [x] Fix `--color-secondary` — hardcoded `#8C857D` → CSS variable `var(--secondary)` + dark mode value `#6B6358`
- [x] Add `loading.tsx` untuk 7 halaman sidebar (hari-ini, besok, semua-tugas, selesai, kalender, kategori, pengaturan)
- [x] Config `next.config.ts` — security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [x] Tambah `public/robots.txt` — allow `/`, disallow `/dashboard` `/api`
- [x] Tambah `public/sitemap.xml` — landing, login, register pages
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)
## Phase 14 — Animasi framer-motion

- [x] TaskItem enter/exit — AnimatePresence + motion.div di today-task-list.tsx, besok, semua-tugas, selesai, kalender
- [x] Page transition — PageTransition client component wrapping `{children}` di dashboard layout
- [x] Search dropdown — AnimatePresence + scale/fade di dashboard-header.tsx
- [x] Progress bar — spring animation (stiffness: 80, damping: 15) di today-summary.tsx
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

---

## Phase 15 — Bugfix Batch 2

- [x] Focus Task — hapus dead code (getFocusTask action + useFocusTask hook + keys.focus)
- [x] Search klik — navigasi ke halaman relevan via router.push (hari-ini/besok/kalender berdasarkan deadline)
- [x] MiniCalendar — fix `isCurrentMonth()` collision via index parameter (ganti indexOf dengan idx dari map)
- [x] Besok page — gunakan action baru `getBesokTodos()` (merge deadline besok + carry-over tanpa limit), hook `useBesokTodos()`, render carry-over dengan visual amber + "Tertunda" label
- [x] Build & lint — 0 errors, 3 warnings (pre-existing img warnings)

---

## Phase 16 — Configuration & Consistency

- [x] proxy.ts — confirmed correct for Next.js 16 (convention, bukan middleware.ts)
- [x] Font fix — globals.css: `--font-sans` ganti `var(--font-inter)` → `var(--font-geist)`
- [x] Duplikat `getTomorrowISO()` — tomorrow-preview.tsx import dari `@/lib/utils`, hapus local definition
- [x] Weekday consistency — mini-calendar Senin-first + grid offset fix, match Calendar page
- [x] CTA copy — landing hero "Mulai Sekarang" → "Mulai Gratis" (konsisten dengan navbar)
- [x] Sheet close button — tambah `showCloseButton={false}` di sidebar.tsx
- [x] Auth card logo — ganti "K" huruf dengan `<img>` logo AgendaKu
- [x] Bersihkan default Vercel SVGs — hapus 5 file (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- [x] Pengaturan useEffect — eslint-disable pada setProfileName + setProfileEmail
- [x] Empty states — tambah icon + wrapper flex di 7 lokasi (Inbox, CalendarDays, CheckCheck, Tag)
- [x] TomorrowPreview opacity — `opacity-80` → `opacity-90`
- [x] Fix dashboard error — hapus `.next` cache (korup karena rename proxy.ts → middleware.ts → proxy.ts)
- [x] Build & lint — 0 errors, 4 warnings (pre-existing img warnings)

---

## Phase 17 — MVP Completion (Search Fix + Filter Terlambat)

- [x] Fix search navigation — `getTaskPage()`: deadline → `/dashboard/kalender`, null → `/dashboard/semua-tugas`
- [x] Filter "Terlambat" — today-task-list.tsx (chip + overdue filter logic via `deadline < getTodayISO()`)
- [x] Filter "Terlambat" — semua-tugas/page.tsx (chip + filter logic + empty state)
- [x] Build & lint — 0 errors, 4 warnings (pre-existing img warnings)

---

---

## Phase 18 — Final Polish

- [x] 404 page — buat `app/not-found.tsx` (simple layout + link ke dashboard)
- [x] Fix 4 img warnings — revert ke `<img>` + `eslint-disable-next-line` (PNG tidak kompatibel next/image)
- [x] Optimasi logo — ganti PNG (1MB) → SVG (51KB) dengan `<Image unoptimized>` — 0 lint warnings
- [x] Build & lint — **0 errors, 0 warnings** (img warnings resolved dengan next/Image)

---

## Phase 19 — Deployment Preparation

- [x] Migrasi PostgreSQL — `schema.prisma`: `provider = "sqlite"` → `"postgresql"`
- [x] Update Prisma adapter — `PrismaLibSql` → `PrismaPg` di `src/lib/prisma.ts`
- [x] Update `.env.example` — `DATABASE_URL` PostgreSQL format + SQLite comment
- [x] Koneksi ke Neon (PostgreSQL cloud, IPv4 compatible) — update `.env` dengan connection string
- [x] Hapus migration SQLite lama + migration_lock.toml ke `provider = "postgresql"`
- [x] `prisma migrate dev --name init` — migration PostgreSQL berhasil (tabel User, Category, Todo)
- [x] Vercel config — `vercel.json` (buildCommand: `prisma generate && next build`)
- [x] Dokumentasi deploy — `docs/DEPLOY.md`
- [x] Commit & push ke GitHub
- [x] Build & lint — **0 errors, 0 warnings**

---

## Phase 21 — Production Readiness Polish

- [x] Favicon — buat `public/favicon.svg`, tambah `icons` di root metadata
- [x] Root metadata — tambah `viewport` export dengan `themeColor` (light/dark)
- [x] Register Suspense — bungkus `<RegisterForm />` dengan `<Suspense>` (sama seperti Login)
- [x] Auth error.tsx — `(auth)/error.tsx` dengan tombol Coba Lagi
- [x] Auth loading.tsx — `(auth)/loading.tsx` skeleton form
- [x] Dashboard metadata — export `title.template` agar sub-page punya judul spesifik
- [x] Landing metadata — export `title` + `description` spesifik landing page
- [x] global-error.tsx — root level catch-all error boundary
- [x] Security headers — tambah `X-XSS-Protection` + `Permissions-Policy` di `next.config.ts`
- [x] Build & lint — **0 errors, 0 warnings**

---

## Phase 20 — Mobile Polish (Kategori Page)

- [x] Fix double padding — hapus `p-4 sm:p-6` dari wrapper kategori page (layout sudah handle)
- [x] Fix create form — stack `flex-col` di mobile, tombol Buat terpisah
- [x] Fix color picker overflow — 8 dot → 4 dot di mobile (`max-sm:hidden` untuk index >= 4)
- [x] Fix delete modal — `w-80` → `w-[90vw] max-w-80` (tidak edge-to-edge di 320px)
- [x] Build & lint — **0 errors, 0 warnings**

