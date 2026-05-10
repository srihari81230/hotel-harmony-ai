import { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-hotel.jpg";

interface Props {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: Props) => {
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(2);

  const handleSearch = () => {
    onSearch(destination.trim());
    toast({
      title: "Searching hotels",
      description: `${destination.trim() || "All destinations"}${checkIn ? ` • ${format(checkIn, "PP")}` : ""} • ${guests} guest${guests > 1 ? "s" : ""}`,
    });
    setTimeout(() => {
      document.getElementById("hotels")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury hotel lobby" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 text-center">
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
          AI-Powered Hotel Recommendations
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up leading-tight">
          Your Perfect Stay,{" "}
          <span className="text-gradient-gold">Intelligently Curated</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up-delay">
          Our AI analyzes your preferences, reviews, and travel patterns to find your ideal hotel — every time.
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md rounded-2xl p-3 shadow-card-hover animate-fade-in-up-delay-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
              <Users className="h-5 w-5 text-accent shrink-0" />
              <div className="text-left flex-1">
                <p className="text-xs text-muted-foreground">Guests</p>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                  className="bg-transparent text-sm font-medium text-foreground outline-none w-full placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="bg-accent text-accent-foreground hover:bg-accent/90 h-full rounded-xl text-base font-semibold shadow-gold gap-2">
              <Search className="h-5 w-5" />
              Search
            </Button>
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
