
# Plan: Sistem Admin Lengkap + Dinamiskan Seluruh Website

Target deploy: **Cloudflare Pages** (BrowserRouter tetap dipakai, URL bersih, SPA fallback otomatis).

---

## Tahap A — Sistem Admin (login-only + kelola admin)

### A1. Halaman Login jadi login-only
- Hapus mode "Daftar" dari `src/pages/admin/AdminLogin.tsx`. Tombol & state register dihapus, hanya form Masuk yang tersisa.
- Tambah link kecil "Lupa password?" (opsional, pakai `resetPasswordForEmail`).

### A2. Matikan signup publik di backend
- Panggil `configure_auth` dengan `disable_signup: true`, `external_anonymous_users_enabled: false`, `auto_confirm_email: true` (supaya admin baru yang dibuat dari panel langsung bisa login tanpa verifikasi email).

### A3. Menu "Kelola Admin" di panel admin
- Tambah route `/admin/admins` + entry sidebar (`AdminLayout.tsx`).
- Halaman baru `src/pages/admin/AdminManager.tsx`:
  - Tabel: email, tanggal jadi admin, tombol Hapus.
  - Form Tambah Admin: email + password → memanggil Edge Function `create-admin`.
  - Tombol Hapus → Edge Function `delete-admin` (disabled untuk diri sendiri).

### A4. Edge Functions (server-side, pakai Service Role)
- `supabase/functions/create-admin/index.ts`
  - Validasi JWT caller via `getClaims` + cek `has_role(uid, 'admin')`.
  - `admin.createUser({ email, password, email_confirm: true })`.
  - Insert ke `public.user_roles (user_id, role='admin')`.
- `supabase/functions/delete-admin/index.ts`
  - Validasi caller admin + bukan diri sendiri.
  - **Cegah hapus admin terakhir**: hitung COUNT admin → jika ≤1, tolak.
  - `admin.deleteUser(target_id)` → cascade hapus dari `user_roles`.
- `supabase/functions/list-admins/index.ts` — list user dari `auth.admin.listUsers` yang punya role admin (Service Role karena tabel `auth.users` tidak readable dari client).

### A5. Konfigurasi deploy Cloudflare Pages
- Tambah `README` singkat berisi:
  - Build command: `bun run build`
  - Output dir: `dist`
  - Env vars yang perlu di-set di Cloudflare: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
  - Cloudflare Pages SPA fallback otomatis (tidak perlu `_redirects`).

---

## Tahap B — CRUD untuk data jadwal & personalia

Pola sama untuk semua: tabel list + form Tambah/Edit (Dialog) + Hapus (konfirmasi) + realtime subscribe pada halaman publik.

### B1. Jadwal Ibadah Minggu
- `/admin/jadwal/ibadah-minggu`: kelola `ibadah_minggu_meta` (set is_active), nested editor untuk `ibadah_minggu_sesi` dan `ibadah_minggu_pelayan`.

### B2. Kebaktian Rumah Tangga
- `/admin/jadwal/kebaktian-rt`: CRUD `kebaktian_rt`.

### B3. Sekolah Minggu
- `/admin/jadwal/sekolah-minggu`: kelola `sekolah_minggu_meta` + nested `sekolah_minggu_kelas`.

### B4. Sekolah Sidi
- `/admin/jadwal/sekolah-sidi`: kelola `sekolah_sidi_meta` + nested `sekolah_sidi_grup`.

### B5. Pendeta (dengan upload foto)
- `/admin/personalia/pendeta`: CRUD `pendeta`.
- Upload foto ke bucket `pastor-photos` (sudah ada, public). Form ada `<input type="file">`, simpan public URL ke `foto_url`.
- RLS policy `storage.objects` untuk bucket `pastor-photos`: public SELECT (sudah), INSERT/UPDATE/DELETE hanya admin.

### B6. Personalia (BPMJ, BPPJ, SNK Lingkungan)
- `/admin/personalia/bpmj`, `/admin/personalia/bppj`, `/admin/personalia/snk`: CRUD `personalia` filter by `jenis`.

### B7. Refactor halaman publik
- `Jadwals.tsx`, `Personalia.tsx` fetch data dari Supabase + realtime, replace data statis dari `src/data/jadwal.ts` & `personalia.ts`.

---

## Tahap C — Dinamiskan konten statis sisa

