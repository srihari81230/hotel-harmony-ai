import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingsSection from "@/components/BookingsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 pt-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Button>
        </div>
        <BookingsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Bookings;
