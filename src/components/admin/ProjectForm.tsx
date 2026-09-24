import type { ProyekItem } from "@/data/proyek";

type ProjectFormAction = (formData: FormData) => Promise<void>;

interface ProjectFormProps {
  action: ProjectFormAction;
  project?: ProyekItem;
  error?: string;
}

export default function ProjectForm({ action, project, error }: ProjectFormProps) {
  return (
    <form action={action} className="admin-form">
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

      <div className="admin-form-actions">
        <button type="submit" className="admin-button admin-button-primary">
          {project ? "Simpan Perubahan" : "Tambah Proyek"}
        </button>
      </div>
    </form>
  );
}
