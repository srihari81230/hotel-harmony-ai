import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check, CalendarIcon, ShieldCheck, Clock, Waves, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { foodMenu, type Hotel } from "@/data/hotels";
import { useToast } from "@/hooks/use-toast";

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
}

const cuisines = ["North Indian", "South Indian", "Chinese", "Italian"] as const;

const HotelDetailModal = ({ hotel, onClose }: Props) => {
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [activeCuisine, setActiveCuisine] = useState<typeof cuisines[number]>("North Indian");

  if (!hotel) return null;

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const total = nights * hotel.price;

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast({ title: "Select your dates", description: "Please choose check-in and check-out.", variant: "destructive" });
      return;
    }
    if (checkOut <= checkIn) {
      toast({ title: "Invalid dates", description: "Check-out must be after check-in.", variant: "destructive" });
      return;
    }
    toast({
      title: "Booking Confirmed! 🎉",
      description: `${hotel.name} • ${format(checkIn, "PPP")} → ${format(checkOut, "PPP")} • ${nights} night${nights > 1 ? "s" : ""} • ${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""} • Total ₹${total.toLocaleString("en-IN")}`,
    });
    setCheckIn(undefined); setCheckOut(undefined); setAdults(2); setChildren(0);
    onClose();
  };

  const filteredFood = foodMenu
    .filter((f) => f.cuisine === activeCuisine)
    .filter((f) => vegFilter === "all" || (vegFilter === "veg" ? f.veg : !f.veg));

  const subs = hotel.subRatings;
  const ratingRows = [
    { label: "Cleanliness", value: subs.cleanliness },
    { label: "Room comfort & quality", value: subs.roomComfort },
    { label: "Service Facilities", value: subs.service },
    { label: "Location", value: subs.location },
    { label: "Value for money", value: subs.valueForMoney },
  ];

  return (
    <Dialog open={!!hotel} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
          {/* LEFT: Food menu */}
          <aside className="bg-muted/40 border-r border-border p-4 space-y-3">
            <h4 className="font-heading font-semibold text-foreground">In-room Dining</h4>
            <div className="flex gap-1.5">
              {(["all", "veg", "nonveg"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVegFilter(v)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium transition-colors",
                    vegFilter === v ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-card/80"
                  )}
                >
                  {v === "all" ? "All" : v === "veg" ? "Veg" : "Non-Veg"}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {cuisines.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCuisine(c)}
                  className={cn(
                    "text-[11px] px-2 py-1 rounded-md font-medium transition-colors",
                    activeCuisine === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-card/80"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredFood.map((f) => (
                <div key={f.name} className="flex gap-2 bg-card rounded-lg p-2 shadow-sm">
                  <img src={f.image} alt={f.name} className="w-14 h-14 rounded-md object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("inline-block w-3 h-3 border", f.veg ? "border-emerald-600" : "border-red-600")}>
                        <span className={cn("block w-1.5 h-1.5 rounded-full m-[2px]", f.veg ? "bg-emerald-600" : "bg-red-600")} />
                      </span>
                      <p className="text-xs font-semibold text-card-foreground truncate">{f.name}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{f.cuisine}</p>
                    <p className="text-xs font-semibold text-accent">₹{f.price}</p>
                  </div>
                </div>
              ))}
              {filteredFood.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No items match this filter.</p>
              )}
            </div>
          </aside>

          {/* RIGHT: Hotel detail */}
          <div>
            <div className="relative h-56">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <Badge className="bg-accent text-accent-foreground border-0 mb-2">{hotel.category}</Badge>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading text-primary-foreground">{hotel.name}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-muted-foreground text-sm">({hotel.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {hotel.freeCancellation && (
                  <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> Free cancellation</Badge>
                )}
                {hotel.support24x7 && (
                  <Badge className="gap-1 bg-accent text-accent-foreground"><Clock className="h-3 w-3" /> 24×7 service — rare!</Badge>
                )}
                {hotel.freeSwimmingPool && (
                  <Badge variant="secondary" className="gap-1"><Waves className="h-3 w-3" /> Free swimming pool</Badge>
                )}
                {hotel.birthdayParties && (
                  <Badge variant="secondary" className="gap-1"><PartyPopper className="h-3 w-3" /> Birthday parties available</Badge>
                )}
                {hotel.discount && (
                  <Badge className="bg-destructive text-destructive-foreground">-{hotel.discount}% OFF</Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>

              <div>
                <h4 className="font-heading font-semibold text-foreground mb-3">Guest Ratings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ratingRows.map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-44">{r.label}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${(r.value / 10) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-10 text-right">{r.value.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-foreground mb-3">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {hotel.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-border">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Check In</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PP") : "Pick"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Check Out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PP") : "Pick"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(d) => d <= (checkIn ?? new Date(new Date().setHours(0, 0, 0, 0)))} initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Adults</Label>
                  <Input type="number" min={1} max={20} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Children</Label>
                  <Input type="number" min={0} max={20} value={children} onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  {hotel.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">₹{hotel.originalPrice.toLocaleString("en-IN")}</div>
                  )}
                  <span className="text-3xl font-bold text-foreground">₹{hotel.price.toLocaleString("en-IN")}</span>
                  <span className="text-muted-foreground"> / night</span>
                  {nights > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Total: <span className="font-semibold text-foreground">₹{total.toLocaleString("en-IN")}</span> for {nights} night{nights > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <Button onClick={handleBook} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold px-8 py-3 text-base">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelDetailModal;
