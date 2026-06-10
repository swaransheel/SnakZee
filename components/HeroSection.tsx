"use client";

import Image from "next/image";
import { Sparkles, Store } from "lucide-react";

interface HeroSectionProps {
  onShopClick: () => void;
  onWhatsAppClick: () => void;
}

export default function HeroSection({ onShopClick, onWhatsAppClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[85vh] flex items-center justify-center py-20">
      {/* Background Image & Warm Red Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/7812134/pexels-photo-7812134.jpeg"
          alt="Traditional Telugu Kitchen background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90"></div>
        <div className="absolute inset-0 muggu-pattern opacity-15"></div>
      </div>

      {/* Floating Leaves (Mango Leaf SVGs) */}
      <svg className="absolute top-10 left-10 text-[#2E6F25] opacity-75 w-16 h-16 animate-float-slow z-10 pointer-events-none" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 Q50 25 30 55 Q10 25 30 5 Z" fill="currentColor"></path>
        <path d="M30 5 L30 55" stroke="#1d4817" strokeWidth="1.5"></path>
      </svg>
      <svg className="absolute top-32 right-16 text-[#2E6F25] opacity-65 w-20 h-20 animate-float-slow z-10 pointer-events-none" style={{ animationDelay: "2s" }} viewBox="0 0 60 60" fill="none">
        <path d="M30 5 Q50 25 30 55 Q10 25 30 5 Z" fill="currentColor"></path>
        <path d="M30 5 L30 55" stroke="#1d4817" strokeWidth="1.5"></path>
      </svg>
      <svg className="absolute bottom-12 left-1/4 text-[#2E6F25] opacity-55 w-12 h-12 animate-float-slow z-10 pointer-events-none" style={{ animationDelay: "4s" }} viewBox="0 0 60 60" fill="none">
        <path d="M30 5 Q50 25 30 55 Q10 25 30 5 Z" fill="currentColor"></path>
        <path d="M30 5 L30 55" stroke="#1d4817" strokeWidth="1.5"></path>
      </svg>

      {/* Rotating Rangoli / Mandala Designs */}
      <svg className="absolute bottom-10 right-10 text-secondary/40 w-32 h-32 animate-spin-slow z-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="50" cy="50" r="6"></circle>
          <circle cx="50" cy="50" r="18"></circle>
          <circle cx="50" cy="50" r="30"></circle>
          <path d="M50 14 Q56 32 50 50 Q44 32 50 14 Z"></path>
          <path d="M86 50 Q68 56 50 50 Q68 44 86 50 Z"></path>
          <path d="M50 86 Q44 68 50 50 Q56 68 50 86 Z"></path>
          <path d="M14 50 Q32 44 50 50 Q32 56 14 50 Z"></path>
        </g>
      </svg>

      {/* Hero Content Container */}
      <div className="container mx-auto px-4 relative z-20 text-center text-background max-w-4xl">
        <div className="animate-fadeInUp space-y-6">
          {/* Logo Badge */}
          <div className="inline-block bg-background/95 rounded-3xl p-4 mb-4 border-4 border-accent shadow-xl">
            <Image src="/snakzee-logo.png" alt="Snakzee Logo" width={96} height={96} className="h-20 sm:h-24 w-auto object-contain mx-auto" />
          </div>

          {/* Welcome Badge */}
          <div>
            <div className="inline-block bg-secondary/90 text-primary border-2 border-accent px-6 py-2 rounded-full font-semibold text-sm sm:text-base shadow-md">
              <span className="font-telugu mr-1.5">స్వాగతం</span> • Welcome to Snakzee
            </div>
          </div>

          {/* Titles */}
          <h1 className="font-telugu text-4xl sm:text-6xl md:text-7xl font-bold text-secondary tracking-wide drop-shadow-[0_2px_4px_rgba(212,160,23,0.3)]">
            తెలుగు సంప్రదాయ రుచులు
          </h1>
          <h2 className="font-display text-2xl sm:text-4xl italic text-background font-semibold">
            Authentic Homemade Snacks
          </h2>
          <p className="text-accent text-lg sm:text-xl font-medium tracking-widest">
            ✦ Crafted with Love ✦
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-background/90 font-light leading-relaxed">
            From a Telugu grandmother&apos;s kitchen to your table — pickles, masalas, sweets and snacks made the exact traditional way using fresh, handpicked local ingredients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={onShopClick}
              className="btn-traditional text-base py-3.5 px-8 flex items-center gap-2"
            >
              <Store className="w-5 h-5" />
              Shop Now
            </button>
            <button
              onClick={onWhatsAppClick}
              className="btn-whatsapp text-base py-3.5 px-8 flex items-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-primary via-secondary to-primary z-10"></div>
    </section>
  );
}
