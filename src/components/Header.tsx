import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/bnkp-logo.png";
import { cn } from "@/lib/utils";

type SubItem = { to: string; label: string };
type NavItem = { label: string; to?: string; children?: SubItem[] };

export const navItems: NavItem[] = [
  { label: "Beranda", to: "/" },
  {
    label: "Profil",
    children: [
      { to: "/profil/sejarah", label: "Sejarah" },
      { to: "/profil/visi-misi", label: "Visi Misi" },
      { to: "/profil/struktur-organisasi", label: "Struktur Organisasi" },
      { to: "/tentang", label: "Tentang" },
    ],
  },
  {
    label: "Personalia",
    children: [
      { to: "/personalia/pendeta", label: "Pendeta" },
      { to: "/personalia/bpmj", label: "BPMJ" },
      { to: "/personalia/bppj", label: "BPPJ" },
      { to: "/personalia/snk-lingkungan", label: "SNK Lingkungan" },
    ],
  },
  {
    label: "Jadwal",
    children: [
      { to: "/jadwal/ibadah-minggu", label: "Ibadah Minggu" },
      { to: "/jadwal/kebaktian-rumah-tangga", label: "Kebaktian Rumah Tangga" },
      { to: "/jadwal/sekolah-minggu", label: "Sekolah Minggu" },
      { to: "/jadwal/sekolah-sidi", label: "Sekolah Sidi" },
    ],
  },
  {
    label: "Berita",
    children: [
      { to: "/berita/warta-jemaat", label: "Warta Jemaat" },
      { to: "/berita/keputusan-majelis", label: "Keputusan Majelis Jemaat" },
      { to: "/berita/syarat-pemberkatan-nikah", label: "Syarat Pemberkatan Nikah" },
      { to: "/berita/anak-lahir", label: "Anak Lahir" },
      { to: "/berita/menikah", label: "Menikah" },
      { to: "/berita/dukacita", label: "Dukacita" },
      { to: "/berita/lain-lain", label: "Lain-Lain" },
    ],
  },
  {
    label: "Galeri",
    children: [
      { to: "/galeri/album", label: "Album" },
      { to: "/galeri/kegiatan", label: "Kegiatan" },
      { to: "/galeri/lirik-lagu", label: "Lirik Lagu" },
    ],
  },
  { label: "Hubungi Kami", to: "/kontak" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();

  const isChildActive = (children?: SubItem[]) =>
    children?.some((c) => location.pathname.startsWith(c.to));

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-prose flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Logo BNKP Hilisimaetano" className="h-12 w-12 object-contain" width={48} height={48} />
          <div className="leading-tight">
            <p className="font-display font-bold text-primary text-base sm:text-lg">BNKP Hilisimaetano</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">Resort 11 — Maniamolo</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium inline-flex items-center gap-1 transition-smooth",
                    isChildActive(item.children)
                      ? "text-primary bg-secondary"
                      : "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-smooth min-w-[240px]">
                  <div className="bg-popover border border-border rounded-lg shadow-card overflow-hidden py-2">
                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2 text-sm transition-smooth",
                            isActive
                              ? "text-primary bg-secondary"
                              : "text-foreground/80 hover:text-primary hover:bg-secondary/60"
                          )
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to!}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <button
          aria-label="Buka menu"
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container-prose py-3 flex flex-col">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border/60 last:border-0">
                  <button
                    onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground/85"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", openSection === item.label && "rotate-180")}
                    />
                  </button>
                  {openSection === item.label && (
                    <div className="pl-4 pb-2 flex flex-col">
                      {item.children.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "px-3 py-2 rounded-md text-sm",
                              isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-primary"
                            )
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to!}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-md text-sm font-medium border-b border-border/60 last:border-0",
                      isActive ? "text-primary bg-secondary" : "text-foreground/80 hover:bg-secondary"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
