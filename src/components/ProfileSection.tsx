import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Calendar, MapPin, Cake } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSection = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    age: user?.age?.toString() || "",
    dob: user?.dob || "",
    location: user?.location || "",
  });

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name, email: user.email, phone: user.phone || f.phone, age: user.age?.toString() || f.age, dob: user.dob || f.dob, location: user.location || f.location }));
  }, [user]);

  if (!user) return null;

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
    toast({ title: "Profile saved ✅", description: "Your personal details have been updated." });
  };

  return (
    <section id="profile" className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Your Account</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Personal Details</h2>
          <p className="text-muted-foreground mt-2">Keep your contact info up-to-date for smooth check-ins.</p>
        </div>

        <form onSubmit={save} className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field icon={User} label="Full name" id="p-name">
            <Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field icon={Mail} label="Email" id="p-email">
            <Input id="p-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field icon={Phone} label="Phone number" id="p-phone">
            <Input id="p-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
          </Field>
          <Field icon={Cake} label="Age" id="p-age">
            <Input id="p-age" type="number" min={1} max={120} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="28" />
          </Field>
          <Field icon={Calendar} label="Date of birth" id="p-dob">
            <Input id="p-dob" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
          </Field>
          <Field icon={MapPin} label="Location" id="p-loc">
            <Input id="p-loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Bengaluru, India" />
          </Field>
          <div className="md:col-span-2 flex justify-end pt-2">
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">Save changes</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Field = ({ icon: Icon, label, id, children }: { icon: any; label: string; id: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="flex items-center gap-1.5 text-xs"><Icon className="h-3.5 w-3.5 text-accent" /> {label}</Label>
    {children}
  </div>
);

export default ProfileSection;
