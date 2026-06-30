# AI Rules

## General Rules

Selalu membaca seluruh folder docs sebelum membuat perubahan.

Jangan membuat fitur di luar PRD.

Kerjakan hanya task yang sedang aktif.

Jangan mengubah file yang tidak berkaitan.

---

## Code Style

Gunakan TypeScript.

Gunakan Functional Component.

Gunakan Clean Code.

Gunakan reusable component.

Gunakan custom hook jika diperlukan.

Pisahkan business logic dari UI.

---

## UI Rules

Ikuti DESIGN.md.

Gunakan shadcn/ui.

Gunakan Tailwind CSS.

Gunakan spacing yang konsisten.

Gunakan responsive design.

Gunakan Dark Mode.

Gunakan animasi ringan.

---

## Database

Gunakan Prisma.

Jangan melakukan query berulang.

Gunakan relasi yang benar.

---

## Security

Validasi semua input menggunakan Zod.

Password harus di-hash.

Lindungi semua route yang membutuhkan autentikasi.

---

## Setelah Menyelesaikan Task

AI wajib:

1. Menjelaskan perubahan.
2. Menampilkan daftar file yang berubah.
3. Menjelaskan alasan perubahan.
4. Memberikan langkah berikutnya.
5. Menunggu instruksi selanjutnya.

## Document Priority

Jika terjadi konflik antar dokumen,
gunakan urutan prioritas berikut.

1. VISION.md
2. BRAND.md
3. DESIGN_DIRECTION.md
4. ANTI_AI_DESIGN.md
5. PRD.md
6. DESIGN.md
7. STACK.md
8. TASKS.md
9. RULES.md

Dokumen dengan prioritas lebih rendah harus menyesuaikan dokumen yang lebih tinggi.

Jangan meminta konfirmasi jika konflik hanya berupa dokumentasi.

Sebaliknya,
perbarui dokumen yang sudah tidak relevan.

Hanya minta konfirmasi jika perubahan akan mengubah fitur utama aplikasi.