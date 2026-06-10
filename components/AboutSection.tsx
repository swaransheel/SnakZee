"use client";

import Image from "next/image";
import { Heart, ShieldCheck, Sparkles, Award, Hand, Leaf } from "lucide-react";
import { SiteSettingsData } from "../lib/sanity.client";

interface AboutSectionProps {
  siteSettings: SiteSettingsData | null;
}

export default function AboutSection({ siteSettings }: AboutSectionProps) {
  const features = [
    {
      title: "Homemade",
      telugu: "ఇంటి రుచి",
      icon: <Hand className="w-5 h-5 text-primary" />,
      desc: "Authentic recipes from grandmother's kitchen"
    },
    {
      title: "Hygienic",
      telugu: "శుచి",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      desc: "Prepared with extreme care and hygiene"
    },
    {
      title: "Fresh",
      telugu: "తాజా",
      icon: <Leaf className="w-5 h-5 text-primary" />,
      desc: "Made in small batches for peak flavor"
    },
    {
      title: "Traditional",
      telugu: "సంప్రదాయ",
      icon: <Award className="w-5 h-5 text-primary" />,
      desc: "Stone-ground masalas, age-old aging"
    },
    {
      title: "Preservative Free",
      telugu: "రసాయన రహిత",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      desc: "Zero chemical agents or artificial colors"
    },
    {
      title: "Made with Love",
      telugu: "ప్రేమతో",
      icon: <Heart className="w-5 h-5 text-primary" />,
      desc: "Handcrafted with warmth and affection"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-sm font-semibold tracking-wider text-accent uppercase mb-2">
            ~ Our Story ~
          </div>
          <h2 className="font-telugu text-4xl font-bold text-primary mb-2">
            మన ఇంటి రుచులు
          </h2>
          <p className="font-display text-2xl italic text-primary">
            The Taste of Our Home
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
            <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="relative border-4 border-accent rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={siteSettings?.aboutImage || "https://images.unsplash.com/photo-1610508500445-a4592435e27e"}
                alt="Traditional Telugu cooking process"
                width={440}
                height={330}
                style={{ height: "auto" }}
                className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Overlay floating badge */}
            <div className="absolute -top-6 -right-6 bg-secondary text-primary border-4 border-primary rounded-full p-4 shadow-lg animate-wiggle">
              <Heart className="w-8 h-8 fill-current text-primary" />
            </div>
          </div>

          {/* Description & Feature Grid */}
          <div className="space-y-6">
            <p className="text-lg text-primary leading-relaxed font-light">
              {siteSettings?.aboutTextEnglish || "Our recipes are inspired by generations of culinary traditions from Telugu households. Every single jar of pickle, packet of masala, sweet, and crunchy snack is handcrafted with utmost care, preserving the authentic taste of Andhra and Telangana heritage."}
            </p>
            <p className="font-telugu text-xl italic text-primary/80 font-medium border-l-4 border-accent pl-4">
              {siteSettings?.aboutTextTelugu || "ప్రేమతో తయారు చేసిన ప్రతి రుచి మీ ఇంటి రుచిలా ఉంటుంది."}
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat, index) => (
                <div
                  key={index}
                  className="bg-card border-2 border-accent/30 rounded-xl p-4 flex items-center gap-3 hover:-translate-y-1 transition-all shadow-[0_4px_0_hsla(var(--primary)/0.1),0_8px_24px_rgba(122,31,31,0.04)]"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm leading-tight">
                      {feat.title}
                    </h4>
                    <span className="font-telugu text-xs text-muted-foreground block mt-0.5">
                      {feat.telugu}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
