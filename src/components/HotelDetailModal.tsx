import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check, ShieldCheck, Clock, Waves, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { foodMenu, type Hotel } from "@/data/hotels";
import BookingDialog from "./BookingDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
}

const cuisines = ["North Indian", "South Indian", "Chinese", "Italian"] as const;

const HotelDetailModal = ({ hotel, onClose }: Props) => {
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [activeCuisine, setActiveCuisine] = useState<typeof cuisines[number]>("North Indian");
  const [activeImage, setActiveImage] = useState<number>(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleBookNow = () => {
    if (!user) {
      toast({ title: "Please sign in", description: "Sign in to book this stay." });
      onClose();
      navigate("/login");
      return;
    }
    setBookingOpen(true);
  };

  useEffect(() => { setActiveImage(0); setLightbox(null); setBookingOpen(false); }, [hotel?.id]);

  if (!hotel) return null;

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
    <>
    <Dialog open={!!hotel && !bookingOpen} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
          <aside className="bg-muted/40 border-r border-border p-4 space-y-3">
            <h4 className="font-heading font-semibold text-foreground">In-room Dining</h4>
            <div className="flex gap-1.5">
              {(["all", "veg", "nonveg"] as const).map((v) => (
                <button key={v} onClick={() => setVegFilter(v)} className={cn("text-xs px-2.5 py-1 rounded-full font-medium transition-colors", vegFilter === v ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-card/80")}>
                  {v === "all" ? "All" : v === "veg" ? "Veg" : "Non-Veg"}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {cuisines.map((c) => (
                <button key={c} onClick={() => setActiveCuisine(c)} className={cn("text-[11px] px-2 py-1 rounded-md font-medium transition-colors", activeCuisine === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-card/80")}>
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
            </div>
          </aside>

          <div>
            <div className="relative h-56">
              <img src={hotel.gallery?.[activeImage] ?? hotel.image} alt={hotel.name} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLightbox(hotel.gallery?.[activeImage] ?? hotel.image)} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
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

            {hotel.gallery && hotel.gallery.length > 1 && (
              <div className="px-6 pt-4">
                <h4 className="font-heading font-semibold text-foreground mb-2 text-sm">Room Views — click to view</h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {hotel.gallery.map((src, i) => {
                    const labels = ["Bedroom", "Suite View", "Lounge", "Bathroom", "Exterior", "Pool"];
                    const isActive = i === activeImage;
                    return (
                      <button type="button" key={src + i} onClick={() => { setActiveImage(i); setLightbox(src); }} className={cn("relative rounded-md overflow-hidden aspect-square group ring-offset-background focus:outline-none focus:ring-2 focus:ring-accent", isActive && "ring-2 ring-accent")}>
                        <img src={src} alt={`${hotel.name} ${labels[i] ?? "View"}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute bottom-0 left-0 right-0 bg-primary/70 text-primary-foreground text-[9px] text-center py-0.5">{labels[i] ?? "View"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {lightbox && (
              <div role="dialog" onClick={() => setLightbox(null)} className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in">
                <img src={lightbox} alt="Room view" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl">×</button>
              </div>
            )}

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /><span>{hotel.location}</span></div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-muted-foreground text-sm">({hotel.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {hotel.freeCancellation && <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> Free cancellation</Badge>}
                {hotel.support24x7 && <Badge className="gap-1 bg-accent text-accent-foreground"><Clock className="h-3 w-3" /> 24×7 service — rare!</Badge>}
                {hotel.freeSwimmingPool && <Badge variant="secondary" className="gap-1"><Waves className="h-3 w-3" /> Free swimming pool</Badge>}
                {hotel.birthdayParties && <Badge variant="secondary" className="gap-1"><PartyPopper className="h-3 w-3" /> Birthday parties available</Badge>}
                {hotel.discount && <Badge className="bg-destructive text-destructive-foreground">-{hotel.discount}% OFF</Badge>}
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
                    <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-accent" />{a}</div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  {hotel.originalPrice && <div className="text-sm text-muted-foreground line-through">₹{hotel.originalPrice.toLocaleString("en-IN")}</div>}
                  <span className="text-3xl font-bold text-foreground">₹{hotel.price.toLocaleString("en-IN")}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <Button onClick={handleBookNow} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold px-8 py-3 text-base">Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <BookingDialog hotel={hotel} open={bookingOpen} onClose={() => { setBookingOpen(false); onClose(); }} />
    </>
  );
};

export default HotelDetailModal;
