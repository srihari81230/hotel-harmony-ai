import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CreditCard, Wallet, Banknote, Smartphone, Tag, CheckCircle2, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/data/hotels";
import { useAuth, type Booking } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import HotelChat from "./HotelChat";

interface Props {
  hotel: Hotel | null;
  open: boolean;
  onClose: () => void;
}

const PAYMENTS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI (GPay / PhonePe)", icon: Smartphone },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "cash", label: "Pay at Hotel", icon: Banknote },
] as const;

const COUPONS: Record<string, number> = {
  WELCOME10: 10, LUXE20: 20, BIRTHDAY15: 15, FIRST5: 5,
};

const BookingDialog = ({ hotel, open, onClose }: Props) => {
  const { addBooking } = useAuth();
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [payment, setPayment] = useState<string>("card");
  const [coupon, setCoupon] = useState("");
  const [appliedPct, setAppliedPct] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    if (open) {
      setCheckIn(undefined); setCheckOut(undefined); setAdults(2); setChildren(0);
      setPayment("card"); setCoupon(""); setAppliedPct(0); setAppliedCode(""); setConfirmed(null);
    }
  }, [open, hotel?.id]);

  if (!hotel) return null;

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000)) : 0;
  const subtotal = nights * hotel.price;
  const hotelDiscount = hotel.discount || 0;
  const totalDiscountPct = Math.min(60, hotelDiscount + appliedPct);
  const discountAmt = Math.round((subtotal * totalDiscountPct) / 100);
  const taxes = Math.round((subtotal - discountAmt) * 0.12);
  const total = subtotal - discountAmt + taxes;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedPct(COUPONS[code]); setAppliedCode(code);
      toast({ title: "Coupon applied 🎉", description: `${code} — extra ${COUPONS[code]}% off.` });
    } else {
      toast({ title: "Invalid code", description: "Try WELCOME10, LUXE20, BIRTHDAY15 or FIRST5.", variant: "destructive" });
    }
  };

  const confirm = () => {
    if (!checkIn || !checkOut) { toast({ title: "Select dates", description: "Pick check-in and check-out.", variant: "destructive" }); return; }
    if (checkOut <= checkIn) { toast({ title: "Invalid dates", description: "Check-out must be after check-in.", variant: "destructive" }); return; }
    const booking = addBooking({
      hotelId: hotel.id, hotelName: hotel.name, hotelImage: hotel.image, location: hotel.location,
      checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString(), nights, adults, children,
      pricePerNight: hotel.price, discount: discountAmt, total, paymentMethod: PAYMENTS.find(p => p.id === payment)?.label || payment,
    });
    setConfirmed(booking);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        {!confirmed ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading">Book {hotel.name}</DialogTitle>
              <DialogDescription>{hotel.location} • ₹{hotel.price.toLocaleString("en-IN")} / night</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Check In</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />{checkIn ? format(checkIn, "PP") : "Pick"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Check Out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />{checkOut ? format(checkOut, "PP") : "Pick"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(d) => d <= (checkIn ?? new Date(new Date().setHours(0,0,0,0)))} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Adults</Label>
                    <Input type="number" min={1} max={20} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Children</Label>
                    <Input type="number" min={0} max={20} value={children} onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))} />
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-2 block">Payment method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENTS.map((p) => {
                      const Icon = p.icon;
                      const active = payment === p.id;
                      return (
                        <button key={p.id} type="button" onClick={() => setPayment(p.id)} className={cn("flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors text-left", active ? "border-accent bg-accent/10 text-foreground" : "border-border bg-card hover:border-accent/50")}>
                          <Icon className="h-4 w-4 text-accent" />
                          <span className="font-medium">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-1.5 block">Discount code</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="WELCOME10" className="pl-9 uppercase" />
                    </div>
                    <Button type="button" variant="outline" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {appliedCode && <p className="text-xs text-emerald-600 mt-1">✓ {appliedCode} applied — extra {appliedPct}% off</p>}
                  <p className="text-[10px] text-muted-foreground mt-1">Try: WELCOME10, LUXE20, BIRTHDAY15, FIRST5</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4 border border-border space-y-2 text-sm">
                  <h4 className="font-heading font-semibold text-foreground mb-1">Price summary</h4>
                  <div className="flex justify-between"><span className="text-muted-foreground">₹{hotel.price.toLocaleString("en-IN")} × {nights || 0} night{nights === 1 ? "" : "s"}</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                  {hotelDiscount > 0 && <div className="flex justify-between text-emerald-600"><span>Hotel discount ({hotelDiscount}%)</span><span>included</span></div>}
                  {appliedPct > 0 && <div className="flex justify-between text-emerald-600"><span>Coupon ({appliedPct}%)</span><span>included</span></div>}
                  {discountAmt > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Total discount</span><span className="text-emerald-600">– ₹{discountAmt.toLocaleString("en-IN")}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Taxes & fees (12%)</span><span>₹{taxes.toLocaleString("en-IN")}</span></div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base"><span>Total</span><span className="text-accent">₹{total.toLocaleString("en-IN")}</span></div>
                </div>

                <HotelChat hotel={hotel} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">By booking you agree to our terms & cancellation policy.</p>
              <Button onClick={confirm} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold px-6">
                Confirm & Pay ₹{total.toLocaleString("en-IN")}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-9 w-9 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold flex items-center gap-2 justify-center">
                <PartyPopper className="h-6 w-6 text-accent" /> Congratulations!
              </h2>
              <p className="text-muted-foreground mt-1">Your booking is confirmed. A copy has been saved to your Bookings.</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 text-left max-w-md mx-auto text-sm space-y-1.5 border border-border">
              <div className="flex justify-between"><span className="text-muted-foreground">Hotel</span><span className="font-semibold">{confirmed.hotelName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span>{confirmed.location}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span>{format(new Date(confirmed.checkIn), "PP")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span>{format(new Date(confirmed.checkOut), "PP")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span>{confirmed.adults} adult{confirmed.adults > 1 ? "s" : ""}{confirmed.children ? `, ${confirmed.children} child` : ""}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>{confirmed.paymentMethod}</span></div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border"><span>Total paid</span><span className="text-accent">₹{confirmed.total.toLocaleString("en-IN")}</span></div>
              <Badge className="mt-2 bg-emerald-600 text-white">Booking ID: {confirmed.id.slice(0, 8).toUpperCase()}</Badge>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <Button variant="outline" onClick={() => { onClose(); window.location.href = "/bookings"; }}>View My Bookings</Button>
              <Button onClick={onClose} className="bg-accent text-accent-foreground hover:bg-accent/90">Done</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
