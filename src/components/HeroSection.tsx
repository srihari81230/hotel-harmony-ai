import { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-hotel.jpg";

export interface SearchFilters {
  query: string;
  priceRange: [number, number];
}

interface Props {
  onSearch: (filters: SearchFilters) => void;
}

const HeroSection = ({ onSearch }: Props) => {
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([300, 15000]);

  const handleSearch = () => {
    onSearch({ query: destination.trim(), priceRange });
    toast({
      title: "Searching hotels",
      description: `${destination.trim() || "All destinations"}${checkIn ? ` • ${format(checkIn, "PP")}` : ""} • ${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""} • ₹${priceRange[0].toLocaleString("en-IN")}–₹${priceRange[1].toLocaleString("en-IN")}`,
    });
    setTimeout(() => document.getElementById("hotels")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury hotel lobby" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 text-center">
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
          Luxury Hotels Across India
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up leading-tight">
          Your Perfect Stay,{" "}
          <span className="text-gradient-gold">Beautifully Curated</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up-delay">
          From heritage palaces in Rajasthan to beachfront villas in Goa — handpicked stays at every price point.
        </p>

        <div className="max-w-5xl mx-auto bg-card/95 backdrop-blur-md rounded-2xl p-3 shadow-card-hover animate-fade-in-up-delay-2 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <MapPin className="h-5 w-5 text-accent shrink-0" />
              <div className="text-left flex-1">
                <p className="text-xs text-muted-foreground">Destination</p>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Where to?"
                  className="bg-transparent text-sm font-medium text-foreground outline-none w-full placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted text-left hover:bg-muted/80 transition-colors">
                  <CalendarIcon className="h-5 w-5 text-accent shrink-0" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground">Check In</p>
                    <p className={cn("text-sm font-medium", checkIn ? "text-foreground" : "text-muted-foreground")}>
                      {checkIn ? format(checkIn, "PP") : "Add dates"}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <Users className="h-5 w-5 text-accent shrink-0" />
              <div className="text-left flex-1">
                <p className="text-xs text-muted-foreground">Adults</p>
                <input type="number" min={1} max={20} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} className="bg-transparent text-sm font-medium text-foreground outline-none w-full" />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <Users className="h-5 w-5 text-accent shrink-0" />
              <div className="text-left flex-1">
                <p className="text-xs text-muted-foreground">Children</p>
                <input type="number" min={0} max={20} value={children} onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))} className="bg-transparent text-sm font-medium text-foreground outline-none w-full" />
              </div>
            </div>

            <Button onClick={handleSearch} className="bg-accent text-accent-foreground hover:bg-accent/90 h-full rounded-xl text-base font-semibold shadow-gold gap-2">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>

          <div className="px-4 py-3 rounded-xl bg-muted text-left">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Price per night</p>
              <p className="text-xs font-semibold text-foreground">
                ₹{priceRange[0].toLocaleString("en-IN")} – ₹{priceRange[1].toLocaleString("en-IN")}
              </p>
            </div>
            <Slider
              value={priceRange}
              min={1000}
              max={50000}
              step={500}
              onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-10 text-primary-foreground/60 text-sm animate-fade-in-up-delay-2">
          <div><span className="text-accent font-bold text-lg">10K+</span> Hotels</div>
          <div className="w-px h-4 bg-primary-foreground/20" />
          <div><span className="text-accent font-bold text-lg">50K+</span> Happy Guests</div>
          <div className="w-px h-4 bg-primary-foreground/20" />
          <div><span className="text-accent font-bold text-lg">98%</span> Match Rate</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
