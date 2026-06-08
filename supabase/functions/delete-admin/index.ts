import { admin, corsHeaders, json, requireAdmin } from "../_shared/admin-auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { userId: callerId } = await requireAdmin(req);
    const body = await req.json().catch(() => ({}));
    const targetId = String(body.user_id ?? "");
    if (!targetId) return json({ error: "user_id wajib" }, 400);
    if (targetId === callerId) return json({ error: "Tidak bisa menghapus diri sendiri" }, 400);

    const { count } = await admin
      .from("user_roles")
      .select("user_id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) <= 1) {
      return json({ error: "Tidak boleh menghapus admin terakhir" }, 400);
    }

    const { error: delErr } = await admin.auth.admin.deleteUser(targetId);
    if (delErr) return json({ error: delErr.message }, 500);
    return json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return json({ error: String(e) }, 500);
  }
});