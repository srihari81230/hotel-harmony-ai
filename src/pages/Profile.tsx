import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogOut, ArrowLeft, User, Mail, Phone, Cake, Calendar as CalIcon, MapPin,
  CheckCircle2, Shield, Sparkles, CreditCard, Plane,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, bookings, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", age: "", dob: "", location: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age?.toString() || "",
        dob: user.dob || "",
        location: user.location || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-10 m-4">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h2 className="font-heading text-2xl font-bold">Sign in to view your profile</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Manage your personal details, contact info and preferences.
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <Button onClick={() => navigate("/login")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Sign in
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>Back to home</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: form.name.trim() || user.name,
      email: form.email.trim() || user.email,
      phone: form.phone.trim(),
      age: form.age ? Number(form.age) : undefined,
      dob: form.dob,
      location: form.location.trim(),
    });
    toast({ title: "Profile updated ✅", description: "Your personal details have been saved." });
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const totalSpent = bookings.reduce((s, b) => s + b.total, 0);
  const filled =
    [user.name, user.email, form.phone, form.age, form.dob, form.location].filter(Boolean).length;
  const completion = Math.round((filled / 6) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Banner */}
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-4xl font-bold shadow-lg ring-4 ring-primary-foreground/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-accent">Member Account</p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">{user.name}</h1>
                <p className="text-primary-foreground/70 flex items-center gap-1.5 mt-1 text-sm">
                  <Mail className="h-3.5 w-3.5" /> {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar stats */}
          <aside className="space-y-4">
            <StatCard icon={Plane} label="Total Bookings" value={bookings.length.toString()} />
            <StatCard icon={CreditCard} label="Total Spent" value={`₹${totalSpent.toLocaleString("en-IN")}`} />
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">Profile completion</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-accent transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{completion}% complete</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Shield className="h-4 w-4 text-emerald-600" /> Verified member
              </div>
              <p className="text-xs text-muted-foreground">Email verified • Account in good standing</p>
              <Link to="/bookings" className="block text-xs text-accent hover:underline pt-1">View my bookings →</Link>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={save} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold">Edit personal details</h2>
                <p className="text-sm text-muted-foreground">These details speed up check-in at the hotel.</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-emerald-600 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field icon={User} label="Full name" id="p-name">
                <Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field icon={Mail} label="Email address" id="p-email">
                <Input id="p-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field icon={Phone} label="Phone number" id="p-phone">
                <Input id="p-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
              </Field>
              <Field icon={Cake} label="Age" id="p-age">
                <Input id="p-age" type="number" min={1} max={120} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="28" />
              </Field>
              <Field icon={CalIcon} label="Date of birth" id="p-dob">
                <Input id="p-dob" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              </Field>
              <Field icon={MapPin} label="Location" id="p-loc">
                <Input id="p-loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Bengaluru, India" />
              </Field>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 mt-6 border-t border-border">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-heading text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const Field = ({ icon: Icon, label, id, children }: { icon: any; label: string; id: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="flex items-center gap-1.5 text-xs">
      <Icon className="h-3.5 w-3.5 text-accent" /> {label}
    </Label>
    {children}
  </div>
);

export default Profile;
