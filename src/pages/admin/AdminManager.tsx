import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type AdminRow = { id: string; email: string | null; created_at: string };

const AdminManager = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("list-admins");
    setLoading(false);
    if (error) return toast.error(error.message);
    setAdmins(data?.admins ?? []);
  };

  useEffect(() => { load(); }, []);

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("create-admin", {
      body: { email, password },
    });
    setBusy(false);
    if (error || data?.error) return toast.error(data?.error ?? error?.message);
    toast.success("Admin baru dibuat");
    setEmail(""); setPassword(""); setOpen(false);
    load();
  };

  const deleteAdmin = async (id: string) => {
    const { data, error } = await supabase.functions.invoke("delete-admin", {
      body: { user_id: id },
    });
    if (error || data?.error) return toast.error(data?.error ?? error?.message);
    toast.success("Admin dihapus");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <ShieldCheck size={22} /> Kelola Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Tambah atau hapus akun admin. Admin terakhir tidak bisa dihapus.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} /> Tambah Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Admin Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={createAdmin} className="space-y-4">
              <div>
                <Label htmlFor="new-email">Email</Label>
                <Input id="new-email" type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="new-pass">Password (min 8 karakter)</Label>
                <Input id="new-pass" type="password" required minLength={8}
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={busy}>
                  {busy ? "Memproses..." : "Buat Admin"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">Memuat...</TableCell></TableRow>
            ) : admins.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">Belum ada admin.</TableCell></TableRow>
            ) : admins.map((a) => {
              const isSelf = a.id === user?.id;
              return (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">
                    {a.email ?? "(tanpa email)"} {isSelf && <span className="text-xs text-muted-foreground">(Anda)</span>}
                  </TableCell>
                  <TableCell>{new Date(a.created_at).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={isSelf}
                          className="text-destructive hover:text-destructive">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus admin?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Akun <strong>{a.email}</strong> akan dihapus permanen.
                            Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteAdmin(a.id)}>
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminManager;