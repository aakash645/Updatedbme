import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Event } from "@shared/schema";

function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "", ...(options.headers || {}) },
  });
}

const empty = { title: "", description: "", location: "", eventDate: "", imageUrl: "", type: "event" };

export default function AdminEvents() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/events").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (ev: Event) => {
    setEditing(ev);
    setForm({
      title: ev.title, description: ev.description, location: ev.location,
      eventDate: ev.eventDate ? new Date(ev.eventDate).toISOString().slice(0, 10) : "",
      imageUrl: ev.imageUrl || "", type: ev.type,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title || !form.description || !form.location || !form.eventDate)
      return toast({ title: "All required fields must be filled", variant: "destructive" });
    setSaving(true);
    try {
      const url = editing ? `/api/admin/events/${editing.id}` : "/api/admin/events";
      await adminFetch(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(form) });
      toast({ title: editing ? "Event updated!" : "Event created!" });
      setOpen(false); load();
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    await adminFetch(`/api/admin/events/${id}`, { method: "DELETE" });
    toast({ title: "Deleted" }); load();
  };

  const typeColor: Record<string, string> = {
    event: "bg-primary/10 text-primary", conclave: "bg-accent/10 text-accent",
  };

  return (
    <AdminLayout title="Events & Exhibitions">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{items.length} event{items.length !== 1 ? "s" : ""}</p>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Event
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}</div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">
          <p className="mb-4">No events yet.</p>
          <Button onClick={openAdd}>Add First Event</Button>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map(ev => (
            <Card key={ev.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${typeColor[ev.type] || typeColor.event}`}>{ev.type}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(ev.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm font-serif truncate">{ev.title}</h3>
                  <p className="text-xs text-muted-foreground">📍 {ev.location}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(ev)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => del(ev.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-serif">{editing ? "Edit Event" : "New Event"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>Title *</Label><Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="International Metals Trade Fair 2025" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date *</Label><Input type="date" className="mt-1" value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} /></div>
              <div><Label>Type *</Label>
                <select className="w-full mt-1 h-10 px-3 border rounded-md text-sm bg-background" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="event">Event / Exhibition</option>
                  <option value="conclave">Annual Conclave</option>
                </select>
              </div>
            </div>
            <div><Label>Location *</Label><Input className="mt-1" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="NSCI Dome, Worli, Mumbai" /></div>
            <div><Label>Description *</Label><Textarea className="mt-1" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Event details…" /></div>
            <div><Label>Image URL (optional)</Label><Input className="mt-1" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary/90">{saving ? "Saving…" : editing ? "Update" : "Create Event"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
