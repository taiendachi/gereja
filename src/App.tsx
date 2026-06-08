import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index.tsx";
import Tentang from "./pages/Tentang";
import Renungan from "./pages/Renungan";
import ArticleDetail from "./pages/ArticleDetail";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound.tsx";
import { Sejarah, VisiMisi, Struktur } from "./pages/Profil";
import { Pendeta, BPMJ, BPPJ, SNKLingkungan } from "./pages/Personalia";
import { IbadahMinggu, KebaktianRT, SekolahMinggu, SekolahSidi } from "./pages/Jadwals";
import {
  WartaJemaat, KeputusanMajelis, SyaratNikah, AnakLahir, Menikah, Dukacita, LainLain,
} from "./pages/Berita";
import { Album, Kegiatan, LirikLagu } from "./pages/Galeris";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PdfManager from "./pages/admin/PdfManager";
import BeritaManager from "./pages/admin/BeritaManager";
import AdminManager from "./pages/admin/AdminManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />

            {/* Profil */}
            <Route path="/profil/sejarah" element={<Sejarah />} />
            <Route path="/profil/visi-misi" element={<VisiMisi />} />
            <Route path="/profil/struktur-organisasi" element={<Struktur />} />
            <Route path="/tentang" element={<Tentang />} />

            {/* Personalia */}
            <Route path="/personalia/pendeta" element={<Pendeta />} />
            <Route path="/personalia/bpmj" element={<BPMJ />} />
            <Route path="/personalia/bppj" element={<BPPJ />} />
            <Route path="/personalia/snk-lingkungan" element={<SNKLingkungan />} />

            {/* Jadwal */}
            <Route path="/jadwal/ibadah-minggu" element={<IbadahMinggu />} />
            <Route path="/jadwal/kebaktian-rumah-tangga" element={<KebaktianRT />} />
            <Route path="/jadwal/sekolah-minggu" element={<SekolahMinggu />} />
            <Route path="/jadwal/sekolah-sidi" element={<SekolahSidi />} />

            {/* Berita */}
            <Route path="/berita/warta-jemaat" element={<WartaJemaat />} />
            <Route path="/berita/keputusan-majelis" element={<KeputusanMajelis />} />
            <Route path="/berita/syarat-pemberkatan-nikah" element={<SyaratNikah />} />
            <Route path="/berita/anak-lahir" element={<AnakLahir />} />
            <Route path="/berita/menikah" element={<Menikah />} />
            <Route path="/berita/dukacita" element={<Dukacita />} />
            <Route path="/berita/lain-lain" element={<LainLain />} />

            {/* Galeri */}
            <Route path="/galeri/album" element={<Album />} />
            <Route path="/galeri/kegiatan" element={<Kegiatan />} />
            <Route path="/galeri/lirik-lagu" element={<LirikLagu />} />

            {/* Lainnya */}
            <Route path="/renungan" element={<Renungan />} />
            <Route path="/renungan/:slug" element={<ArticleDetail />} />
            <Route path="/kontak" element={<Kontak />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="warta" element={<PdfManager table="warta_jemaat" title="Warta Jemaat" />} />
            <Route path="keputusan" element={<PdfManager table="keputusan_majelis" title="Keputusan Majelis" />} />
            <Route path="anak-lahir" element={<BeritaManager kategori="anak_lahir" title="Anak Lahir" />} />
            <Route path="menikah" element={<BeritaManager kategori="menikah" title="Menikah" />} />
            <Route path="dukacita" element={<BeritaManager kategori="dukacita" title="Dukacita" />} />
            <Route path="lain-lain" element={<BeritaManager kategori="lain_lain" title="Lain-Lain" />} />
            <Route path="admins" element={<AdminManager />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
