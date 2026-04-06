import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-heading text-lg font-bold text-primary-foreground">LuxeStay</span>
          </div>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            AI-powered hotel recommendations for the modern traveler. Find your perfect stay, every time.
          </p>
        </div>
        {[
          { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
          { title: "Support", links: ["Help Center", "Safety", "Cancellation", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors text-sm">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center text-primary-foreground/40 text-sm">
        © 2026 LuxeStay. All rights reserved. Powered by AI.
      </div>
    </div>
  </footer>
);

export default Footer;
