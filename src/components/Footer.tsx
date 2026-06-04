import { Sparkles, Phone, Mail, MapPin, MessageCircle, Star, ShieldCheck, Award } from "lucide-react";

const reviews = [
  { name: "Ananya R.", city: "Mumbai", stars: 5, text: "Booked the Udaipur palace stay — exactly like the photos. Spotless rooms and amazing breakfast." },
  { name: "Rahul K.", city: "Bengaluru", stars: 5, text: "Great filters and price slider. Found a 3★ in Coorg for ₹2,800 with free cancellation. Smooth checkout." },
  { name: "Priya S.", city: "Delhi", stars: 4, text: "Used LuxeStay for our anniversary in Goa. The birthday-parties tag was a lifesaver — staff arranged everything." },
];

const helpTopics = [
  "How to modify or cancel a booking",
  "Refund timelines & policies",
  "Adding extra guests (adults / children)",
  "Pet-friendly stays & accessibility",
  "Group bookings (10+ rooms)",
  "Special requests at check-in",
];

const licenses = [
  { code: "IATA-IN-43187", label: "IATA Accredited Agency" },
  { code: "MOT/IN/2024/HTLBKR/9921", label: "Ministry of Tourism — Approved Hotel Aggregator" },
  { code: "GSTIN 29ABCDE1234F1Z5", label: "Goods & Services Tax Registered" },
  { code: "FSSAI 10024033008891", label: "FSSAI Licensed (in-room dining)" },
];

const Footer = () => (
  <footer id="about" className="bg-primary py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* About Us */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-heading text-lg font-bold text-primary-foreground">LuxeStay</span>
          </div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-2">About Us</h4>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-3">
            LuxeStay is an India-first hotel booking platform launched in 2022. We list 10,000+ verified
            properties — from ₹1,000 hostels to ₹50,000 palace suites — across 45+ Indian cities.
          </p>
          <p className="text-primary-foreground/60 text-xs leading-relaxed">
            Every hotel on LuxeStay is personally inspected by our city teams in Mumbai, Delhi, Bengaluru,
            Jaipur and Kochi for cleanliness, safety and honest pricing.
          </p>
        </div>

        {/* Reviews */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">What Guests Say</h4>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.name} className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/80 text-xs leading-snug mb-1">"{r.text}"</p>
                <p className="text-primary-foreground/50 text-[10px]">— {r.name}, {r.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Help Center */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-accent" /> Help Center
          </h4>
          <ul className="space-y-2 mb-4">
            {helpTopics.map((t) => (
              <li key={t}>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs">
                  • {t}
                </a>
              </li>
            ))}
          </ul>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <p className="text-accent text-xs font-semibold mb-1">24×7 Support</p>
            <p className="text-primary-foreground/70 text-[11px]">Average response time: under 4 minutes via live chat.</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-primary-foreground/80">
              <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary-foreground">+91 1800-123-4567</p>
                <p className="text-[11px] text-primary-foreground/60">Toll-free, 24×7 (India)</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-primary-foreground/80">
              <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary-foreground">+91 80-4567-8900</p>
                <p className="text-[11px] text-primary-foreground/60">International callers</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-primary-foreground/80">
              <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary-foreground">support@luxestay.in</p>
                <p className="text-[11px] text-primary-foreground/60">Replies within 2 hours</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-primary-foreground/80">
              <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-primary-foreground/80 text-xs">LuxeStay HQ, 4th Floor, Prestige Atrium,<br />Mahatma Gandhi Road, Bengaluru 560001</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Licenses */}
      <div className="border-t border-primary-foreground/10 pt-8 mb-8">
        <h4 className="font-heading font-semibold text-primary-foreground mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" /> Licenses & Certifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {licenses.map((l) => (
            <div key={l.code} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-3 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-primary-foreground text-xs font-semibold">{l.label}</p>
                <p className="text-primary-foreground/50 text-[10px] font-mono">{l.code}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center text-primary-foreground/40 text-xs">
        © 2026 LuxeStay Travel Pvt. Ltd. All rights reserved. Made with care in India.
      </div>
    </div>
  </footer>
);

export default Footer;
