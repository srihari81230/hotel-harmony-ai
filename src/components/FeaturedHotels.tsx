import { useState } from "react";
import HotelCard from "./HotelCard";
import HotelDetailModal from "./HotelDetailModal";
import { hotels, categories, type Hotel } from "@/data/hotels";

interface Props {
  searchQuery?: string;
  priceRange?: [number, number];
}

const FeaturedHotels = ({ searchQuery = "", priceRange = [1000, 50000] }: Props) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const q = searchQuery.trim().toLowerCase();
  const filtered = hotels
    .filter((h) => activeCategory === "All" || h.category === activeCategory)
    .filter((h) => !q || h.location.toLowerCase().includes(q) || h.name.toLowerCase().includes(q))
    .filter((h) => h.price >= priceRange[0] && h.price <= priceRange[1])
    .sort((a, b) => a.price - b.price); // lowest first

  return (
    <section id="hotels" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Handpicked for You</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Hotels</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sorted by lowest price first — from cozy ₹1K stays to ₹50K luxury escapes across India.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-gold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6">{filtered.length} hotels found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onSelect={setSelectedHotel} />
          ))}
        </div>
      </div>

      <HotelDetailModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
    </section>
  );
};

export default FeaturedHotels;
