"use client";

import Image from "next/image";
import { Sparkles, MapPin, Star, Quote } from "lucide-react";
import { Testimonial } from "../lib/mockData";



interface ContactSectionProps {
  testimonials: Testimonial[];
  onCallClick: () => void;
  onWhatsAppClick: () => void;
}

export default function ContactSection({
  testimonials,
  onCallClick,
  onWhatsAppClick
}: ContactSectionProps) {
  return (
    <div className="w-full">
      {/* ═══════════════════════ TESTIMONIALS SECTION ═══════════════════════ */}
      <section id="testimonials" className="py-20 relative bg-card/60">
        {/* Background muggu pattern overlay */}
        <div className="absolute inset-0 muggu-pattern opacity-5 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-sm font-semibold tracking-wider text-accent uppercase mb-2">
              ~ Testimonials ~
            </div>
            <h2 className="font-telugu text-4xl font-bold text-primary mb-2">
              కస్టమర్ల ప్రశంసలు
            </h2>
            <p className="font-display text-2xl italic text-primary">
              From Our Family of Customers
            </p>

            <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
              <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="hand-card p-6 flex flex-col justify-between bg-card relative">
                <div>
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent mb-4">
                    <Quote className="w-5 h-5 fill-current text-accent" />
                  </div>

                  {/* Star Ratings */}
                  <div className="flex justify-start gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? "text-accent fill-current" : "text-muted opacity-50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-primary italic leading-relaxed text-sm sm:text-base text-left">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-accent/20 pt-4 mt-6 text-left">
                  <h4 className="font-semibold text-primary text-sm sm:text-base leading-tight">
                    — {t.name}{" "}
                    <span className="font-telugu text-xs text-muted-foreground block sm:inline font-normal ml-1">
                      ({t.telugu})
                    </span>
                  </h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ INSTAGRAM GALLERY SECTION ═══════════════════════ */}
      <section className="relative py-12 bg-background overflow-hidden border-t border-accent/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative group rounded-2xl overflow-hidden shadow-xl border-4 border-accent max-w-5xl mx-auto">
            {/* Horizontal Grid of 4 Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-accent/30">
              <div className="h-44 sm:h-56 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1610508500445-a4592435e27e"
                  alt="Instagram Snack 1"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover filter brightness-95"
                />
              </div>
              <div className="h-44 sm:h-56 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1635952346904-95f2ccfcd029"
                  alt="Instagram Snack 2"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover filter brightness-95"
                />
              </div>
              <div className="h-44 sm:h-56 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1591272216626-b09e38519371"
                  alt="Instagram Snack 3"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover filter brightness-95"
                />
              </div>
              <div className="h-44 sm:h-56 overflow-hidden relative">
                <Image
                  src="https://images.pexels.com/photos/11584813/pexels-photo-11584813.jpeg"
                  alt="Instagram Snack 4"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover filter brightness-95"
                />
              </div>
            </div>

            {/* Centered Overlay Follow Button */}
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
              <a
                href="https://instagram.com/snak_zee"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-traditional text-sm sm:text-base py-3 px-6 sm:px-8 rounded-xl flex items-center gap-2 shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-accent"
              >
                <Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram Logo" width={20} height={20} className="w-5 h-5 object-contain brightness-0 invert" />
                Follow Us on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CONTACT SECTION ═══════════════════════ */}
      <section id="contact" className="py-20 relative bg-background border-t border-accent/20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-sm font-semibold tracking-wider text-accent uppercase mb-2">
              ~ Contact ~
            </div>
            <h2 className="font-telugu text-4xl font-bold text-primary mb-2">
              మాతో మాట్లాడండి
            </h2>
            <p className="font-display text-2xl italic text-primary">
              Get in Touch
            </p>

            <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
              <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* WhatsApp Card */}
            <div
              onClick={onWhatsAppClick}
              className="hand-card p-8 text-center cursor-pointer group hover:-translate-y-1 bg-card"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Image src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp Logo" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <h3 className="font-bold text-primary text-lg">WhatsApp</h3>
              <p className="text-[#128C7E] font-semibold mt-1">+91 88975 86142</p>
              <span className="font-telugu text-xs text-muted-foreground block mt-1">
                వాట్సాప్ చేయండి
              </span>
            </div>

            {/* Instagram Card */}
            <div
              onClick={() => window.open("https://instagram.com/snak_zee", "_blank")}
              className="hand-card p-8 text-center cursor-pointer group hover:-translate-y-1 bg-card"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram Logo" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <h3 className="font-bold text-primary text-lg">DM on Instagram</h3>
              <p className="text-primary font-semibold mt-1">@snak_zee</p>
              <span className="font-telugu text-xs text-muted-foreground block mt-1">
                ఇన్‌స్టాగ్రామ్‌లో సందేశం పంపండి
              </span>
            </div>

            {/* Fresh Daily Card */}
            <div className="hand-card p-8 text-center hover:-translate-y-1 bg-card">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <h3 className="font-bold text-primary text-lg">Fresh Daily</h3>
              <p className="text-primary font-semibold mt-1">Orders prepared fresh every day</p>
              <span className="font-telugu text-xs text-muted-foreground block mt-1">
                ప్రతిరోజు తాజా ఆహారం
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
