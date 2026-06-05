import { useEffect, useRef, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Hotel } from "@/data/hotels";

interface Msg { from: "you" | "hotel"; text: string; }

const faqReply = (q: string, hotel: Hotel): string => {
  const t = q.toLowerCase();
  if (/wifi|wi-fi|internet/.test(t)) return "Yes, complimentary high-speed Wi-Fi is available in all rooms and common areas.";
  if (/check.?in/.test(t)) return "Standard check-in is from 2:00 PM. Early check-in is subject to availability.";
  if (/check.?out/.test(t)) return "Check-out is by 12:00 noon. Late check-out can be arranged for a small fee.";
  if (/breakfast/.test(t)) return hotel.breakfastIncluded ? "Complimentary breakfast (buffet) is included in your stay, served 7–10 AM." : "Breakfast is available as an add-on for ₹450 per person.";
  if (/cancel|refund/.test(t)) return hotel.freeCancellation ? "Free cancellation is available up to 24 hours before check-in." : "Cancellations made 48 hours prior receive a 50% refund. Please review the policy at booking.";
  if (/parking|car/.test(t)) return "Yes, complimentary on-site parking is available for in-house guests.";
  if (/pet|dog|cat/.test(t)) return "We're sorry — only service animals are permitted at this property.";
  if (/pool|swim/.test(t)) return hotel.freeSwimmingPool ? "Our swimming pool is complimentary for guests, open 6 AM – 9 PM." : hotel.amenities.includes("Swimming Pool") ? "Pool access is ₹200/day per guest, open 6 AM – 9 PM." : "This property does not have a swimming pool.";
  if (/gym|fitness/.test(t)) return hotel.gym ? "Our 24×7 fitness centre is free for all in-house guests." : "Unfortunately we don't have an on-site gym, but partner gyms are nearby.";
  if (/ac|air.?con/.test(t)) return hotel.acRooms ? "All our rooms are fully air-conditioned." : "Rooms have ceiling fans and coolers — AC rooms are available on request.";
  if (/airport|pickup|cab|taxi/.test(t)) return "Airport pickup can be arranged at ₹1,200 (sedan). Share your flight details after booking.";
  if (/food|restaurant|menu|dining/.test(t)) return "Our multi-cuisine restaurant serves North Indian, South Indian, Chinese and Italian. In-room dining is 24×7.";
  if (/birthday|anniversary|party/.test(t)) return hotel.birthdayParties ? "Yes! We host birthday and anniversary celebrations — cake, decor and a photographer can be arranged." : "We can arrange a private cake & decor on request.";
  if (/location|address|where/.test(t)) return `We're located in ${hotel.location}. Detailed directions will be shared on your confirmation email.`;
  if (/price|cost|rate/.test(t)) return `Our base rate is ₹${hotel.price.toLocaleString("en-IN")} per night. Taxes & discounts are shown at checkout.`;
  if (/hi|hello|hey|namaste/.test(t)) return `Namaste! Welcome to ${hotel.name}. How can I help you today?`;
  return "Thanks for your message — our front-desk will follow up shortly. Meanwhile, feel free to ask about check-in, breakfast, Wi-Fi, parking or cancellation.";
};

const HotelChat = ({ hotel }: { hotel: Hotel }) => {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "hotel", text: `Namaste! 🙏 You're chatting with the front-desk at ${hotel.name}. Ask anything about your stay.` },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "you", text: q }]);
    setText("");
    setTimeout(() => setMsgs((m) => [...m, { from: "hotel", text: faqReply(q, hotel) }]), 500);
  };

  const quick = ["Check-in time?", "Is breakfast included?", "Wi-Fi available?", "Cancellation policy?"];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="bg-muted/60 px-3 py-2 flex items-center gap-2 border-b border-border">
        <MessageCircle className="h-4 w-4 text-accent" />
        <p className="text-sm font-semibold">Chat with {hotel.name}</p>
        <span className="ml-auto text-[10px] text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online</span>
      </div>
      <div className="h-44 overflow-y-auto p-3 space-y-2 bg-background/50">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] text-xs px-3 py-2 rounded-lg ${m.from === "you" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="px-3 py-1.5 flex flex-wrap gap-1 border-t border-border bg-muted/30">
        {quick.map((q) => (
          <button key={q} onClick={() => { setMsgs((m) => [...m, { from: "you", text: q }]); setTimeout(() => setMsgs((m) => [...m, { from: "hotel", text: faqReply(q, hotel) }]), 400); }} className="text-[10px] px-2 py-1 rounded-full bg-card border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
            {q}
          </button>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2 p-2 border-t border-border">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message…" className="h-9 text-sm" />
        <Button type="submit" size="icon" className="h-9 w-9 bg-accent text-accent-foreground hover:bg-accent/90"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
};

export default HotelChat;
