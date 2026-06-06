import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Pin } from "lucide-react";
import type { Announcement } from "@shared/schema";

function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "", ...(options.headers || {}) },
  });
}

const empty = { title: "", content: "", pinned: false, imageUrl: "" };

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/announcements").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (a: Announcement) => {
    setEditing(a);
    setForm({ title: a.title, content: a.content, pinned: a.pinned || false, imageUrl: a.imageUrl || "" });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) return toast({ title: "Title is required", variant: "destructive" });
    setSaving(true);
    try {
      const url = editing ? `/api/admin/announcements/${editing.id}` : "/api/admin/announcements";
      const method = editing ? "PUT" : "POST";
      await adminFetch(url, { method, body: JSON.stringify(form) });
      toast({ title: editing ? "Announcement updated!" : "Announcement published!" });
      setOpen(false);
      load();
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: number) => {
    setDeleting(id);
    try {
      await adminFetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
      toast({ title: "Deleted" });
      load();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Announcements">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{items.length} announcement{items.length !== 1 ? "s" : ""}</p>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Announcement
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <p className="mb-4">No announcements yet.</p>
            <Button onClick={openAdd}>Create First Announcement</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map(a => (
            <Card key={a.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {a.pinned && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Pin className="h-2.5 w-2.5" /> Pinned
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(a.date!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm font-serif truncate">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.content}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(a)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm" variant="outline"
                    className="text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => del(a.id)}
                    disabled={deleting === a.id}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? "Edit Announcement" : "New Announcement"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title *</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement headline" />
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea className="mt-1" rows={6} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write your announcement…" />
            </div>
            <div>
              <Label>Image URL (optional)</Label>
              <Input className="mt-1" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pinned" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))} className="w-4 h-4 accent-primary" />
              <Label htmlFor="pinned" className="cursor-pointer">📌 Pin to homepage</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary/90">
              {saving ? "Saving…" : editing ? "Update" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
