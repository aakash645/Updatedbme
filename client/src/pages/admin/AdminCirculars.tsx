import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Circular } from "@shared/schema";

function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "", ...(options.headers || {}) },
  });
}

const TAGS = ["General", "Urgent", "Trade", "Compliance", "GST", "Import/Export"];
const TAG_COLORS: Record<string, string> = {
  General: "bg-blue-50 text-blue-700", Urgent: "bg-red-50 text-red-700",
  Trade: "bg-amber-50 text-amber-700", Compliance: "bg-green-50 text-green-700",
  GST: "bg-primary/10 text-primary", "Import/Export": "bg-purple-50 text-purple-700",
};
const empty = { title: "", description: "", fileUrl: "", tag: "General" };

export default function AdminCirculars() {
  const [items, setItems] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Circular | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/circulars").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (c: Circular) => {
    setEditing(c);
    setForm({ title: c.title, description: c.description || "", fileUrl: c.fileUrl || "", tag: c.tag || "General" });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) return toast({ title: "Title is required", variant: "destructive" });
    setSaving(true);
    try {
      const url = editing ? `/api/admin/circulars/${editing.id}` : "/api/admin/circulars";
      await adminFetch(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(form) });
      toast({ title: editing ? "Updated!" : "Circular issued!" });
      setOpen(false); load();
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    await adminFetch(`/api/admin/circulars/${id}`, { method: "DELETE" });
    toast({ title: "Deleted" }); load();
  };

  return (
    <AdminLayout title="Circulars & Notices">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{items.length} circular{items.length !== 1 ? "s" : ""}</p>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Issue Circular
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}</div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">
          <p className="mb-4">No circulars yet.</p><Button onClick={openAdd}>Issue First Circular</Button>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map(c => (
            <Card key={c.id} className="border-l-4 border-l-primary hover:shadow-sm transition-all">
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TAG_COLORS[c.tag || "General"] || TAG_COLORS.General}`}>{c.tag || "General"}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(c.date!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm font-serif truncate">{c.title}</h3>
                  {c.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{c.description}</p>}
                  {c.fileUrl && (
                    <a href={c.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline">
                      <ExternalLink className="h-3 w-3" /> View attachment
                    </a>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => del(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-serif">{editing ? "Edit Circular" : "Issue New Circular"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>Title *</Label><Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Circular heading" /></div>
            <div><Label>Category</Label>
              <select className="w-full mt-1 h-10 px-3 border rounded-md text-sm bg-background" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
                {TAGS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><Label>Content / Description</Label><Textarea className="mt-1" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Circular body…" /></div>
            <div><Label>Attachment URL (PDF / Drive link)</Label><Input className="mt-1" value={form.fileUrl} onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))} placeholder="https://drive.google.com/..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary/90">{saving ? "Saving…" : editing ? "Update" : "Issue Circular"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
