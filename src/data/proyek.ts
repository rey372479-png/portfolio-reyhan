export type KategoriProyek = "Web" | "Mobile" | "Design";

export interface ProyekItem {
  id: string;
  judul: string;
  kategori: KategoriProyek;
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  teknologi: string[];
  tautan?: string;
  labelTautan?: string;
}

export const daftarProyek: ProyekItem[] = [
  {
    id: "1",
    judul: "Manajemen Siswa",
    kategori: "Web",
    deskripsiSingkat:
      "Website untuk mengelola dan menampilkan data siswa secara lebih terstruktur.",
    deskripsiLengkap:
      "Project ini membantu menyusun dan menampilkan data siswa secara terstruktur agar informasi lebih mudah dikelola dan dibaca.",
    teknologi: ["Next.js", "TypeScript", "CSS"],
  },
  {
    id: "2",
    judul: "Manajemen Magang",
    kategori: "Web",
    deskripsiSingkat:
      "Sistem untuk membantu pengelolaan data dan kegiatan siswa selama proses magang.",
    deskripsiLengkap:
      "Project ini dirancang untuk membantu pencatatan data serta kegiatan siswa selama menjalani program magang.",
    teknologi: ["Next.js", "React", "CSS"],
  },
  {
    id: "3",
    judul: "NextJS V2",
    kategori: "Web",
    deskripsiSingkat:
      "Project website menggunakan Next.js sebagai pengembangan dari project sebelumnya.",
    deskripsiLengkap:
      "NextJS V2 adalah pengembangan lanjutan untuk mempraktikkan routing, layout, dan struktur aplikasi Next.js yang lebih rapi.",
    teknologi: ["Next.js", "TypeScript", "App Router"],
  },
  {
    id: "4",
    judul: "My App",
    kategori: "Web",
    deskripsiSingkat:
      "Project aplikasi yang dikerjakan sebagai bagian dari pembelajaran web development.",
    deskripsiLengkap:
      "Aplikasi ini menjadi latihan untuk menerapkan konsep antarmuka dan alur aplikasi web dalam project yang bisa dibuka secara online.",
    teknologi: ["Web Application", "Next.js"],
    tautan:
      "https://myapp-reyhan-purnomo-putra1-c1larj6je-rr-7229.vercel.app/",
    labelTautan: "Open My App",
  },
  {
    id: "5",
    judul: "Mobile UI Design",
    kategori: "Design",
    deskripsiSingkat:
      "Desain interface aplikasi mobile yang dibuat menggunakan Figma.",
    deskripsiLengkap:
      "Project ini berisi rancangan interface mobile dengan fokus pada susunan layar, navigasi, dan pengalaman pengguna.",
    teknologi: ["Figma", "Mobile UI"],
    tautan: "https://swore-raven-74257261.figma.site/#/mobile",
    labelTautan: "View Mobile Design",
  },
  {
    id: "6",
    judul: "Web UI Design",
    kategori: "Design",
    deskripsiSingkat:
      "Desain interface website dengan memperhatikan struktur dan tampilan pengguna.",
    deskripsiLengkap:
      "Project ini mengeksplorasi rancangan interface website yang terstruktur, mudah dipahami, dan nyaman digunakan.",
    teknologi: ["Figma", "Web UI"],
    tautan: "https://swore-raven-74257261.figma.site/#/web",
    labelTautan: "View Web Design",
  },
];
