import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type NavLink = { label: string; to: string };

const links: NavLink[] = [
  { label: "Home", to: "/#home" },
  { label: "Hotels", to: "/#hotels" },
  { label: "Bookings", to: "/bookings" },
  { label: "Profile", to: "/profile" },
  { label: "About", to: "/#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="font-heading text-xl font-bold text-primary-foreground">LuxeStay</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <Link key={item.label} to={item.to} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="text-xs font-normal text-muted-foreground">Signed in as</div>
                  <div className="text-sm">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile"><User className="h-4 w-4 mr-2" /> My Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/bookings">My Bookings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive"><LogOut className="h-4 w-4 mr-2" /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 py-4 space-y-3">
          {links.map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setIsOpen(false)} className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium py-2">
              {item.label}
            </Link>
          ))}
          {user && (
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" /> Sign out ({user.name})
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
