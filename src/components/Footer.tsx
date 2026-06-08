import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/bnkp-logo.png";

const Footer = () => (
  <footer className="bg-secondary/60 border-t border-border mt-16">
    <div className="container-prose py-12 grid gap-10 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <img src={logo} alt="Logo BNKP" className="h-12 w-12 object-contain" width={48} height={48} loading="lazy" />
          <div>
            <p className="font-display font-bold text-primary">BNKP HILISIMAETANO</p>
            <p className="text-xs text-muted-foreground">Resort 11 — Maniamolo</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground italic">
          "Berakar, Bertumbuh, dan Berbuah di dalam Kristus"
        </p>
      </div>

      <div>
        <h3 className="font-display font-semibold text-foreground mb-4">Kontak & Lokasi</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2"><MapPin size={16} className="text-primary mt-0.5 shrink-0" /> Desa Hilisimaetano, Kec. Maniamolo</li>
          <li className="flex gap-2"><Phone size={16} className="text-primary mt-0.5 shrink-0" /> +62 811-2233-4455</li>
          <li className="flex gap-2"><Mail size={16} className="text-primary mt-0.5 shrink-0" /> kontak@bnkphilisimaetano.org</li>
        </ul>
      </div>

      <div>
        <h3 className="font-display font-semibold text-foreground mb-4">Tautan Cepat</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="text-muted-foreground hover:text-primary transition-smooth">Beranda</Link></li>
          <li><Link to="/renungan" className="text-muted-foreground hover:text-primary transition-smooth">Renungan & Artikel</Link></li>
          <li><Link to="/jadwal/ibadah-minggu" className="text-muted-foreground hover:text-primary transition-smooth">Jadwal Ibadah</Link></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="container-prose py-5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© 2026 BNKP Hilisimaetano. Seluruh hak cipta dilindungi.</span>
        <Link to="/admin/login" className="hover:text-primary transition-smooth">Admin</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
