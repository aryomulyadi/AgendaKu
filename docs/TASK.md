# Development Progress

## Phase 1 — Setup
- [x] Setup Project (Next.js 16, Turbopack)
- [x] Install Dependencies
- [x] Configure Tailwind
- [x] Configure Prisma (SQLite → PostgreSQL/Neon)
- [x] Configure Authentication (Credentials + JWT)
- [x] Configure PostgreSQL Adapter (PrismaPg)

## Phase 2 — Landing
- [x] Floating Navbar (rounded, blur, sticky, centered)
- [x] Hero (left content + right mockup dashboard)
- [x] Feature Grid (6 cards, hover animation)
- [x] Dashboard Preview (mockup besar)
- [x] CTA (gradient background)
- [x] Footer (simple)
- [x] Theme Provider & Dark Mode
- [x] Theme Toggle

## Phase 3 — Dashboard
- [x] Dashboard Layout
- [x] Sidebar
- [x] Navbar
- [x] Statistics

## Phase 4 — Todo CRUD
- [x] Create Todo
- [x] Read Todo
- [x] Update Todo
- [x] Delete Todo

## Phase 5 — Category & Filter
- [x] Category CRUD
- [x] Search
- [x] Filter
- [x] Sorting

## Phase 6 — Profile & Settings
- [x] Profile
- [x] Settings
- [x] Dark Mode

## Phase 7 — Polish
- [x] Responsive
- [x] Loading / Skeleton
- [x] Empty State
- [x] Error Handling

## Phase 8 — Ready
- [x] Ready for Deployment

## Phase 9 — Landing & Auth
- [x] Landing page hero & feature section
- [x] Login form with email/password
- [x] Register form with email/password

## Phase 10 — Dashboard
- [x] Sidebar navigation
- [x] Stats cards (total, hari ini, selesai, prioritas)
- [x] Today preview widget
- [x] Tomorrow preview widget

## Phase 11 — Todo Features
- [x] TaskItem component (checkbox, title, priority bar, category bar)
- [x] Add todo form
- [x] Edit todo (inline double-click)
- [x] Delete todo with confirmation
- [x] Toggle complete
- [x] Priority: LOW (1) / MEDIUM (2) / HIGH (3)

## Phase 12 — Calendar
- [x] Calendar grid with month navigation
- [x] Task dots on dates
- [x] Date selection → task list
- [x] Today highlight
- [x] i18n month/day names (Bahasa)

## Phase 13 — Search & Filter
- [x] Search bar in semua-tugas
- [x] Filter by category
- [x] Filter by status (all / active / completed / terlambat)
- [x] Sort by date / priority / title

## Phase 14 — Category Management
- [x] Category list with count
- [x] Create category (name + color picker)
- [x] Inline edit category name
- [x] Category color change
- [x] Delete category with confirmation

## Phase 15 — Settings
- [x] Profile display
- [x] Theme toggle (light / dark / system)
- [x] Account section

## Phase 16 — Advanced Todo
- [x] Deadline picker (date + optional time)
- [x] Time picker toggle
- [x] Carry-over tasks (besok view shows incomplete from today)
- [x] Priority bar interaction (cycle priority)

## Phase 17 — UX Polish
- [x] Framer-motion animations (layout, enter/exit)
- [x] Toast notifications (sonner)
- [x] Loading skeletons
- [x] Empty states with illustrations
- [x] "Terlambat" filter (overdue + incomplete)
- [x] Geist font
- [x] Accessible ARIA labels

## Phase 18 — 404 & Image Fixes
- [x] 404 page (`not-found.tsx`)
- [x] next/image warnings fixed (revert to `<img>` + eslint-disable)

## Phase 19 — Deployment
- [x] Prisma SQLite → PostgreSQL (Neon)
- [x] `PrismaLibSql` → `PrismaPg` adapter
- [x] `.env.example`
- [x] `vercel.json`
- [x] `docs/DEPLOY.md`
- [x] Migration init (User, Category, Todo)

## Phase 20 — Mobile Polish (Kategori)
- [x] Double padding fix
- [x] Color picker: 4 dots on mobile
- [x] Create form: stack vertical on mobile
- [x] Delete modal: `w-[90vw] max-w-80`

## Phase 21 — Production Readiness
- [x] Favicon SVG
- [x] Root `viewport` export with `themeColor`
- [x] Register Suspense
- [x] Auth `error.tsx` + `loading.tsx`
- [x] Dashboard metadata template
- [x] Landing metadata
- [x] `global-error.tsx`
- [x] Security headers (X-XSS-Protection, Permissions-Policy)

## Phase 22 — Timezone Fix
- [x] `toLocalISOString()` helper in utils.ts
- [x] `mapTodo` returns local date string
- [x] `extractTime`/`formatDate` match local format (no "Z")
- [x] All comparisons use local dates

## Phase 23 — Auth & Adapter Fix
- [x] `PrismaAdapter` removed (JWT doesn't need it)
- [x] `TextEncoder`/`TextDecoder` for base64url (non-latin1 support)
- [x] Register auto-login: silent fail → toast + redirect
- [x] Login callbackUrl validation (relative only)
- [x] `rememberMe` added to JWT type

## Phase 24 — Data & Navigation
- [x] `todayOrNoDeadline`: includes ALL incomplete no-deadline tasks
- [x] `getTomorrowTodos` + `getBesokTodos`: no createdAt filter, no take:10
- [x] `getDateTodos`: same no-deadline fix
- [x] Sidebar: added "Selesai" link
- [x] Navbar: "Masuk" visible on mobile, "AgendaKu" text hidden on mobile
- [x] Calendar today highlight: dynamic `new Date()` instead of memoized

## Phase 25 — Polish
- [x] Category mutations → invalidate `["todos"]` queries
- [x] Search case-insensitive (`mode: "insensitive"`)
- [x] Priority cycle: LOW→MEDIUM→HIGH→LOW
- [x] Duplicate category error → toast "Nama kategori sudah digunakan"
- [x] Inline edit empty title → toast "Judul tidak boleh kosong"
- [x] "Tertunda" section header once (not per-task) in tomorrow-preview
- [x] Landing page preview: readonly TaskItem (guard `handleDoubleClick` with `!onUpdate`)

## Phase 26 — Bug Fixes & Polish
- [x] `getDateTodos`: revert to `createdAt`-bounded no-deadline lookup (fixes flood on every date)
- [x] `getCalendarTasks`: query by deadline only (no `createdAt` fallback, cleaner data)
- [x] Search cache: add `["todos", "search"]` invalidation to all mutations; set `staleTime: 0`
- [x] Timezone: `toLocalISOString` appends `+/-HH:MM` offset (consistent browser parsing)
- [x] Landing preview: `pointer-events-none` on entire card (fully non-interactive)
- [x] globals.css: remove duplicate `--color-success` hex definition
- [x] Mini-calendar: ARIA labels on nav buttons; trailing days `pointer-events-none`
- [x] Auth buttons: `hover:bg-[#D0311E]` → `hover:bg-primary/90`
- [x] Login form: guard `console.error` behind `NODE_ENV !== "production"`
- [x] Footer: dynamic year via `new Date().getFullYear()`
- [x] TaskItem toggle: `role="checkbox"` + `aria-checked` for accessibility
