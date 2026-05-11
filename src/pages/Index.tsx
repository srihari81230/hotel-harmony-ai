import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection, { type SearchFilters } from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import AIRecommendations from "@/components/AIRecommendations";
import Footer from "@/components/Footer";

const Index = () => {
  const [filters, setFilters] = useState<SearchFilters>({ query: "", priceRange: [1000, 50000] });

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onSearch={setFilters} />
      <FeaturedHotels searchQuery={filters.query} priceRange={filters.priceRange} />
      <AIRecommendations />
      <Footer />
    </div>
  );
};

export default Index;
