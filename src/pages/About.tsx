import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Sparkles, ShieldCheck, Award, Phone, Mail, MapPin,
  MessageCircle, Star, Users, Globe, Hotel, HeartHandshake,
} from "lucide-react";

const stats = [
  { icon: Hotel, label: "Hotels listed", value: "10,000+" },
  { icon: Globe, label: "Indian cities", value: "45+" },
  { icon: Users, label: "Happy guests", value: "2.4M" },
  { icon: Star, label: "Avg. rating", value: "4.7 / 5" },
];

const licenses = [
  { code: "IATA-IN-43187", label: "IATA Accredited Agency" },
  { code: "MOT/IN/2024/HTLBKR/9921", label: "Ministry of Tourism — Approved Aggregator" },
  { code: "GSTIN 29ABCDE1234F1Z5", label: "GST Registered" },
  { code: "FSSAI 10024033008891", label: "FSSAI Licensed (in-room dining)" },
];

const help = [
  "How to modify or cancel a booking",
  "Refund timelines & policies",
  "Adding extra guests (adults / children)",
  "Pet-friendly stays & accessibility",
  "Group bookings (10+ rooms)",
  "Special requests at check-in",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-12">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Button>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-xs uppercase tracking-widest text-accent">About LuxeStay</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                Honest, hand-picked stays across India.
              </h1>
              <p className="text-primary-foreground/80 mt-4 text-lg leading-relaxed">
                LuxeStay is an India-first hotel booking platform launched in 2022. From ₹300 hostels in
                Rishikesh to ₹15,000 palace suites in Udaipur — every property is personally inspected by
                our city teams for cleanliness, safety, and honest pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 -mt-8 mb-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5 shadow-sm text-center">
                <s.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: HeartHandshake, title: "Our Mission", text: "Take the guesswork out of hotel booking — only real photos, real reviews, and transparent prices." },
            { icon: ShieldCheck, title: "Verified Properties", text: "Each hotel is visited by our local team before listing. We re-check every 6 months." },
            { icon: Award, title: "Best Price Promise", text: "Find a lower price elsewhere within 24 hours and we'll refund the difference. No fine print." },
          ].map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </section>

        {/* Help Center + Contact */}
        <section className="bg-muted/30 border-y border-border py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-bold">Help Center</h3>
              </div>
              <ul className="space-y-2">
                {help.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">›</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-bold">Contact us 24×7</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> <a href="tel:18004191919" className="hover:text-accent">1800-419-1919 (toll-free)</a></p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> <a href="tel:+918045671234" className="hover:text-accent">+91 80 4567 1234 (international)</a></p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> <a href="mailto:hello@luxestay.in" className="hover:text-accent">hello@luxestay.in</a></p>
                <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-accent" /> WhatsApp: +91 98765 43210</p>
                <p className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-0.5" /> 4th Floor, Prestige Tower, MG Road, Bengaluru 560001, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Licenses */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <p className="text-accent text-xs uppercase tracking-widest mb-1">Trust & Compliance</p>
            <h2 className="font-heading text-3xl font-bold">Licenses & Accreditations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {licenses.map((l) => (
              <div key={l.code} className="bg-card border border-border rounded-xl p-5 text-center">
                <ShieldCheck className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">{l.label}</p>
                <p className="text-[11px] font-mono text-muted-foreground mt-1">{l.code}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
