import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection, { type SearchFilters } from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import Footer from "@/components/Footer";

const Index = () => {
  const [filters, setFilters] = useState<SearchFilters>({ query: "", priceRange: [300, 15000] });

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onSearch={setFilters} />
      <FeaturedHotels searchQuery={filters.query} priceRange={filters.priceRange} />
      <Footer />
    </div>
  );
};

export default Index;
