import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImg from "@/assets/church-hero.jpg";
import pastorImg from "@/assets/pastor.jpg";
import { articles } from "@/data/content";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/pdf";

const schedules = [
  { title: "Ibadah Pagi", time: "Pukul 08.00 WIB", day: "Setiap Minggu", to: "/jadwal/ibadah-minggu" },
  { title: "Ibadah Siang", time: "Pukul 10.00 WIB", day: "Setiap Minggu", to: "/jadwal/ibadah-minggu" },
  { title: "Ibadah Sekolah Minggu", time: "Pukul 08.00 WIB", day: "Setiap Minggu", to: "/jadwal/sekolah-minggu" },
];

type WartaPreview = { id: string; title: string; publish_date: string; excerpt: string | null };
type SesiKhotbah = {
  id: string;
  nama: string;
  waktu: string | null;
  bahasa: string | null;
  pengkhotbah: string | null;
};

const Index = () => {
  const featured = articles[0];
  const [warta, setWarta] = useState<WartaPreview[]>([]);
  const [sesi, setSesi] = useState<SesiKhotbah[]>([]);
  const [tanggalIbadah, setTanggalIbadah] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("warta_jemaat")
        .select("id,title,publish_date,excerpt")
        .order("publish_date", { ascending: false })
        .limit(3);
      setWarta((data ?? []) as WartaPreview[]);
    };
    load();
    const ch = supabase
      .channel("home:warta")
      .on("postgres_changes", { event: "*", schema: "public", table: "warta_jemaat" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  useEffect(() => {
    const loadKhotbah = async () => {
      const { data: meta } = await supabase
        .from("ibadah_minggu_meta")
        .select("id,tanggal")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!meta) { setSesi([]); setTanggalIbadah(""); return; }
      setTanggalIbadah(meta.tanggal ?? "");
      const { data: rows } = await supabase
        .from("ibadah_minggu_sesi")
        .select("id,nama,waktu,bahasa,pengkhotbah")
        .eq("meta_id", meta.id)
        .order("urutan", { ascending: true });
      setSesi((rows ?? []) as SesiKhotbah[]);
    };
    loadKhotbah();
    const ch = supabase
      .channel("home:khotbah")
      .on("postgres_changes", { event: "*", schema: "public", table: "ibadah_minggu_sesi" }, loadKhotbah)
      .on("postgres_changes", { event: "*", schema: "public", table: "ibadah_minggu_meta" }, loadKhotbah)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Gedung Gereja BNKP Hilisimaetano"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative h-full container-prose flex flex-col justify-center text-primary-foreground animate-fade-in">
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 text-primary-foreground/90">
            Selamat Datang
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] mb-5 max-w-3xl">
            BNKP Hilisimaetano
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Resort 11 — Desa Hilisimaetano, Kecamatan Maniamolo
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90">
              <Link to="/jadwal/ibadah-minggu">Lihat Jadwal Ibadah</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/tentang">Tentang Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 sm:py-20">
        <div className="container-prose">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Jadwal Ibadah</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Mari Beribadah Bersama</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {schedules.map((s) => (
              <Link key={s.title} to={s.to} className="group">
                <Card className="p-7 shadow-card hover:-translate-y-1 hover:shadow-lg transition-smooth border-border/60 h-full">
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground mb-4">
                    <Clock size={22} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-smooth">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.day}</p>
                  <p className="text-primary font-semibold inline-flex items-center gap-1">{s.time} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-smooth" /></p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Warta */}
      <section className="py-16 sm:py-20 bg-secondary/40">
        <div className="container-prose">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Warta Jemaat</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Berita Terbaru</h2>
            </div>
            <Link to="/berita/warta-jemaat" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-smooth">
              Baca semua warta <ArrowRight size={16} />
            </Link>
          </div>
          {warta.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground border-border/60">
              Belum ada warta dipublikasikan.
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {warta.map((w) => (
                <Link key={w.id} to="/berita/warta-jemaat">
                  <Card className="p-6 shadow-soft hover:shadow-card transition-smooth border-border/60 h-full">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar size={14} /> {formatDate(w.publish_date)}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{w.title}</h3>
                    {w.excerpt && <p className="text-sm text-muted-foreground line-clamp-3">{w.excerpt}</p>}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Khotbah */}
      <section className="py-16 sm:py-20">
        <div className="container-prose">
          <div className="text-center mb-8">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Khotbah Minggu Ini</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Pengkhotbah Sesuai Jadwal Ibadah</h2>
            {tanggalIbadah && <p className="text-muted-foreground mt-2">{tanggalIbadah}</p>}
          </div>
          {sesi.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground border-border/60">
              Jadwal khotbah belum tersedia.
            </Card>
          ) : (
            <Carousel opts={{ align: "start", loop: sesi.length > 1 }} className="max-w-5xl mx-auto px-4 sm:px-12">
              <CarouselContent>
                {sesi.map((s) => (
                  <CarouselItem key={s.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden border-border/60 shadow-card h-full flex flex-col">
                      <div className="relative aspect-[4/3] bg-secondary">
                        <img src={pastorImg} alt={`Pengkhotbah ${s.nama}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">{s.nama}</p>
                        <h3 className="text-xl font-bold mb-2">{s.pengkhotbah ?? "—"}</h3>
                        <div className="text-sm text-muted-foreground space-y-1 mb-4">
                          {s.waktu && <p className="flex items-center gap-2"><Clock size={14} /> {s.waktu}</p>}
                          {s.bahasa && <p className="flex items-center gap-2"><BookOpen size={14} /> {s.bahasa}</p>}
                        </div>
                        <Button asChild variant="outline" size="sm" className="mt-auto self-start">
                          <Link to="/jadwal/ibadah-minggu">
                            Detail Ibadah <ArrowRight size={14} />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>

      {/* Renungan singkat */}
      <section className="py-16 sm:py-20 bg-secondary/40">
        <div className="container-prose max-w-3xl text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Renungan Singkat</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{featured.title}</h2>
          <p className="text-accent italic mb-6">"{featured.verse}"</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {featured.content[0]} {featured.content[1]} {featured.content[2]}
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/renungan">Baca Selengkapnya</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
