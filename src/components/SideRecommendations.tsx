import { Star, MapPin, Sparkles } from "lucide-react";
import recShimla from "@/assets/rec-shimla.asset.json";
import recKayak from "@/assets/rec-kayak.asset.json";

const recs = [
  {
    name: "Snow Valley Resort",
    location: "Shimla, Himachal Pradesh",
    price: 2400,
    original: 3600,
    rating: 4.7,
    reviews: 1284,
    image: recShimla.url,
    tag: "Mountain View",
  },
  {
    name: "Radisson Jass Heritage",
    location: "Tirumala, Andhra Pradesh",
    price: 3100,
    original: 4500,
    rating: 4.8,
    reviews: 982,
    image: recKayak.url,
    tag: "Heritage Stay",
  },
];

const SideRecommendations = () => {
  return (
    <aside className="bg-card rounded-2xl p-4 shadow-card sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="font-heading text-base font-bold text-foreground">Top Picks for You</h3>
      </div>
      <div className="space-y-4">
        {recs.map((r) => (
          <article key={r.name} className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden mb-2 aspect-[4/3]">
              <img src={r.image} alt={`${r.name} in ${r.location}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {r.tag}
              </span>
              <span className="absolute top-2 right-2 bg-background/90 backdrop-blur text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-accent text-accent" />
                {r.rating}
              </span>
            </div>
            <h4 className="font-heading text-sm font-semibold text-foreground line-clamp-1">{r.name}</h4>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {r.location}
            </p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-sm font-bold text-foreground">₹{r.price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-muted-foreground line-through">₹{r.original.toLocaleString("en-IN")}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                -{Math.round(((r.original - r.price) / r.original) * 100)}%
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{r.reviews} reviews</p>
          </article>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-4 text-center border-t border-border pt-3">
        Handpicked stays based on guest favourites
      </p>
    </aside>
  );
};

export default SideRecommendations;
