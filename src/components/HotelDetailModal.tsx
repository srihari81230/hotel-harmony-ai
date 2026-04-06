import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@/data/hotels";
import { useToast } from "@/hooks/use-toast";

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
}

const HotelDetailModal = ({ hotel, onClose }: Props) => {
  const { toast } = useToast();

  if (!hotel) return null;

  const handleBook = () => {
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your reservation at ${hotel.name} has been saved. Check your email for details.`,
    });
    onClose();
  };

  return (
    <Dialog open={!!hotel} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
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

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-3xl font-bold text-foreground">${hotel.price}</span>
              <span className="text-muted-foreground"> / night</span>
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
