begin;

alter table public.proyek
  add column if not exists image_path text;

drop policy if exists "Authenticated users can insert projects" on public.proyek;
drop policy if exists "Authenticated users can update projects" on public.proyek;
drop policy if exists "Authenticated users can delete projects" on public.proyek;
drop policy if exists "Portfolio admin can insert projects" on public.proyek;
drop policy if exists "Portfolio admin can update projects" on public.proyek;
drop policy if exists "Portfolio admin can delete projects" on public.proyek;

create policy "Portfolio admin can insert projects"
on public.proyek
for insert
to authenticated
with check (auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid);

create policy "Portfolio admin can update projects"
on public.proyek
for update
to authenticated
using (auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid)
with check (auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid);

create policy "Portfolio admin can delete projects"
on public.proyek
for delete
to authenticated
using (auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'project-images',
  'project-images',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read project images" on storage.objects;
drop policy if exists "Portfolio admin can upload project images" on storage.objects;
drop policy if exists "Portfolio admin can update project images" on storage.objects;
drop policy if exists "Portfolio admin can delete project images" on storage.objects;

create policy "Public can read project images"
on storage.objects
for select
to public
using (bucket_id = 'project-images');

create policy "Portfolio admin can upload project images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'project-images'
  and auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid
  and name ~ '^[0-9]+/[0-9a-f-]+[.](jpg|png|jpeg|webp|avif)$'
);

create policy "Portfolio admin can update project images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'project-images'
  and auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid
)
with check (
  bucket_id = 'project-images'
  and auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid
  and name ~ '^[0-9]+/[0-9a-f-]+[.](jpg|png|jpeg|webp|avif)$'
);

create policy "Portfolio admin can delete project images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'project-images'
  and auth.uid() = '7c803c6b-056f-41e8-9681-a51f393f21a4'::uuid
);

commit;
