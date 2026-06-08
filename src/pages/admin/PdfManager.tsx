import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { formatDate, toDrivePreview } from "@/lib/pdf";

type Row = {
  id: string;
  title: string;
  publish_date: string;
  excerpt: string | null;
  pdf_url: string | null;
};

type Props = { table: "warta_jemaat" | "keputusan_majelis"; title: string };

const PdfManager = ({ table, title }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState({ title: "", publish_date: new Date().toISOString().slice(0, 10), excerpt: "", pdf_url: "" });

  const load = async () => {
    const { data, error } = await supabase.from(table).select("*").order("publish_date", { ascending: false });
    if (error) return toast.error(error.message);
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => { load(); }, [table]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", publish_date: new Date().toISOString().slice(0, 10), excerpt: "", pdf_url: "" });
    setOpen(true);
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({ title: r.title, publish_date: r.publish_date, excerpt: r.excerpt ?? "", pdf_url: r.pdf_url ?? "" });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title: form.title, publish_date: form.publish_date, excerpt: form.excerpt || null, pdf_url: form.pdf_url || null };
    const { error } = editing
      ? await supabase.from(table).update(payload).eq("id", editing.id)
      : await supabase.from(table).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Tersimpan");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus item ini?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Dihapus");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">Kelola konten dengan link PDF dari Google Drive.</p>
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
                <Label>Tanggal Terbit</Label>
                <Input type="date" required value={form.publish_date} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} />
              </div>
              <div>
                <Label>Ringkasan (opsional)</Label>
                <Textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div>
                <Label>Link Google Drive PDF</Label>
                <Input
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  value={form.pdf_url}
                  onChange={(e) => setForm({ ...form, pdf_url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Pastikan akses file: "Siapa saja yang memiliki link" → Pelihat.
                </p>
              </div>
              <Button type="submit" className="w-full">{editing ? "Simpan Perubahan" : "Tambah"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {rows.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">Belum ada data.</Card>
        )}
        {rows.map((r) => (
          <Card key={r.id} className="p-4 sm:p-5 flex flex-wrap items-center gap-3 justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{r.title}</p>
              <p className="text-xs text-muted-foreground">{formatDate(r.publish_date)}</p>
              {r.excerpt && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.excerpt}</p>}
            </div>
            <div className="flex gap-2">
              {r.pdf_url && (
                <Button size="sm" variant="outline" asChild>
                  <a href={toDrivePreview(r.pdf_url)} target="_blank" rel="noreferrer"><ExternalLink size={14} /></a>
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Pencil size={14} /></Button>
              <Button size="sm" variant="destructive" onClick={() => remove(r.id)}><Trash2 size={14} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PdfManager;