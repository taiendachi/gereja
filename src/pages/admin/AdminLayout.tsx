import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, Gavel, Baby, Heart, Cross, FileQuestion, LayoutDashboard, ShieldCheck } from "lucide-react";
import logo from "@/assets/bnkp-logo.png";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/warta", icon: FileText, label: "Warta Jemaat" },
  { to: "/admin/keputusan", icon: Gavel, label: "Keputusan Majelis" },
  { to: "/admin/anak-lahir", icon: Baby, label: "Anak Lahir" },
  { to: "/admin/menikah", icon: Heart, label: "Menikah" },
  { to: "/admin/dukacita", icon: Cross, label: "Dukacita" },
  { to: "/admin/lain-lain", icon: FileQuestion, label: "Lain-Lain" },
  { to: "/admin/admins", icon: ShieldCheck, label: "Kelola Admin" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();

  if (loading)
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Memuat...</div>;

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-lg">Akun Anda belum memiliki akses admin.</p>
        <Button onClick={async () => { await signOut(); nav("/admin/login"); }}>Keluar</Button>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <img src={logo} alt="" className="h-9 w-9" />
          <div>
            <p className="font-display font-bold text-sm">Admin BNKP</p>
            <p className="text-xs text-muted-foreground">Hilisimaetano</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`
              }
            >
              <item.icon size={16} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="outline" className="w-full" onClick={async () => { await signOut(); nav("/admin/login"); }}>
            <LogOut size={16} /> Keluar
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-background border-b border-border flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8" />
          <p className="font-display font-bold text-sm">Admin BNKP</p>
        </div>
        <Button size="sm" variant="outline" onClick={async () => { await signOut(); nav("/admin/login"); }}>
          <LogOut size={14} />
        </Button>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="md:hidden h-14" />
        <div className="md:hidden overflow-x-auto border-b border-border bg-background">
          <div className="flex gap-1 p-2 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs whitespace-nowrap ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;