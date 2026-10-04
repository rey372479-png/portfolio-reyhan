# M. Reyhan Purnomo Putra — Portfolio

Website profil siswa dan portfolio berisi enam project, dibuat sebagai project
pembelajaran dan dikembangkan dengan Next.js App Router. Data project dapat
dibaca dari Supabase atau menggunakan data lokal sebagai fallback.

**Production:** <https://portfolio-reyhan-omega.vercel.app>

## Technology Stack

- Next.js 16.3.4 (App Router)
- TypeScript
- Bootstrap
- Custom CSS (`src/app/globals.css`)
- Supabase Authentication dan PostgreSQL melalui Supabase
- GitHub untuk version control dan Vercel untuk deployment
- Package manager: pnpm

## Completed Modules

### Module 1 — Portfolio Foundation

- Fondasi portfolio dengan Next.js dan App Router.
- Halaman utama: Home, About, Skills, Projects, Contact, dan halaman detail project.
- Layout responsif untuk berbagai ukuran layar.
- Repository GitHub terhubung ke deployment Vercel.

### Module 2 — Components, Styling, and Routing

- Komponen reusable seperti `Navbar`, `Footer`, `Badge`, dan `CardProyek`.
- Styling responsif dengan Bootstrap dan custom CSS.
- Interaksi client dengan React `useState`, termasuk counter apresiasi dan kontrol foto.
- Dynamic route detail project di `/proyek/[id]`.
- `notFound()` dan custom 404 untuk project atau route yang tidak ditemukan.
- Data portfolio dan navigasi/filter project.

### Module 3 — Supabase and PostgreSQL

- Integrasi Supabase sebagai layanan database PostgreSQL.
- Tabel `proyek` untuk menyimpan enam project portfolio.
- Pengambilan data project publik dari Supabase dengan fallback ke data lokal.
- Konfigurasi lokal melalui environment variables di `.env.local`.

### Module 4 — Authentication and Project CRUD

- Supabase Authentication melalui `/admin/login`.
- Middleware melindungi route admin; dashboard project berada di `/admin/proyek`.
- Admin dapat membuat, memperbarui, dan menghapus project.
- Mutasi memakai Server Actions dan `revalidatePath()` untuk memperbarui halaman terkait.
- Row Level Security (RLS) mengatur pembacaan publik dan mutasi oleh user terautentikasi.
- Logout melalui Supabase Authentication.

### Module 5 — SEO and Performance

- Metadata statis di root layout dan metadata project dinamis melalui `generateMetadata()`.
- Open Graph image otomatis melalui `src/app/opengraph-image.tsx`.
- `/robots.txt` mengizinkan halaman publik dan mengecualikan `/admin/`.
- `/sitemap.xml` dibuat dinamis dan mencakup halaman detail project.
- Foto profil memakai `next/image` dengan alt deskriptif; foto dekoratif menggunakan alt kosong.
- Audit Lighthouse/PageSpeed production dilakukan setelah optimasi; hasil AFTER tercatat di bawah.

## Production SEO and Performance Verification — AFTER

| Device | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 98 | 100 | 100 | 100 |
| Mobile | 87 | 100 | 100 | 100 |

- `/robots.txt` verified in production; `/admin/` is disallowed.
- `/sitemap.xml` verified in production and contains 11 URLs, including all six project detail pages.
- Open Graph image verified in production at `/opengraph-image`.

## SEO Checklist

- [x] Title and description configured.
- [x] Dynamic project metadata configured.
- [x] Open Graph image configured.
- [x] `/robots.txt` available and excludes `/admin/`.
- [x] `/sitemap.xml` available and includes all 6 project detail pages.
- [x] Images use `next/image`.
- [x] Images have descriptive alt attributes; decorative images use empty alt text.
- [x] Production Lighthouse/PageSpeed AFTER audit completed.

Historical Lighthouse BEFORE scores were not preserved in the current project documentation, so no BEFORE score is fabricated.

## Local Setup

### Prerequisites

- Node.js 20.9.0 or newer (required by Next.js 16.3.4).
- pnpm.
- A Supabase project for cloud database and authentication features.

### Run locally

```bash
git clone https://github.com/rey372479-png/portfolio-reyhan.git
cd portfolio-reyhan
pnpm install
```

Copy `.env.example` to `.env.local` and set the Supabase values from the
project's **Settings > API**. Do not put real keys in this README or commit
`.env.local`.

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-publishable-or-anon-key>
```

Start the development server with the repository's pnpm script:

```bash
pnpm dev
```

Open <http://localhost:3000> in a browser. Without Supabase configuration,
project pages use the local data fallback; database-backed authentication and
CRUD require valid environment values and the configured Supabase project.

## Database Setup

The active Supabase table is `public.proyek`. The audit verified that the
application code and the Supabase project configured in `.env.local` use this
legacy schema:

| Column | Type | Purpose |
| --- | --- | --- |
| `id` | bigint (`int8`) | Identity primary key |
| `created_at` | timestamptz | Row creation timestamp |
| `judul` | text | Project title |
| `kategori` | text | Project category |
| `deskripsi_singkat` | text | Short project description |
| `deskripsi_lengkap` | text | Full project description |
| `teknologi` | text[] | Technologies used |
| `tautan` | text, nullable | Optional project link |
| `label_tautan` | text, nullable | Optional project link label |

The table currently contains six project rows: Manajemen Siswa, Manajemen
Magang, NextJS V2, My App, Mobile UI Design, and Web UI Design. Queries using
these legacy columns succeed; queries for the newer `deskripsi` and `link`
columns are rejected.

The checked-in `supabase/schema.sql` and application data layer use this same
legacy schema and are aligned with the schema verified by the audit. The SQL
file begins with `DROP TABLE ... CASCADE`; review it carefully before running
it against a database with existing data.

For Vercel, configure the same two environment variable names for the required
deployment environments in Project Settings > Environment Variables. Never
commit `.env.local` or a Supabase secret/service-role key.

## Project Structure

```text
src/
	app/
		admin/                 # Login and protected project CRUD
		proyek/                # Project list and dynamic detail route
		opengraph-image.tsx    # Generated Open Graph image
		robots.ts              # robots.txt metadata route
		sitemap.ts             # Dynamic sitemap route
		layout.tsx             # Root layout and site metadata
		page.tsx               # Home page
		globals.css            # Global custom styles
	components/              # Shared UI components
	data/proyek.ts           # Six local fallback projects
	lib/                     # Supabase clients, data access, and actions
supabase/schema.sql        # PostgreSQL table, RLS, and seed data
```

## Repository and Educational Use

- GitHub: <https://github.com/rey372479-png/portfolio-reyhan>
- Production deployment: <https://portfolio-reyhan-omega.vercel.app>
- This is an educational portfolio project. No separate license is declared in this README.
