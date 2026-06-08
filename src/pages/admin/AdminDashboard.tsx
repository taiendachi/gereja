import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Gavel, Newspaper } from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ warta: 0, keputusan: 0, berita: 0 });

  useEffect(() => {
    (async () => {
      const [w, k, b] = await Promise.all([
        supabase.from("warta_jemaat").select("*", { count: "exact", head: true }),
        supabase.from("keputusan_majelis").select("*", { count: "exact", head: true }),
        supabase.from("berita_items").select("*", { count: "exact", head: true }),
      ]);
      setCounts({ warta: w.count ?? 0, keputusan: k.count ?? 0, berita: b.count ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Warta Jemaat", value: counts.warta, icon: FileText },
    { label: "Keputusan Majelis", value: counts.keputusan, icon: Gavel },
    { label: "Berita (semua kategori)", value: counts.berita, icon: Newspaper },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Selamat datang di panel admin BNKP Hilisimaetano.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <c.icon className="text-primary" size={20} />
            </div>
            <p className="text-3xl font-bold">{c.value}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-2">Tips Penggunaan</h2>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Untuk Warta Jemaat & Keputusan Majelis, tempelkan link Google Drive PDF.</li>
          <li>Pastikan file Google Drive disetel "Siapa saja yang memiliki link" → Pelihat.</li>
          <li>Perubahan langsung tampil di website tanpa perlu reload (real-time).</li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;