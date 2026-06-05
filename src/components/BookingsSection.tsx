import { format } from "date-fns";
import { CalendarCheck, MapPin, Users, CreditCard, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const BookingsSection = () => {
  const { bookings } = useAuth();

  return (
    <section id="bookings" className="py-16 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Your Trips</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">My Bookings</h2>
          <p className="text-muted-foreground mt-2">All your confirmed stays in one place.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="max-w-md mx-auto text-center bg-card border border-border rounded-xl p-10">
            <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1">Pick a hotel above and complete a booking to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {bookings.map((b) => (
              <div key={b.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={b.hotelImage} alt={b.hotelName} className="w-full h-32 object-cover" loading="lazy" />
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold leading-tight">{b.hotelName}</h3>
                    <Badge variant="secondary" className="text-[10px] shrink-0">#{b.id.slice(0, 6).toUpperCase()}</Badge>
                  </div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {b.location}</p>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CalendarCheck className="h-3.5 w-3.5 text-accent" />
                    {format(new Date(b.checkIn), "PP")} → {format(new Date(b.checkOut), "PP")}
                    <span className="text-muted-foreground">({b.nights}n)</span>
                  </div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> {b.adults} adult{b.adults > 1 ? "s" : ""}{b.children ? `, ${b.children} child` : ""}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><CreditCard className="h-3 w-3" /> {b.paymentMethod}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">Total paid</span>
                    <span className="font-bold text-accent">₹{b.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingsSection;
