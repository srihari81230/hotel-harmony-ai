import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import AIRecommendations from "@/components/AIRecommendations";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturedHotels />
    <AIRecommendations />
    <Footer />
  </div>
);

export default Index;
