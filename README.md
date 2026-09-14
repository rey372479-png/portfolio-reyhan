# Portfolio M. Reyhan Purnomo Putra

Website profil siswa dan portfolio yang dibuat dengan Next.js App Router,
TypeScript, Tailwind CSS, Bootstrap, dan CSS custom.

## Fitur Project

- Layout responsif mobile-first dengan navbar dan footer global.
- Komponen reusable: `Navbar`, `Footer`, `Badge`, dan `CardProyek`.
- Client Component `CounterApresiasi` dengan `useState` dan `onClick`.
- Data proyek terpisah di `src/data/proyek.ts`.
- Filter kategori berbasis URL pada `/proyek?category=web`.
- Dynamic routing pada `/proyek/[id]` dengan asynchronous `params`.
- Halaman 404 custom untuk route dan ID proyek yang tidak ditemukan.

## Menjalankan Project

Pastikan Node.js 18.18 atau lebih baru sudah terpasang.

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Checklist Pengujian

1. Buka `/proyek`, lalu coba filter `Web`, `Mobile`, dan `Design`.
2. Buka detail proyek, misalnya `/proyek/1`.
3. Buka `/proyek/999` untuk menguji halaman 404 custom.
4. Buka `/halaman-yang-tidak-ada` untuk menguji 404 global.
5. Buka `/tentang`, lalu klik tombol apresiasi beberapa kali.
6. Uji navbar dan seluruh halaman pada Chrome DevTools dengan lebar 375px.
7. Jalankan `pnpm build` untuk memastikan TypeScript dan produksi berhasil.

## Struktur Penting

```text
src/
	app/
		proyek/[id]/page.tsx  # Dynamic route proyek
		Footer.tsx            # Footer global
		Navbar.tsx            # Navbar client untuk menu mobile
		not-found.tsx         # Halaman 404 custom
	components/
		Badge.tsx
		CardProyek.tsx
		CounterApresiasi.tsx
	data/
		proyek.ts
```

## Deploy

Repository GitHub:
`https://github.com/rey372479-png/portfolio-reyhan`

Project ini dapat diimpor ke Vercel menggunakan repository GitHub tersebut.
Setiap push ke branch `main` akan memicu deployment otomatis jika repository
sudah terhubung di dashboard Vercel.
