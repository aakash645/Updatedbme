import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, CalendarDays, FileText, Images, Users, ClipboardList, AlertCircle, Layers } from "lucide-react";
import { Link } from "wouter";

interface Stats {
  heroSlides: number; announcements: number; events: number; circulars: number;
  gallery: number; team: number; memberships: number; pending: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ heroSlides:0, announcements:0, events:0, circulars:0, gallery:0, team:0, memberships:0, pending:0 });

  useEffect(() => {
    const token = localStorage.getItem("bme_admin_token");
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("/api/hero-slides").then(r => r.json()),
      fetch("/api/announcements").then(r => r.json()),
      fetch("/api/events").then(r => r.json()),
      fetch("/api/circulars").then(r => r.json()),
      fetch("/api/gallery").then(r => r.json()),
      fetch("/api/team").then(r => r.json()),
      fetch("/api/admin/memberships", { headers: h }).then(r => r.json()),
    ]).then(([hero, ann, ev, circ, gal, tm, mem]) => {
      setStats({
        heroSlides: hero.length, announcements: ann.length, events: ev.length, circulars: circ.length,
        gallery: gal.length, team: tm.length, memberships: mem.length,
        pending: Array.isArray(mem) ? mem.filter((m: any) => m.status === "submitted").length : 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: "Hero Slides", value: stats.heroSlides, icon: Layers, href: "/admin/hero-slides", color: "text-amber-600 bg-amber-50" },
    { label: "Announcements", value: stats.announcements, icon: Megaphone, href: "/admin/announcements", color: "text-primary bg-primary/10" },
    { label: "Events", value: stats.events, icon: CalendarDays, href: "/admin/events", color: "text-accent bg-accent/10" },
    { label: "Circulars", value: stats.circulars, icon: FileText, href: "/admin/circulars", color: "text-blue-600 bg-blue-50" },
    { label: "Gallery Photos", value: stats.gallery, icon: Images, href: "/admin/gallery", color: "text-green-600 bg-green-50" },
    { label: "Team Members", value: stats.team, icon: Users, href: "/admin/team", color: "text-purple-600 bg-purple-50" },
    { label: "Memberships", value: stats.memberships, icon: ClipboardList, href: "/admin/memberships", color: "text-orange-600 bg-orange-50" },
  ];

  const quickActions = [
    { label: "Manage Hero Slider", href: "/admin/hero-slides", icon: Layers },
    { label: "Post Announcement", href: "/admin/announcements", icon: Megaphone },
    { label: "Add Event", href: "/admin/events", icon: CalendarDays },
    { label: "Issue Circular", href: "/admin/circulars", icon: FileText },
    { label: "Add Gallery Photos", href: "/admin/gallery", icon: Images },
    { label: "Add Team Member", href: "/admin/team", icon: Users },
    { label: "Review Memberships", href: "/admin/memberships", icon: ClipboardList },
  ];

  return (
    <AdminLayout title="Dashboard">
      {stats.pending > 0 && (
        <Link href="/admin/memberships">
          <div className="mb-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm font-medium text-amber-800">
              {stats.pending} membership application{stats.pending > 1 ? "s" : ""} awaiting review
            </span>
            <span className="ml-auto text-sm text-amber-600 font-medium">Review →</span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}>
            <Card className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${color}`}><Icon className="h-5 w-5" /></div>
                <div>
                  <p className="text-2xl font-bold font-serif">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all cursor-pointer text-sm font-medium">
                <Icon className="h-4 w-4 flex-shrink-0" /> {label}
                <span className="ml-auto text-muted-foreground">→</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
