import { useMemo, useState } from "react";
import { Sparkles, Brain, TrendingUp, Users, Dumbbell, Snowflake, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import HotelCard from "./HotelCard";
import HotelDetailModal from "./HotelDetailModal";
import { hotels, type Hotel } from "@/data/hotels";

const preferences = [
  { label: "Beach Lover", icon: "🏖️" },
  { label: "Adventure", icon: "🏔️" },
  { label: "City Explorer", icon: "🌃" },
  { label: "Luxury", icon: "💎" },
  { label: "Budget", icon: "💰" },
  { label: "Romantic", icon: "❤️" },
];

const AIRecommendations = () => {
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(["Beach Lover", "Luxury"]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const togglePref = (p: string) =>
    setSelectedPrefs((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  // Pick one hotel per star tier 5→1 with gym/AC/breakfast preferred
  const recommended = useMemo(() => {
    const picks: Hotel[] = [];
    for (const star of [5, 4, 3, 2, 1] as const) {
      const tier = hotels
        .filter((h) => h.starRating === star)
        .sort((a, b) => Number(!!b.gym) + Number(!!b.acRooms) + Number(!!b.breakfastIncluded) - (Number(!!a.gym) + Number(!!a.acRooms) + Number(!!a.breakfastIncluded)));
      if (tier[0]) picks.push({ ...tier[0], matchScore: 80 + star * 3 });
    }
    return picks;
  }, []);

  return (
    <section id="ai-picks" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Powered by AI
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Recommendations — From 5★ to 1★
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            One handpicked stay at every star tier. Highlighting Gym, AC Rooms and Breakfast where included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Brain, title: "Smart Matching", desc: "ML algorithms analyze 50+ data points to match you with ideal hotels" },
            { icon: TrendingUp, title: "Review Analysis", desc: "NLP processes thousands of reviews to surface genuine insights" },
            { icon: Users, title: "Collaborative Filtering", desc: "Learn from travelers with similar preferences for better picks" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl p-6 shadow-card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card mb-12">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Select Your Preferences</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {preferences.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => togglePref(label)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedPrefs.includes(label)
                    ? "bg-accent text-accent-foreground shadow-gold"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Dumbbell className="h-4 w-4 text-accent" /> Gym</span>
            <span className="inline-flex items-center gap-1"><Snowflake className="h-4 w-4 text-accent" /> AC Rooms</span>
            <span className="inline-flex items-center gap-1"><Coffee className="h-4 w-4 text-accent" /> Breakfast Included</span>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Sparkles className="h-4 w-4" />
            Get AI Recommendations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((hotel) => (
            <div key={hotel.id} className="space-y-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent text-center">{hotel.starRating}★ Pick</p>
              <HotelCard hotel={hotel} onSelect={setSelectedHotel} />
            </div>
          ))}
        </div>
      </div>

      <HotelDetailModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
    </section>
  );
};

export default AIRecommendations;
