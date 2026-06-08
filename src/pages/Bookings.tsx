import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, CalendarCheck, MapPin, Users, CreditCard, Inbox, Search,
  Plane, Hotel as HotelIcon, IndianRupee, Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "all" | "upcoming" | "past";

const Bookings = () => {
  const { user, bookings } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-10 m-4">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h2 className="font-heading text-2xl font-bold">Sign in to view your bookings</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your trips, upcoming stays and past adventures are saved to your account.
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

  const now = Date.now();
  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        if (tab === "upcoming") return new Date(b.checkIn).getTime() >= now;
        if (tab === "past") return new Date(b.checkOut).getTime() < now;
        return true;
      })
      .filter((b) =>
        !q.trim() ||
        b.hotelName.toLowerCase().includes(q.toLowerCase()) ||
        b.location.toLowerCase().includes(q.toLowerCase())
      );
  }, [bookings, tab, q, now]);

  const totalSpent = bookings.reduce((s, b) => s + b.total, 0);
  const upcoming = bookings.filter((b) => new Date(b.checkIn).getTime() >= now).length;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-10">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Button>
            <p className="text-xs uppercase tracking-widest text-accent">Your Trips</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">My Bookings</h1>
            <p className="text-primary-foreground/70 mt-2 max-w-xl">
              Confirmed stays, upcoming trips and past adventures — all in one place.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mt-6 max-w-2xl">
              <Stat icon={HotelIcon} label="Total" value={bookings.length.toString()} />
              <Stat icon={Plane} label="Upcoming" value={upcoming.toString()} />
              <Stat icon={IndianRupee} label="Spent" value={`₹${totalSpent.toLocaleString("en-IN")}`} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
              {(["all", "upcoming", "past"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-xs md:text-sm px-3 py-1.5 rounded-md capitalize font-medium transition-colors ${
                    tab === t ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by hotel or city" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-12">
              <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-heading text-lg font-semibold">No bookings here yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Browse hotels on the home page and tap Book Now to confirm a stay.
              </p>
              <Button className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate("/")}>
                Find a hotel
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((b) => {
                const upcoming = new Date(b.checkIn).getTime() >= now;
                return (
                  <div
                    key={b.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow grid grid-cols-1 md:grid-cols-[260px_1fr_auto]"
                  >
                    <img src={b.hotelImage} alt={b.hotelName} className="w-full h-44 md:h-full object-cover" loading="lazy" />
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={upcoming ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}>
                          {upcoming ? "Upcoming" : "Completed"}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">#{b.id.slice(0, 6).toUpperCase()}</Badge>
                      </div>
                      <h3 className="font-heading text-xl font-bold leading-tight">{b.hotelName}</h3>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {b.location}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm pt-1">
                        <span className="flex items-center gap-1.5">
                          <CalendarCheck className="h-4 w-4 text-accent" />
                          {format(new Date(b.checkIn), "PP")} → {format(new Date(b.checkOut), "PP")}
                          <span className="text-muted-foreground">({b.nights}n)</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {b.adults} adult{b.adults > 1 ? "s" : ""}{b.children ? `, ${b.children} child` : ""}</span>
                        <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {b.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="p-5 md:border-l border-border bg-muted/30 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:min-w-[180px]">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total paid</p>
                        <p className="font-heading text-2xl font-bold text-accent">₹{b.total.toLocaleString("en-IN")}</p>
                        {b.discount > 0 && (
                          <p className="text-[11px] text-emerald-600">Saved ₹{b.discount.toLocaleString("en-IN")}</p>
                        )}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate("/")}>Book again</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-primary-foreground/10 backdrop-blur rounded-xl px-4 py-3 border border-primary-foreground/10">
    <div className="flex items-center gap-2 text-primary-foreground/70 text-xs">
      <Icon className="h-3.5 w-3.5" /> {label}
    </div>
    <p className="font-heading text-lg md:text-xl font-bold mt-0.5">{value}</p>
  </div>
);

export default Bookings;
