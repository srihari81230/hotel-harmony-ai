import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignInDialog from "./SignInDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="font-heading text-xl font-bold text-primary-foreground">LuxeStay</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Hotels", "Bookings", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={() => setSignInOpen(true)} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            Sign In
          </Button>
          <Button onClick={() => setSignInOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
            Get Started
          </Button>
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 py-4 space-y-3">
          {["Home", "Hotels", "Bookings", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium py-2">
              {item}
            </a>
          ))}
          <Button onClick={() => { setSignInOpen(true); setIsOpen(false); }} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Sign In
          </Button>
        </div>
      )}

      <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
    </nav>
  );
};

export default Navbar;
