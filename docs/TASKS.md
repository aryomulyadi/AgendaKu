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

## Phase 8 — Performance Polish

- [x] QueryProvider: `staleTime` 30s → 5min, tambah `refetchOnWindowFocus: false`
- [x] Hook baru `use-profile.ts` — React Query wrapper untuk `getProfile()` dengan staleTime 5min
- [x] DashboardHeader: ganti raw `useEffect` + `getProfile()` → `useProfile()`
- [x] `getTomorrowTodos()`: merge 2 sequential Prisma queries → 1 query dengan `OR`
- [x] `loading.tsx` dashboard: skeleton layout (sidebar + header + spinner)
- [x] Semua Tugas: date header real-time via `now` state + interval 60s
- [x] Semua Tugas: `toDateKey` pakai local timezone (`.getFullYear/getMonth/getDate`) bukan UTC `slice(0,10)`
- [x] TaskItem: date picker icon hanya render jika `onUpdate` ada

## Phase 9 — Rilis

- [ ] Setup PostgreSQL
- [ ] Testing
- [ ] Deploy

