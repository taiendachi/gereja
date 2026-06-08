import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/pdf";

export type Kategori = "anak_lahir" | "menikah" | "dukacita" | "lain_lain";

type Row = {
  id: string;
  kategori: Kategori;
  title: string;
  publish_date: string;
  excerpt: string | null;
  body: string | null;
};

const BeritaManager = ({ kategori, title }: { kategori: Kategori; title: string }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState({ title: "", publish_date: new Date().toISOString().slice(0, 10), excerpt: "", body: "" });

  const load = async () => {
    const { data, error } = await supabase
      .from("berita_items")
      .select("*")
      .eq("kategori", kategori)
      .order("publish_date", { ascending: false });
    if (error) return toast.error(error.message);
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => { load(); }, [kategori]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", publish_date: new Date().toISOString().slice(0, 10), excerpt: "", body: "" });
    setOpen(true);
  };
  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({ title: r.title, publish_date: r.publish_date, excerpt: r.excerpt ?? "", body: r.body ?? "" });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { kategori, title: form.title, publish_date: form.publish_date, excerpt: form.excerpt || null, body: form.body || null };
    const { error } = editing
      ? await supabase.from("berita_items").update(payload).eq("id", editing.id)
      : await supabase.from("berita_items").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Tersimpan");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus item ini?")) return;
    const { error } = await supabase.from("berita_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Dihapus");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">Kelola entri kategori {title}.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus size={16} /> Tambah</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Tambah"} {title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={save} className="space-y-4">
              <div>
                <Label>Judul</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>Tanggal</Label>
                <Input type="date" required value={form.publish_date} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} />
              </div>
              <div>
                <Label>Ringkasan</Label>
                <Textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div>
                <Label>Isi (opsional)</Label>
                <Textarea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">{editing ? "Simpan Perubahan" : "Tambah"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {rows.length === 0 && <Card className="p-8 text-center text-muted-foreground">Belum ada data.</Card>}
        {rows.map((r) => (
          <Card key={r.id} className="p-4 sm:p-5 flex flex-wrap items-start gap-3 justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{r.title}</p>
              <p className="text-xs text-muted-foreground">{formatDate(r.publish_date)}</p>
              {r.excerpt && <p className="text-sm text-muted-foreground mt-1">{r.excerpt}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Pencil size={14} /></Button>
              <Button size="sm" variant="destructive" onClick={() => remove(r.id)}><Trash2 size={14} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BeritaManager;