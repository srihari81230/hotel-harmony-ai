import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/data/hotels";
import { useToast } from "@/hooks/use-toast";

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
}

const HotelDetailModal = ({ hotel, onClose }: Props) => {
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(2);

  if (!hotel) return null;

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const total = nights * hotel.price;

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Select your dates",
        description: "Please choose check-in and check-out dates to continue.",
        variant: "destructive",
      });
      return;
    }
    if (checkOut <= checkIn) {
      toast({
        title: "Invalid dates",
        description: "Check-out must be after check-in.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Booking Confirmed! 🎉",
      description: `${hotel.name} • ${format(checkIn, "PPP")} → ${format(checkOut, "PPP")} • ${nights} night${nights > 1 ? "s" : ""} • ${guests} guest${guests > 1 ? "s" : ""} • Total ₹${total.toLocaleString("en-IN")}`,
    });
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests(2);
    onClose();
  };

  return (
    <Dialog open={!!hotel} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <Badge className="bg-accent text-accent-foreground border-0 mb-2">{hotel.category}</Badge>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-primary-foreground">{hotel.name}</DialogTitle>
            </DialogHeader>
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

          <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-border">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Check In</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PP") : "Pick a date"}
                  </Button>
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
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Check Out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(d) => d <= (checkIn ?? new Date(new Date().setHours(0, 0, 0, 0)))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Guests</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
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
      </DialogContent>
    </Dialog>
  );
};

export default HotelDetailModal;
