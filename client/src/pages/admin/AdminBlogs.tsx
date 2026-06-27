import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, FileText, ImagePlus } from "lucide-react";
import type { Blog } from "@shared/schema";

function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "", ...(options.headers || {}) },
  });
}

const empty: Omit<Blog, "id" | "createdAt" | "publishedAt"> = {
  title: "",
  metaHeading: "",
  metaDescription: "",
  description: "",
  content: "",
  imageUrl: "",
};

export default function AdminBlogs() {
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [publishNow, setPublishNow] = useState(true);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16));
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/blogs");
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Failed to load blogs" }));
        throw new Error(error.message || "Failed to load blogs");
      }
      const blogs = await res.json();
      setItems(blogs);
    } catch (err: any) {
      toast({ title: "Unable to load blogs", description: err.message, variant: "destructive" });
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setPublishNow(true);
    setPublishedAt(new Date().toISOString().slice(0, 16));
    setOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      metaHeading: blog.metaHeading,
      metaDescription: blog.metaDescription,
      description: blog.description,
      content: blog.content,
      imageUrl: blog.imageUrl,
    });
    setPublishNow(false);
    setPublishedAt(blog.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) return toast({ title: "Title is required", variant: "destructive" });
    if (!form.metaHeading.trim()) return toast({ title: "Meta heading is required", variant: "destructive" });
    if (!form.metaDescription.trim()) return toast({ title: "Meta description is required", variant: "destructive" });
    if (!form.description.trim()) return toast({ title: "Short description is required", variant: "destructive" });
    if (!form.content.trim()) return toast({ title: "Blog content is required", variant: "destructive" });
    if (!form.imageUrl.trim()) return toast({ title: "Thumbnail image URL is required", variant: "destructive" });
    if (!publishNow && !publishedAt.trim()) return toast({ title: "Publish date is required when not publishing now", variant: "destructive" });

    setSaving(true);
    try {
      const url = editing ? `/api/admin/blogs/${editing.id}` : "/api/admin/blogs";
      const method = editing ? "PUT" : "POST";
      const payload: Record<string, unknown> = { ...form };
      if (publishNow) {
        payload.publishedAt = new Date().toISOString();
      } else {
        const publishedDate = new Date(publishedAt);
        if (Number.isNaN(publishedDate.getTime())) {
          return toast({ title: "Invalid publish date", variant: "destructive" });
        }
        payload.publishedAt = publishedDate.toISOString();
      }

      const res = await adminFetch(url, { method, body: JSON.stringify(payload) });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Unable to save blog" }));
        throw new Error(error.message || "Unable to save blog");
      }

      toast({ title: editing ? "Blog updated" : "Blog created" });
      setOpen(false);
      load();
    } catch (error: any) {
      toast({ title: "Failed to save blog", description: error?.message || "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: number) => {
    setDeleting(id);
    try {
      await adminFetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      toast({ title: "Blog deleted" });
      load();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Blogs">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{items.length} blog post{items.length !== 1 ? "s" : ""}</p>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Blog
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <p className="mb-4">No blog posts yet.</p>
            <Button onClick={openAdd}>Create First Blog</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((blog) => (
            <Card key={blog.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs gap-1">
                      {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Unpublished"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base font-serif truncate">{blog.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blog.metaDescription}</p>
                  <p className="text-xs text-muted-foreground mt-2">{blog.metaHeading}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(blog)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm" variant="outline"
                    className="text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => del(blog.id)}
                    disabled={deleting === blog.id}
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title *</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Blog title" />
            </div>
            <div>
              <Label>Meta Heading *</Label>
              <Input className="mt-1" value={form.metaHeading} onChange={e => setForm(f => ({ ...f, metaHeading: e.target.value }))} placeholder="Short heading for SEO" />
            </div>
            <div>
              <Label>Meta Description *</Label>
              <Textarea className="mt-1" rows={3} value={form.metaDescription} onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))} placeholder="SEO-friendly meta description" />
            </div>
            <div>
              <Label>Short Description *</Label>
              <Textarea className="mt-1" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short summary shown in blog listing" />
            </div>
            <div>
              <Label>Blog Content *</Label>
              <Textarea className="mt-1" rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full blog article content" />
            </div>
            <div>
              <Label>Thumbnail Image URL *</Label>
              <Input className="mt-1" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input id="publish-now" type="checkbox" checked={publishNow} onChange={e => setPublishNow(e.target.checked)} className="w-4 h-4 accent-primary" />
                <Label htmlFor="publish-now" className="cursor-pointer">Publish now</Label>
              </div>
              {!publishNow && (
                <div>
                  <Label>Publish Date</Label>
                  <Input className="mt-1" type="datetime-local" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary/90">
              {saving ? "Saving…" : editing ? "Save Changes" : "Publish Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
