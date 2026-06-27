import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppLaunchBanner from "@/components/AppLaunchBanner";

import Home from "@/pages/Home";
import About from "@/pages/About";
import President from "@/pages/President";
import Directors from "@/pages/Directors";
import Products from "@/pages/Products";
import KnowledgeHub from "@/pages/KnowledgeHub";
import Contact from "@/pages/Contact";
import Events from "@/pages/Events";
import Team from "@/pages/Team";
import Conclave from "@/pages/Conclave";
import Conclave2027 from "@/pages/Conclave2027";
import Circulars from "@/pages/Circulars";
import Gallery from "@/pages/Gallery";
import Membership from "@/pages/Membership";
import MembershipApply from "@/pages/MembershipApply";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import RefundPolicy from "@/pages/RefundPolicy";
import CancellationPolicy from "@/pages/CancellationPolicy";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminCirculars from "@/pages/admin/AdminCirculars";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminTeam from "@/pages/admin/AdminTeam";
import AdminMemberships from "@/pages/admin/AdminMemberships";
import AdminHeroSlides from "./pages/admin/AdminHeroSlides";
import AdminBlogs from "./pages/admin/AdminBlogs";
import NewsDetail from "./pages/NewsDetail";
import EventDetail from "./pages/EventDetail";
import CircularDetail from "./pages/CircularDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function ProtectedAdmin({ component: Component }: { component: React.ComponentType }) {
  const [, navigate] = useLocation();
  const token = localStorage.getItem("bme_admin_token");
  if (!token) { setTimeout(() => navigate("/admin/login"), 0); return null; }
  return <Component />;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppLaunchBanner />
      <div className="pt-20">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  if (location.startsWith("/admin")) {
    return (
      <Switch>
        <Route path="/admin/login"         component={AdminLogin} />
        <Route path="/admin"               component={() => <ProtectedAdmin component={AdminDashboard} />} />
        <Route path="/admin/announcements" component={() => <ProtectedAdmin component={AdminAnnouncements} />} />
        <Route path="/admin/events"        component={() => <ProtectedAdmin component={AdminEvents} />} />
        <Route path="/admin/circulars"     component={() => <ProtectedAdmin component={AdminCirculars} />} />
        <Route path="/admin/gallery"       component={() => <ProtectedAdmin component={AdminGallery} />} />
        <Route path="/admin/team"          component={() => <ProtectedAdmin component={AdminTeam} />} />
        <Route path="/admin/blogs"         component={() => <ProtectedAdmin component={AdminBlogs} />} />
        <Route path="/admin/memberships"   component={() => <ProtectedAdmin component={AdminMemberships} />} />
        <Route path="/admin/hero-slides"   component={() => <ProtectedAdmin component={AdminHeroSlides} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <PublicLayout>
      <Switch>
        <Route path="/"                     component={Home} />
        <Route path="/about"               component={About} />
        <Route path="/president"           component={President} />
        <Route path="/directors"           component={Directors} />
        <Route path="/products"            component={Products} />
        <Route path="/knowledge"           component={KnowledgeHub} />
        <Route path="/contact"             component={Contact} />
        <Route path="/events"              component={Events} />
        <Route path="/events/:id"          component={EventDetail} />
        <Route path="/team"               component={Team} />
        <Route path="/conclave"           component={Conclave} />
        <Route path="/conclave2027"       component={Conclave2027} />
        <Route path="/circulars"          component={Circulars} />
        <Route path="/circulars/:id"      component={CircularDetail} />
        <Route path="/news/:id"           component={NewsDetail} />
        <Route path="/blog"               component={Blog} />
        <Route path="/blog/:id"           component={BlogDetail} />
        <Route path="/gallery"            component={Gallery} />
        <Route path="/membership"         component={Membership} />
        <Route path="/membership/apply"   component={MembershipApply} />
        <Route path="/privacy-policy"     component={PrivacyPolicy} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/refund-policy"      component={RefundPolicy} />
        <Route path="/cancellation-policy" component={CancellationPolicy} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
