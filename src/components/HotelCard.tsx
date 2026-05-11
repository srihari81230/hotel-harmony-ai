import { Star, MapPin, Heart, ShieldCheck, Clock, Waves, Dumbbell, Snowflake, Coffee, PartyPopper } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@/data/hotels";

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

const HotelCard = ({ hotel, onSelect }: HotelCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={() => onSelect(hotel)}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={800}
          height={600}
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
            aria-label="Save hotel"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge className="bg-accent text-accent-foreground border-0 text-xs">{hotel.category}</Badge>
          {hotel.discount && (
            <Badge className="bg-destructive text-destructive-foreground border-0 text-xs">-{hotel.discount}% OFF</Badge>
          )}
        </div>
        {hotel.matchScore && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-primary text-primary-foreground border-0 text-xs gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              {hotel.matchScore}% Match
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <div>
            <h3 className="font-heading text-lg font-semibold text-card-foreground">{hotel.name}</h3>
            <div className="flex items-center gap-0.5 mt-0.5">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-accent text-accent" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-card-foreground">{hotel.rating}</span>
            <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.location}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {hotel.freeCancellation && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Free cancellation
            </span>
          )}
          {hotel.support24x7 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> 24×7 service
            </span>
          )}
          {hotel.freeSwimmingPool && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 inline-flex items-center gap-1">
              <Waves className="h-3 w-3" /> Free pool
            </span>
          )}
          {hotel.breakfastIncluded && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 inline-flex items-center gap-1">
              <Coffee className="h-3 w-3" /> Breakfast
            </span>
          )}
          {hotel.acRooms && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1">
              <Snowflake className="h-3 w-3" /> AC
            </span>
          )}
          {hotel.gym && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1">
              <Dumbbell className="h-3 w-3" /> Gym
            </span>
          )}
          {hotel.birthdayParties && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-700 dark:text-pink-400 inline-flex items-center gap-1">
              <PartyPopper className="h-3 w-3" /> Birthday parties
            </span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            {hotel.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">₹{hotel.originalPrice.toLocaleString('en-IN')}</div>
            )}
            <span className="text-2xl font-bold text-card-foreground">₹{hotel.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <button className="text-sm font-semibold text-accent hover:underline">View Details →</button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