### C1. Galeri (Album & Kegiatan dengan upload multi-foto)
- Migrasi: tabel `galeri_album` (judul, tanggal, deskripsi, cover_url) + `galeri_foto` (album_id, url, caption, urutan); tabel `galeri_kegiatan` (judul, tanggal, deskripsi, lokasi) + `galeri_kegiatan_foto`.
- Bucket baru `galeri` (public) untuk foto.
- Admin: `/admin/galeri/album`, `/admin/galeri/kegiatan` — buat album, upload banyak foto, hapus individu.
- Halaman publik `Galeris.tsx` fetch dari DB + lightbox.

### C2. Renungan & Artikel
- Migrasi: tabel `renungan` (slug, judul, penulis, tanggal, ringkasan, body markdown, cover_url, is_published).
- Admin: `/admin/renungan` — CRUD + editor textarea (markdown sederhana) + upload cover.
- Refactor `Renungan.tsx` & `ArticleDetail.tsx` fetch by slug.

### C3. Profil (Sejarah, Visi Misi, Struktur Organisasi)
- Migrasi: tabel `profil_konten` (key: `sejarah` | `visi_misi` | `struktur`, body_markdown, image_url, updated_at).
- Admin: `/admin/profil` — edit tiga bagian dalam satu tab.
- Refactor `Profil.tsx` fetch by key.

### C4. Lirik Lagu
- Migrasi: tabel `lirik_lagu` (judul, nomor, kategori, lirik, sumber).
- Admin: `/admin/galeri/lirik` — CRUD + pencarian.
- Refactor halaman `LirikLagu`.

### C5. Form Kontak → submissions
- Migrasi: tabel `kontak_pesan` (nama, email, telepon, subjek, pesan, is_read, created_at). RLS: insert untuk anon (publik), select/update/delete hanya admin.
- `Kontak.tsx` simpan submission ke DB.
- Admin: `/admin/pesan` — inbox, tandai dibaca, hapus.

---

## Detail Teknis

### Database & Auth
- Semua tabel baru: GRANT lengkap (anon SELECT bila perlu publik, authenticated full untuk admin, service_role ALL), RLS aktif, policy `has_role(auth.uid(), 'admin')` untuk mutate.
- Tambah tabel-tabel baru ke `supabase_realtime` publication agar real-time.
- Trigger `updated_at` untuk semua tabel baru.

### Storage
- Buckets: `pastor-photos` (ada), `galeri` (baru, public), `renungan-covers` (baru, public), `profil-images` (baru, public).
- RLS `storage.objects` per bucket: public SELECT, INSERT/UPDATE/DELETE oleh admin saja.

### Edge Functions (Tahap A)
- 3 functions: `create-admin`, `delete-admin`, `list-admins`.
- Semua validasi JWT + role admin via Service Role client.
- CORS standard.

### Routing
- Tetap `BrowserRouter` (cocok untuk Cloudflare Pages).
- Tambah ~15 route admin baru di `App.tsx`.
- Sidebar `AdminLayout.tsx` digrupkan: Dashboard, Berita (warta, keputusan, kategori), Jadwal, Personalia, Galeri, Renungan, Profil, Pesan, Kelola Admin.

### File yang dibuat/diubah (perkiraan)
- 1 migrasi besar (tabel baru + storage policy + realtime publication).
- 3 edge functions baru.
- ~15 halaman admin baru di `src/pages/admin/`.
- ~6 komponen reusable (form dialog, image uploader, multi-image uploader, markdown textarea).
- Refactor: `AdminLogin.tsx`, `AdminLayout.tsx`, `App.tsx`, semua halaman publik (`Jadwals.tsx`, `Personalia.tsx`, `Galeris.tsx`, `Renungan.tsx`, `ArticleDetail.tsx`, `Profil.tsx`, `Kontak.tsx`).
- `README.md` instruksi deploy Cloudflare Pages.

### Yang TIDAK saya kerjakan
- Tidak setup custom domain (Anda lakukan sendiri di dashboard Cloudflare).
- Tidak migrasi data dummy lama dari `src/data/*.ts` (Anda input ulang via panel admin, atau saya bisa seed contoh bila diminta).

---

## Catatan ukuran pekerjaan
Ini pekerjaan besar (ratusan baris kode, ~30+ file baru/diubah, 1 migrasi besar, 3 edge function). Saya akan kerjakan **berurutan A → B → C** dalam satu sesi build agar konsisten. Jika di tengah jalan ada error build, saya perbaiki sebelum lanjut tahap berikutnya.
