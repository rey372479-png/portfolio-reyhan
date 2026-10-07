import type { ProyekItem } from "@/data/proyek";
import ProjectImage from "@/components/ProjectImage";

type ProjectFormAction = (formData: FormData) => Promise<void>;

interface ProjectFormProps {
  action: ProjectFormAction;
  project?: ProyekItem;
  error?: string;
}

export default function ProjectForm({ action, project, error }: ProjectFormProps) {
  return (
    <form action={action} className="admin-form" encType="multipart/form-data">
      {error ? <p className="admin-error">{error}</p> : null}
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="admin-form-grid">
        <label>
          Judul Proyek
          <input name="judul" defaultValue={project?.judul} required />
        </label>
        <label>
          Kategori
          <select name="kategori" defaultValue={project?.kategori ?? "Web"}>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="Design">Design</option>
          </select>
        </label>
      </div>

      <label>
        Deskripsi Singkat
        <textarea
          name="deskripsi_singkat"
          defaultValue={project?.deskripsiSingkat}
          rows={3}
          required
        />
      </label>

      <label>
        Deskripsi Lengkap
        <textarea
          name="deskripsi_lengkap"
          defaultValue={project?.deskripsiLengkap}
          rows={5}
          required
        />
      </label>

      <div className="admin-form-grid">
        <label>
          Teknologi (pisahkan dengan koma)
          <input name="teknologi" defaultValue={project?.teknologi.join(", ")} />
        </label>
        <label>
          Link Proyek
          <input name="tautan" type="url" defaultValue={project?.tautan} />
        </label>
      </div>

      <label>
        Label Link
        <input name="label_tautan" defaultValue={project?.labelTautan} />
      </label>

      <label>
        Gambar Proyek (JPEG, PNG, WebP, atau AVIF; maksimal 4 MB)
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
      </label>

      {project?.imageUrl ? (
        <div className="admin-project-image">
          <span>Gambar saat ini</span>
          <ProjectImage
            src={project.imageUrl}
            alt={`Gambar proyek ${project.judul}`}
            className="admin-project-image-preview"
          />
          <label className="admin-remove-image">
            <input type="checkbox" name="remove_image" />
            Hapus gambar saat ini
          </label>
          <p className="admin-muted">
            Pilih gambar baru untuk mengganti gambar saat ini. Jika tidak, gambar tetap dipakai.
          </p>
        </div>
      ) : (
        <p className="admin-muted">
          Jika tidak memilih gambar, kartu proyek akan menampilkan ilustrasi pengganti.
        </p>
      )}

      <div className="admin-form-actions">
        <button type="submit" className="admin-button admin-button-primary">
          {project ? "Simpan Perubahan" : "Tambah Proyek"}
        </button>
      </div>
    </form>
  );
}
