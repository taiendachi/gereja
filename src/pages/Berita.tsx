import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Calendar, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, toDrivePreview } from "@/lib/pdf";

type PdfRow = { id: string; title: string; publish_date: string; excerpt: string | null; pdf_url: string | null };
type BeritaRow = { id: string; title: string; publish_date: string; excerpt: string | null; body: string | null };

const PdfList = ({ table }: { table: "warta_jemaat" | "keputusan_majelis" }) => {
  const [rows, setRows] = useState<PdfRow[]>([]);
  const [active, setActive] = useState<PdfRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data } = await supabase.from(table).select("*").order("publish_date", { ascending: false });
      if (!mounted) return;
      const list = (data ?? []) as PdfRow[];
      setRows(list);
      setActive(list[0] ?? null);
      setLoading(false);
    };
    load();
    const ch = supabase
      .channel(`public:${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, load)
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, [table]);

  if (loading) return <p className="text-center text-muted-foreground">Memuat...</p>;
  if (rows.length === 0) return <Card className="p-10 text-center text-muted-foreground max-w-3xl mx-auto">Belum ada konten dipublikasikan.</Card>;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6 max-w-6xl mx-auto">
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {rows.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r)}
            className={`w-full text-left p-4 rounded-lg border transition-smooth ${
              active?.id === r.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-secondary border-border"
            }`}
          >
            <div className={`flex items-center gap-2 text-xs mb-1 ${active?.id === r.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              <Calendar size={12} /> {formatDate(r.publish_date)}
            </div>
            <p className="font-semibold text-sm line-clamp-2">{r.title}</p>
          </button>
        ))}
      </div>
      {active && (
        <Card className="p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold mb-1">{active.title}</h2>
              <p className="text-xs text-muted-foreground">{formatDate(active.publish_date)}</p>
            </div>
            {active.pdf_url && (
              <a href={active.pdf_url} target="_blank" rel="noreferrer" className="text-primary text-sm inline-flex items-center gap-1 hover:underline">
                Buka di tab baru <ExternalLink size={14} />
              </a>
            )}
          </div>
          {active.excerpt && <p className="text-muted-foreground text-sm mb-4">{active.excerpt}</p>}
          {active.pdf_url ? (
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden border border-border bg-secondary">
              <iframe src={toDrivePreview(active.pdf_url)} className="w-full h-full" title={active.title} allow="autoplay" />
            </div>
          ) : (
            <div className="p-10 text-center text-muted-foreground border border-dashed rounded-lg">
              <FileText className="mx-auto mb-2" /> PDF belum tersedia.
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

const BeritaList = ({ kategori }: { kategori: "anak_lahir" | "menikah" | "dukacita" | "lain_lain" }) => {
  const [rows, setRows] = useState<BeritaRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data } = await supabase
        .from("berita_items")
        .select("*")
        .eq("kategori", kategori)
        .order("publish_date", { ascending: false });
      if (!mounted) return;
      setRows((data ?? []) as BeritaRow[]);
      setLoading(false);
    };
    load();
    const ch = supabase
      .channel(`public:berita_items:${kategori}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "berita_items", filter: `kategori=eq.${kategori}` }, load)
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, [kategori]);

  if (loading) return <p className="text-center text-muted-foreground">Memuat...</p>;
  if (rows.length === 0) return <Card className="p-10 text-center text-muted-foreground max-w-3xl mx-auto">Belum ada data.</Card>;

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
      {rows.map((w) => (
        <Card key={w.id} className="p-6 shadow-soft hover:shadow-card transition-smooth">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Calendar size={14} /> {formatDate(w.publish_date)}
          </div>
          <h3 className="text-lg font-semibold mb-2">{w.title}</h3>
          {w.excerpt && <p className="text-muted-foreground text-sm">{w.excerpt}</p>}
          {w.body && <p className="text-muted-foreground text-sm mt-2 whitespace-pre-line">{w.body}</p>}
        </Card>
      ))}
    </div>
  );
};

export const WartaJemaat = () => (
  <PageShell eyebrow="Berita" title="Warta Jemaat" description="Pengumuman dan agenda mingguan jemaat. Klik salah satu warta untuk membaca PDF.">
    <PdfList table="warta_jemaat" />
  </PageShell>
);

export const KeputusanMajelis = () => (
  <PageShell eyebrow="Berita" title="Keputusan Majelis Jemaat" description="Hasil rapat dan keputusan resmi BPMJ.">
    <PdfList table="keputusan_majelis" />
  </PageShell>
);

export const SyaratNikah = () => (
  <PageShell eyebrow="Berita" title="Syarat Pemberkatan Nikah" description="Persyaratan administrasi pemberkatan nikah di BNKP Hilisimaetano.">
    <Card className="p-8 shadow-soft max-w-3xl mx-auto">
      <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
        <li>Mengisi formulir permohonan pemberkatan nikah di kantor jemaat.</li>
        <li>Fotokopi KTP & KK kedua mempelai.</li>
        <li>Surat keterangan belum menikah dari kelurahan/desa.</li>
        <li>Surat baptis dan sidi kedua mempelai.</li>
        <li>Surat pengantar dari lingkungan masing-masing.</li>
        <li>Mengikuti bimbingan pra-nikah dari Pendeta Jemaat.</li>
        <li>Pas foto berwarna ukuran 4x6 (4 lembar) dan 2x3 (4 lembar).</li>
        <li>Pendaftaran paling lambat 1 bulan sebelum tanggal pemberkatan.</li>
      </ol>
    </Card>
  </PageShell>
);

export const AnakLahir = () => (
  <PageShell eyebrow="Berita" title="Anak Lahir" description="Sukacita kelahiran anak warga jemaat.">
    <BeritaList kategori="anak_lahir" />
  </PageShell>
);
export const Menikah = () => (
  <PageShell eyebrow="Berita" title="Menikah" description="Pemberkatan nikah warga jemaat.">
    <BeritaList kategori="menikah" />
  </PageShell>
);
export const Dukacita = () => (
  <PageShell eyebrow="Berita" title="Dukacita" description="Berita dukacita warga jemaat.">
    <BeritaList kategori="dukacita" />
  </PageShell>
);
export const LainLain = () => (
  <PageShell eyebrow="Berita" title="Lain-Lain" description="Informasi tambahan jemaat.">
    <BeritaList kategori="lain_lain" />
  </PageShell>
);
