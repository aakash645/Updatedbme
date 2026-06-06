import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { adminFetch } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, User } from "lucide-react";
import type { TeamMember } from "@shared/schema";

const CATEGORIES = ["office_bearer", "director", "staff"];
const CATEGORY_LABELS: Record<string, string> = {
  office_bearer: "Office Bearer", director: "Director", staff: "Staff",
};
const CATEGORY_COLORS: Record<string, string> = {
  office_bearer: "bg-primary/10 text-primary",
  director: "bg-accent/10 text-accent",
  staff: "bg-muted text-muted-foreground",
};

const empty = { name: "", role: "", category: "director", imageUrl: "", bio: "", order: 0 };

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/team").then(r => r.json()).then(setMembers).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); setForm({ ...empty, order: members.length }); setOpen(true); };
  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, category: m.category, imageUrl: m.imageUrl || "", bio: m.bio || "", order: m.order || 0 });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.role.trim()) return toast({ title: "Name and role are required", variant: "destructive" });
    setSaving(true);
    try {
      const url = editing ? `/api/admin/team/${editing.id}` : "/api/admin/team";
      await adminFetch(url, { method: editing ? "PUT" : "POST", body: JSON.stringify({ ...form, order: Number(form.order) }) });
      toast({ title: editing ? "Updated!" : "Member added!" });
      setOpen(false); load();
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    await adminFetch(`/api/admin/team/${id}`, { method: "DELETE" });
    toast({ title: "Removed" }); load();
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = members.filter(m => m.category === cat);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <AdminLayout title="Directors & Team">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{members.length} member{members.length !== 1 ? "s" : ""}</p>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Add Member</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : members.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">
          <p className="mb-4">No team members yet.</p>
          <Button onClick={openAdd}>Add First Member</Button>
        </CardContent></Card>
      ) : (
        CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
          <div key={cat} className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{CATEGORY_LABELS[cat]}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {grouped[cat].map(m => (
                <Card key={m.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                    {m.imageUrl
                      ? <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover object-top" />
                      : <div className="w-full h-full flex items-center justify-center"><User className="h-12 w-12 text-muted-foreground" /></div>}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button onClick={() => openEdit(m)} className="p-1.5 bg-white text-foreground rounded-md"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => del(m.id)} className="p-1.5 bg-red-500 text-white rounded-md"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold font-serif leading-tight truncate">{m.name}</p>
                    <p className="text-xs text-primary mt-0.5 truncate">{m.role}</p>
                    <span className={`mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full font-mono ${CATEGORY_COLORS[m.category]}`}>{CATEGORY_LABELS[m.category]}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-serif">{editing ? "Edit Member" : "Add Team Member"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>Full Name *</Label><Input className="mt-1" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Shri Rajesh Kumar" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Role / Designation *</Label><Input className="mt-1" value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} placeholder="President" /></div>
              <div><Label>Category</Label>
                <select className="w-full mt-1 h-10 px-3 border rounded-md text-sm" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
              </div>
            </div>
            <div><Label>Photo URL</Label><Input className="mt-1" value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://..." /></div>
            <div><Label>Bio (optional)</Label><Textarea className="mt-1" rows={3} value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} placeholder="Brief profile…" /></div>
            <div><Label>Display Order</Label><Input type="number" className="mt-1 w-24" value={form.order} onChange={e => setForm(f => ({...f, order: parseInt(e.target.value) || 0}))} min={0} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary/90">{saving ? "Saving…" : editing ? "Update" : "Add Member"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
