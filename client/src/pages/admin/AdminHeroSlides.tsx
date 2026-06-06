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
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Image } from "lucide-react";
import type { HeroSlide } from "@shared/schema";

function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });
}

const empty = {
  title: "",
  highlight: "",
  description: "",
  imageUrl: "",
  order: 0,
  active: true,
};

export default function AdminHeroSlides() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/hero-slides")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...empty, order: items.length });
    setOpen(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditing(slide);
    setForm({
      title: slide.title,
      highlight: slide.highlight,
      description: slide.description,
      imageUrl: slide.imageUrl,
      order: slide.order ?? 0,
      active: slide.active ?? true,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.highlight.trim() || !form.imageUrl.trim()) {
      return toast({ title: "Title, highlight, and image URL are required", variant: "destructive" });
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/hero-slides/${editing.id}` : "/api/admin/hero-slides";
      const method = editing ? "PUT" : "POST";
      const res = await adminFetch(url, { method, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: editing ? "Slide updated!" : "Slide created!" });
      setOpen(false);
      load();
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    await adminFetch(`/api/admin/hero-slides/${slide.id}`, {
      method: "PUT",
      body: JSON.stringify({ active: !slide.active }),
    });
    toast({ title: slide.active ? "Slide hidden" : "Slide shown" });
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Delete this slide?")) return;
    await adminFetch(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
    toast({ title: "Deleted" });
    load();
  };

  const availableImages = [
    "/bme1_1773052578105.jpeg",
    "/bme2_1773052578113.jpeg",
    "/bme3_1773052578114.jpeg",
    "/bme4_1773052578114.jpeg",
    "/bme5_1773052578115.jpeg",
    "/bme6_1773052578115.jpeg",
    "/bme7_1773052578116.jpeg",
    "/bme8_1773052578116.jpeg",
    "/bme9_1773052578117.jpeg",
    "/bme10_1773052578117.jpeg",
    "/bme11_1773052578118.jpeg",
    "/bme12_1773052578118.jpeg",
    "/bme13_1773052578119.jpeg",
    "/bme14_1773052578119.jpeg",
  ];

  return (
    <AdminLayout title="Hero Slider">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-muted-foreground">{items.length} slide{items.length !== 1 ? "s" : ""}</p>
          <p className="text-xs text-muted-foreground mt-1">Active slides appear on the homepage slider</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Slide
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Image className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">No slides yet</p>
            <p className="text-sm">Add your first hero slide to control the homepage slider.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {[...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((slide) => (
            <Card key={slide.id} className={`transition-all ${!slide.active ? "opacity-50" : ""}`}>
              <CardContent className="p-4 flex items-center gap-4">
                {/* Drag Handle placeholder */}
                <GripVertical className="w-5 h-5 text-muted-foreground/50 shrink-0" />

                {/* Preview Image */}
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <img
                    src={slide.imageUrl}
                    alt={slide.highlight}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/bme1_1773052578105.jpeg"; }}
                  />
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Slide #{(slide.order ?? 0) + 1}
                    </span>
                    <Badge variant={slide.active ? "default" : "secondary"} className="text-xs">
                      {slide.active ? "Active" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="font-serif font-bold text-sm truncate">
                    {slide.title} <span className="text-primary">{slide.highlight}</span>
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{slide.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive(slide)}
                    title={slide.active ? "Hide slide" : "Show slide"}
                  >
                    {slide.active ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-primary" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(slide)}>
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => del(slide.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editing ? "Edit Slide" : "Add New Slide"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title Line</Label>
                <Input
                  id="title"
                  placeholder="e.g. The Apex Body of"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlight">Highlighted Text</Label>
                <Input
                  id="highlight"
                  placeholder="e.g. Non-Ferrous Metals"
                  value={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">This text appears in the primary color</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Brief description shown below the heading..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Background Image</Label>
              <Input
                placeholder="Image URL (e.g. /bme1_1773052578105.jpeg or https://...)"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />

              {/* Quick image picker */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Or pick from site images:</p>
                <div className="grid grid-cols-7 gap-1.5 max-h-36 overflow-y-auto">
                  {availableImages.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: img })}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        form.imageUrl === img ? "border-primary scale-95" : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {form.imageUrl && (
                <div className="mt-2 h-28 rounded-xl overflow-hidden bg-muted border">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: true })}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      form.active ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: false })}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      !form.active ? "border-destructive bg-destructive/10 text-destructive" : "border-muted text-muted-foreground"
                    }`}
                  >
                    Hidden
                  </button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary text-white">
              {saving ? "Saving…" : editing ? "Update Slide" : "Add Slide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
