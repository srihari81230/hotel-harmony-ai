import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, MapPin, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-hotel.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing details", description: "Enter email and password.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    if (mode === "signup" && !name.trim()) {
      toast({ title: "Add your name", description: "Tell us what to call you.", variant: "destructive" });
      return;
    }
    login(email.trim(), name.trim() || undefined);
    toast({ title: mode === "signup" ? "Welcome to LuxeStay! 🎉" : "Welcome back 👋", description: email });
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT — brand + description */}
      <div className="relative hidden lg:block">
        <img src={heroImage} alt="Luxury hotel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 h-full flex flex-col p-12 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-accent" />
            <span className="font-heading text-2xl font-bold">LuxeStay</span>
          </div>
          <div className="my-auto space-y-6">
            <p className="text-accent uppercase tracking-widest text-xs font-medium">India's Hotel Booking Platform</p>
            <h1 className="font-heading text-4xl xl:text-5xl font-bold leading-tight">
              Your perfect stay, <span className="text-gradient-gold">beautifully curated.</span>
            </h1>
            <p className="text-primary-foreground/80 max-w-md">
              From ₹300 hostels to ₹15,000 palace suites — discover 100+ handpicked Indian hotels with
              transparent pricing, real photos and 24×7 support.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-start gap-2"><MapPin className="h-5 w-5 text-accent mt-0.5" /><div><p className="text-sm font-semibold">45+ cities</p><p className="text-xs text-primary-foreground/60">Across India</p></div></div>
              <div className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 text-accent mt-0.5" /><div><p className="text-sm font-semibold">Free cancellation</p><p className="text-xs text-primary-foreground/60">On most stays</p></div></div>
              <div className="flex items-start gap-2"><Star className="h-5 w-5 text-accent mt-0.5" /><div><p className="text-sm font-semibold">Verified ratings</p><p className="text-xs text-primary-foreground/60">Real guest reviews</p></div></div>
              <div className="flex items-start gap-2"><Sparkles className="h-5 w-5 text-accent mt-0.5" /><div><p className="text-sm font-semibold">In-room dining</p><p className="text-xs text-primary-foreground/60">North / South / Italian</p></div></div>
            </div>
          </div>
          <p className="text-primary-foreground/40 text-xs">© 2026 LuxeStay Travel Pvt. Ltd.</p>
        </div>
      </div>

      {/* RIGHT — auth form */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="font-heading text-xl font-bold">LuxeStay</span>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">{mode === "login" ? "Sign in" : "Create your account"}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Welcome back. Enter your details to continue." : "Join LuxeStay in less than a minute."}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              {mode === "login" ? "Sign In" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            {mode === "login" ? "New to LuxeStay?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-accent font-semibold hover:underline">
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
