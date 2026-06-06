import { useLocation, Link } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin";
import {
  LayoutDashboard, Megaphone, CalendarDays, FileText,
  Images, Users, ClipboardList, LogOut, ExternalLink, ChevronRight, Layers
} from "lucide-react";
import bmeLogoPath from "@assets/Copper_finish_logo_-_No_BG_1772884011587.png";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero-slides", label: "Hero Slider", icon: Layers },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/events", label: "Events & Exhibitions", icon: CalendarDays },
  { href: "/admin/circulars", label: "Circulars & Notices", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/team", label: "Directors & Team", icon: Users },
  { href: "/admin/memberships", label: "Memberships", icon: ClipboardList },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, navigate] = useLocation();
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-foreground text-background flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={bmeLogoPath} alt="BME" className="h-8 w-8 object-contain brightness-0 invert" />
            <div>
              <p className="text-sm font-bold font-serif leading-none">BME Admin</p>
              <p className="text-xs text-white/40 mt-0.5 font-mono">Control Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? location === href : location.startsWith(href);
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all ${
                  isActive ? "bg-primary text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/10"
                }`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                  {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <a href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
            <ExternalLink className="h-4 w-4" /> View Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-white/10 transition-all">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
          {admin && (
            <div className="px-3 py-2 mt-1">
              <p className="text-xs font-medium text-white/70 truncate">{admin.name}</p>
              <p className="text-xs text-white/30 truncate">{admin.email}</p>
            </div>
          )}
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b px-6 py-3 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-serif font-bold">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {admin?.name?.[0] || "A"}
            </div>
            <span className="hidden sm:inline">{admin?.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
