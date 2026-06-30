# DESIGN.md

# AgendaKu Design System

Version: 3.0

---

# 1. Design Philosophy

AgendaKu adalah Personal Workspace.

Bukan aplikasi project management.

Bukan workspace korporat.

Bukan dashboard analytics.

Bukan SaaS startup.

AgendaKu adalah ruang pribadi yang hangat untuk membantu pengguna menyelesaikan hari mereka dengan lebih tenang.

Prinsip utama:

Today First.
Tomorrow Ready.

Hari ini selalu menjadi fokus utama.

Besok selalu terlihat, tetapi tidak pernah mengambil perhatian dari hari ini.

AgendaKu harus terasa ringan ketika dibuka.

Pengguna tidak boleh merasa sedang mengoperasikan software yang rumit.

---

# 2. Design Goals

Seluruh UI harus memenuhi tujuan berikut.

- mudah dipahami dalam kurang dari 5 detik
- fokus pada pekerjaan hari ini
- mengurangi beban berpikir
- cepat digunakan
- nyaman dipandang berjam-jam
- konsisten di seluruh aplikasi

Jika sebuah desain terlihat menarik tetapi membuat pengguna berpikir lebih lama,
pilih desain yang lebih sederhana.

---

# 3. Visual Language

Kesan pertama yang harus muncul.

Calm

Warm

Hangat

Focused

Personal

Professional

Modern

Natural

Bukan:

Corporate

Crypto

AI Startup

Gaming

Futuristic

Over Designed

Tech Startup

Referensi karakter visual:

- Things 3 (prinsip: fokus, personal, bersih)
- Bear Notes (prinsip: editorial, hangat, nyaman)
- MUJI (prinsip: tidak berlebihan, fungsional, tenang)
- Apple Reminders (prinsip: sederhana, terpercaya)
- Basecamp (prinsip: personal, tidak korporat)

Jangan meniru tampilannya.

Ambil hanya prinsip desainnya.

---

# 4. Layout

Landing Page

Layout dua kolom.

45% Copy

55% Product Preview

Preview aplikasi adalah fokus utama.

Copy mendukung preview, bukan sebaliknya.

Kiri berisi:

- headline singkat
- deskripsi pendek
- microcopy
- CTA

Kanan berisi:

preview aplikasi menggunakan komponen asli.

Jangan menggunakan fake dashboard.

---

Dashboard

Today

80%

Tomorrow

20%

Tomorrow hanya preview.

Upcoming bukan fokus.

---

Container

Max Width

1280px

Content Width

720–960px

---

Spacing

Gunakan ritme yang konsisten.

8

12

16

24

32

48

64

96

Hindari jarak acak.

Whitespace digunakan untuk membantu fokus,
bukan sekadar membuat halaman kosong.

---

# 5. Color Philosophy

Gunakan warna netral sebagai fondasi.

Gunakan warna brand hanya sebagai aksen.

Komposisi warna:

90% Neutral

10% Accent

Jangan memenuhi UI dengan warna brand.

Gunakan warna hanya untuk membantu pengguna memahami informasi.

Bukan dekorasi.

---

# 6. Brand Palette

Primary

#BE1A1A

Primary Hover

#D0311E

Accent

#F7D87F

Accent Soft

#F8EBAB

Success

#6BBF7A

Neutral menggunakan warm tone.

Bukan slate dingin.

---

# 7. Surface Layers

Background

↓

Surface

↓

Card

↓

Hover

↓

Active

Layer harus terasa natural.

Jangan menggunakan glassmorphism.

Jangan menggunakan glow.

Dark mode tidak menggunakan hitam polos.

Gunakan warm dark.

Surface bertingkat.

Background terasa nyaman dipandang lama.

---

# 8. Color Usage Rules

