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

## Phase 6

- [ ] Profile
- [ ] Settings
- [ ] Dark Mode

---

## Phase 7

- [ ] Responsive
- [ ] Loading
- [ ] Empty State
- [ ] Error Handling

---

## Phase 8

- [ ] Testing
- [ ] Optimization
- [ ] Deployment

