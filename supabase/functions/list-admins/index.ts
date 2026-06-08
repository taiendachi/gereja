import { admin, corsHeaders, json, requireAdmin } from "../_shared/admin-auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    await requireAdmin(req);
    const { data: roles, error: rolesErr } = await admin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin");
    if (rolesErr) return json({ error: rolesErr.message }, 500);

    const result: Array<{ id: string; email: string | null; created_at: string }> = [];
    for (const r of roles ?? []) {
      const { data: u } = await admin.auth.admin.getUserById(r.user_id);
      result.push({
        id: r.user_id,
        email: u.user?.email ?? null,
        created_at: r.created_at,
      });
    }
    return json({ admins: result });
  } catch (e) {
    if (e instanceof Response) return e;
    return json({ error: String(e) }, 500);
  }
});