Primary Red (#BE1A1A)

Gunakan hanya untuk:

- Primary CTA
- Checkbox aktif
- Prioritas tinggi
- Aksi utama

Jangan:

- memenuhi UI dengan merah
- menggunakan merah sebagai background luas

---

Accent Gold (#F7D87F / #F8EBAB)

Gunakan hanya untuk:

- Prioritas medium
- Elemen yang perlu perhatian hangat
- Highlight subtle

---

Success Green (#6BBF7A)

Gunakan hanya untuk:

- Task selesai
- Status positif

Bukan hijau neon.

---

Neutral Warm

Gunakan untuk 90% UI.

Background: warm off-white

Surface: warm white

Text: warm near-black

Muted: warm grey

---

# 9. Typography

Gunakan Inter.

Prioritaskan readability.

Heading

36–44px

Sub Heading

20–28px

Body

15–17px

Caption

13px

Kurangi headline yang terlalu besar.

Gunakan maksimal dua weight dalam satu area.

Gunakan rhythm yang lebih editorial.

Jangan menggunakan headline yang berteriak.

---

# 10. Component Language

Komponen harus terasa ringan.

Card

Radius: 14px.

Border tipis.

Shadow sangat halus.

Hover: border lebih jelas.

Checkbox

Ukuran sedikit lebih besar dari default.

Aktif: merah (#BE1A1A).

Completed: hijau (#6BBF7A).

Task Item

Tinggi konsisten.

Padding nyaman.

Hover: border lebih terlihat.

Input

Radius: 10px.

Tidak terlalu tinggi.

Tidak terlalu bulat.

Focus: ring tipis.

Button

Solid.

Hover sederhana.

Tidak menggunakan gradient.

Primary: merah.

Secondary: outline netral.

Radius: 10px.

Transition: 150–200ms.

---

# 11. Priority Colors

High

#BE1A1A

Medium

#F7D87F

Low

Warm grey (#8C857D)

---

# 12. Motion

Motion membantu fokus.

Bukan hiburan.

Durasi

150–200ms

Gunakan untuk

Hover

Open

Close

Page Transition

Checklist

Jangan membuat animasi yang berulang.

Gunakan cubic-bezier smoothing.

---

# 13. Product Preview

Landing page harus memperlihatkan aplikasi.

Gunakan komponen nyata.

Misalnya:

Today items

Checkbox

Tomorrow Preview

Priority indicator

Tomorrow section

Jangan membuat ilustrasi dashboard.

Jangan membuat statistik palsu.

---

# 14. Dashboard

Fokus utama.

Hari Ini.

Contoh:

Hari Ini

○ Review Homepage

○ Meeting

✓ Kirim Proposal

-------------------

Besok

○ Presentasi

○ Belajar React

Dashboard tidak boleh terasa seperti project management tool.

---

# 15. Empty State

Gunakan bahasa manusia.

Contoh:

Hari ini selesai.

Besok sudah siap.

Jangan menggunakan:

No Data.

No Task.

Empty.

---

# 16. Copywriting

Gunakan bahasa.

Singkat.

Hangat.

Jelas.

Personal.

Hindari:

Modern

Powerful

Seamless

Revolutionary

Next Generation

Productivity Solution

---

# 17. Icons

Gunakan Lucide.

Ukuran konsisten.

18–20px.

Jangan menggunakan terlalu banyak ikon.

---

# 18. Component States

Button

Default → Hover → Active (scale) → Focus (ring) → Disabled (opacity)

Checkbox

Unchecked (border netral) → Checked (bg merah + icon putih) → Completed (bg hijau)

Task Item

Default → Hover (border lebih jelas) → Completed (strikethrough + hijau)

Input

Default (border tipis) → Focus (ring primary tipis) → Disabled (bg muted)

Link

Default (muted) → Hover (foreground)

---

# 19. Interaction States

Tap/Click

translate-y-px

Hover

Opacity atau border change. Bukan scale besar.

Focus

ring-2 ring-primary/30

Transition

150-200ms cubic-bezier ease

Jangan menggunakan:

- scale berlebihan
- glow pada hover
- animasi yang berulang

---

# 20. Accessibility

Kontras minimal WCAG AA.

4.5:1 untuk body text.

3:1 untuk large text (18px+).

Semua tombol memiliki focus state visible.

Focus ring tidak boleh dihapus.

Target klik minimal 44px.

Warna bukan satu-satunya indikator.

Dark mode mempertahankan semua rasio kontras.

---

# 21. Responsive

Desktop terlebih dahulu.

Tablet.

Mobile.

Layout berubah secara natural.

Bukan sekadar mengecilkan semua elemen.

---

# 22. Do

✔ Gunakan komponen nyata.
✔ Prioritaskan Today.
✔ Tampilkan Tomorrow sebagai preview.
✔ Gunakan whitespace dengan tujuan.
✔ Konsisten.
✔ Sederhana.
✔ Fokus.
✔ Hangat.

---

# 23. Don't

✘ Badge promosi.
✘ Trusted By palsu.
✘ Fake dashboard.
✘ Fake statistics.
✘ Glassmorphism.
✘ Glow berlebihan.
✘ Gradient besar.
✘ Tiga feature card identik.
✘ Sidebar rumit.
✘ Hero marketing generik.
✘ Copywriting berlebihan.
✘ UI penuh warna brand.
✘ Background krem berlebihan.
✘ Hitam polos di dark mode.

---

# 24. Decision Rule

Jika ada dua solusi yang sama baik.

Pilih yang:

- lebih sederhana
- lebih cepat dipahami
- lebih sedikit klik
- lebih sedikit distraksi
- lebih fokus pada hari ini

---

# 25. Final Principle

AgendaKu bukan aplikasi yang ingin membuat pengguna berkata:

"UI-nya keren."

AgendaKu ingin membuat pengguna berkata:

"Saya langsung tahu apa yang harus saya kerjakan hari ini."
