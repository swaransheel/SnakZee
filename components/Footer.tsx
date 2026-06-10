"use client";

import Image from "next/image";

interface FooterProps {
  onSelectCategory: (key: string) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#5C1616] to-[#3B0E0E] text-primary-foreground pt-16 mt-auto">
      <div className="container mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Image
              src="/snakzee-logo.png"
              alt="Snakzee Logo"
              width={48}
              height={48}
              className="h-12 w-auto object-contain brightness-125 filter drop-shadow-md cursor-pointer"
              onClick={() => scrollToSection("hero")}
            />
            <p className="text-sm text-primary-foreground/85 leading-relaxed font-light">
              Authentic homemade Telugu snacks, pickles, masalas and sweets made with traditional family recipes passed down through generations.
            </p>
            <p className="font-telugu text-sm text-primary-foreground/60">
              ప్రేమతో తయారు చేసిన తెలుగు రుచులు
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F1C40F] font-bold text-lg mb-4 select-none">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium text-primary-foreground/80">
              <li>
                <button onClick={() => scrollToSection("hero")} className="hover:text-[#F1C40F] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("shop")} className="hover:text-[#F1C40F] transition-colors">
                  Shop Store
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("categories")} className="hover:text-[#F1C40F] transition-colors">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-[#F1C40F] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-[#F1C40F] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories directory */}
          <div>
            <h4 className="text-[#F1C40F] font-bold text-lg mb-4 select-none">Categories</h4>
            <ul className="space-y-2.5 text-sm font-medium text-primary-foreground/80">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("pickles");
                    scrollToSection("shop");
                  }}
                  className="hover:text-[#F1C40F] transition-colors"
                >
                  Pickles (పచ్చళ్ళు)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("masalas");
                    scrollToSection("shop");
                  }}
                  className="hover:text-[#F1C40F] transition-colors"
                >
                  Masalas (మసాలాలు)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("sweets");
                    scrollToSection("shop");
                  }}
                  className="hover:text-[#F1C40F] transition-colors"
                >
                  Sweets (స్వీట్స్)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("snacks");
                    scrollToSection("shop");
                  }}
                  className="hover:text-[#F1C40F] transition-colors"
                >
                  Snacks (స్నాక్స్)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Admin */}
          <div className="space-y-4">
            <h4 className="text-[#F1C40F] font-bold text-lg mb-4 select-none">Get In Touch</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80 font-medium">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 88975 86142</span>
              </li>
              <li className="flex items-center gap-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                  alt="WhatsApp Logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span>WhatsApp Orders</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright banner */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-xs text-primary-foreground/60 space-y-1">
          <p>&copy; {new Date().getFullYear()} Snakzee — Art of Authentic Snacking. All rights reserved.</p>
          <p className="font-telugu">స్నాక్జీ — సంప్రదాయ రుచుల కళ</p>
        </div>
      </div>

      {/* Temple Border Bottom Accent */}
      <div className="h-2.5 temple-border-bottom bg-repeat-x w-full"></div>
    </footer>
  );
}
