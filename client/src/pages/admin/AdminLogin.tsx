import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail } from "lucide-react";
import bmeLogoPath from "@assets/Copper_finish_logo_-_No_BG_1772884011587.png";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { login } = useAdminAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Welcome back!", description: "Signed in to BME Admin." });
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={bmeLogoPath} alt="BME Logo" className="h-20 mx-auto mb-2 object-contain" />
          <h1 className="text-2xl font-serif font-bold">BME Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Bharat Metal Exchange Ltd.</p>
        </div>
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-xl">Sign In</CardTitle>
            <CardDescription>Enter your admin credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" required className="pl-9" placeholder="admin@bme.in"
                    value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" required className="pl-9" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Signing in…" : "Sign In to Admin Panel"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Website</a>
            </div>
          </CardContent>
        </Card>
        {/* <p className="text-center text-xs text-muted-foreground mt-4">Default: admin@bme.in / Admin@123</p> */}
      </div>
    </div>
  );
}
