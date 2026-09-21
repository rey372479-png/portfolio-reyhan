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
- Integrasi Supabase untuk membaca data proyek dari database PostgreSQL.

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
8. Setelah Supabase dikonfigurasi, buka `/test-supabase` untuk memeriksa koneksi cloud.

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

## Modul 3: Supabase

### 1. Siapkan database

Buat project gratis di [Supabase](https://supabase.com), buka SQL Editor, lalu
jalankan seluruh isi file `supabase/schema.sql`. Script ini akan membuat ulang
tabel `proyek`, mengaktifkan RLS, membuat policy baca publik, dan memasukkan
enam project portfolio sekaligus.

Catatan: script memakai `drop table if exists`, jadi data lama di tabel
`proyek` akan dihapus dan diganti dengan enam data portfolio dari project ini.

Kolom tabel `proyek` yang dipakai aplikasi:

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | bigint | Primary key dan identity |
| `judul` | text | Judul proyek |
| `kategori` | text | `Web`, `Mobile`, atau `Design` |
| `deskripsi_singkat` | text | Ringkasan kartu |
| `deskripsi_lengkap` | text | Isi halaman detail |
| `teknologi` | text[] | Daftar teknologi |
| `tautan` | text nullable | Link eksternal opsional |
| `label_tautan` | text nullable | Teks tombol eksternal |

### 2. Konfigurasi lokal

Salin `.env.example` menjadi `.env.local`, lalu isi dari Supabase Project
Settings > API. Gunakan publishable key atau anon key, bukan secret/service-role
key.

```env
NEXT_PUBLIC_SUPABASE_URL=https://project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi_publishable_atau_anon_key
```

Setelah itu jalankan ulang `pnpm dev` dan buka `/test-supabase`. Halaman
`/proyek` dan `/proyek/[id]` akan membaca data dari tabel Supabase. Jika env
belum diisi, aplikasi memakai data lokal sebagai fallback agar website tetap
berjalan. Jika query Supabase gagal saat env sudah diisi, error dicatat di log
server dan data lokal dipakai sebagai pemulihan sementara; gunakan
`/test-supabase` untuk memverifikasi koneksi sebenarnya.

### 3. Konfigurasi Vercel

Di Vercel Project Settings > Environment Variables, tambahkan dua variable yang
sama untuk environment Production, Preview, dan Development. Setelah disimpan,
lakukan Redeploy. Jangan commit `.env.local`; file tersebut sudah dilindungi
oleh `.gitignore`.
