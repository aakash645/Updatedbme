import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { adminFetch } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Image } from "lucide-react";
import type { GalleryItem, GalleryAlbum } from "@shared/schema";

const CATEGORIES = ["event", "exhibition", "award", "conclave", "team", "general"];

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const [itemForm, setItemForm] = useState({ title: "", imageUrl: "", category: "event", albumId: "" });
  const [albumForm, setAlbumForm] = useState({ title: "", description: "", coverImageUrl: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    Promise.all([
      fetch("/api/gallery").then(r => r.json()),
      fetch("/api/gallery-albums").then(r => r.json()),
    ]).then(([g, a]) => { setItems(g); setAlbums(a); }).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const saveItem = async () => {
    if (!itemForm.imageUrl.trim()) return toast({ title: "Image URL is required", variant: "destructive" });
    setSaving(true);
    try {
      await adminFetch("/api/admin/gallery", { method: "POST", body: JSON.stringify({ ...itemForm, albumId: itemForm.albumId ? parseInt(itemForm.albumId) : null }) });
      toast({ title: "Photo added!" });
      setOpenItem(false); load();
    } catch { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const saveAlbum = async () => {
    if (!albumForm.title.trim()) return toast({ title: "Title is required", variant: "destructive" });
    setSaving(true);
    try {
      await adminFetch("/api/admin/gallery-albums", { method: "POST", body: JSON.stringify(albumForm) });
      toast({ title: "Album created!" });
      setOpenAlbum(false); load();
    } catch { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const delItem = async (id: number) => {
    await adminFetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    toast({ title: "Deleted" }); load();
  };

  const delAlbum = async (id: number) => {
    await adminFetch(`/api/admin/gallery-albums/${id}`, { method: "DELETE" });
    toast({ title: "Album deleted" }); load();
  };

  return (
    <AdminLayout title="Gallery">
      <div className="flex gap-3 justify-end mb-6">
        <Button variant="outline" onClick={() => { setAlbumForm({ title: "", description: "", coverImageUrl: "" }); setOpenAlbum(true); }}>
          <Plus className="h-4 w-4 mr-2" /> New Album
        </Button>
        <Button onClick={() => { setItemForm({ title: "", imageUrl: "", category: "event", albumId: "" }); setOpenItem(true); }} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Photo
        </Button>
      </div>

      {albums.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Albums</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map(album => (
              <Card key={album.id} className="overflow-hidden group">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  {album.coverImageUrl
                    ? <img src={album.coverImageUrl} alt={album.title} className="w-full h-full object-cover" />
                    : <Image className="h-8 w-8 text-muted-foreground" />}
                  <button onClick={() => delAlbum(album.id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium font-serif truncate">{album.title}</p>
                  <p className="text-xs text-muted-foreground">{items.filter(i => i.albumId === album.id).length} photos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Photos ({items.length})</h3>
      {loading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">
          <p className="mb-4">No photos yet.</p>
          <Button onClick={() => setOpenItem(true)}>Add First Photo</Button>
        </CardContent></Card>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map(item => (
            <div key={item.id} className="aspect-square relative group rounded-xl overflow-hidden bg-muted">
              <img src={item.imageUrl} alt={item.title || ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button onClick={() => delItem(item.id)} className="p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              {item.category && <span className="absolute bottom-1.5 left-1.5 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">{item.category}</span>}
            </div>
          ))}
        </div>
      )}

      <Dialog open={openItem} onOpenChange={setOpenItem}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-serif">Add Photo</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>Image URL *</Label><Input className="mt-1" value={itemForm.imageUrl} onChange={e => setItemForm(f => ({...f, imageUrl: e.target.value}))} placeholder="https://example.com/photo.jpg" /></div>
            <div><Label>Caption</Label><Input className="mt-1" value={itemForm.title} onChange={e => setItemForm(f => ({...f, title: e.target.value}))} placeholder="Photo caption" /></div>
            <div><Label>Category</Label>
              <select className="w-full mt-1 h-10 px-3 border rounded-md text-sm" value={itemForm.category} onChange={e => setItemForm(f => ({...f, category: e.target.value}))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {albums.length > 0 && (
              <div><Label>Album (optional)</Label>
                <select className="w-full mt-1 h-10 px-3 border rounded-md text-sm" value={itemForm.albumId} onChange={e => setItemForm(f => ({...f, albumId: e.target.value}))}>
                  <option value="">— No album —</option>
                  {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                </select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenItem(false)}>Cancel</Button>
            <Button onClick={saveItem} disabled={saving} className="bg-primary hover:bg-primary/90">{saving ? "Adding…" : "Add Photo"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAlbum} onOpenChange={setOpenAlbum}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-serif">Create Album</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>Album Title *</Label><Input className="mt-1" value={albumForm.title} onChange={e => setAlbumForm(f => ({...f, title: e.target.value}))} placeholder="Annual Day 2025" /></div>
            <div><Label>Description</Label><Input className="mt-1" value={albumForm.description} onChange={e => setAlbumForm(f => ({...f, description: e.target.value}))} placeholder="Brief description" /></div>
            <div><Label>Cover Image URL</Label><Input className="mt-1" value={albumForm.coverImageUrl} onChange={e => setAlbumForm(f => ({...f, coverImageUrl: e.target.value}))} placeholder="https://..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAlbum(false)}>Cancel</Button>
            <Button onClick={saveAlbum} disabled={saving} className="bg-primary hover:bg-primary/90">{saving ? "Creating…" : "Create Album"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
