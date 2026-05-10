import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import AIRecommendations from "@/components/AIRecommendations";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onSearch={setSearchQuery} />
      <FeaturedHotels searchQuery={searchQuery} />
      <AIRecommendations />
      <Footer />
    </div>
  );
};

export default Index;
