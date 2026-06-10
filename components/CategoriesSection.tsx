"use client";

import Image from "next/image";
import { Sparkles, Flame, Heart, Leaf } from "lucide-react";
import { SiteSettingsData } from "../lib/sanity.client";

interface CategoriesSectionProps {
  siteSettings: SiteSettingsData | null;
  onSelectCategory: (categoryKey: string) => void;
}

export default function CategoriesSection({ siteSettings, onSelectCategory }: CategoriesSectionProps) {
  const defaultList = [
    {
      key: "pickles",
      title: "Pickles",
      telugu: "పచ్చళ్ళు",
      img: "https://images.pexels.com/photos/11584813/pexels-photo-11584813.jpeg",
      desc: "Authentic, sun-aged, spicy pickles"
    },
    {
      key: "masalas",
      title: "Masalas",
      telugu: "మసాలాలు",
      img: "https://images.unsplash.com/photo-1591272216626-b09e38519371",
      desc: "Stone-ground, aromatic spice blends"
    },
    {
      key: "sweets",
      title: "Sweets",
      telugu: "స్వీట్స్",
      img: "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029",
      desc: "Pure ghee and jaggery delicacies"
    },
    {
      key: "snacks",
      title: "Snacks",
      telugu: "స్నాక్స్",
      img: "https://images.unsplash.com/photo-1683533678059-63c6a0e9e3ef",
      desc: "Crispy, crunchy tea-time crackers"
    }
  ];

  const list = defaultList.map((item) => {
    let imgOverride = item.img;
    if (siteSettings) {
      if (item.key === "pickles" && siteSettings.picklesImage) imgOverride = siteSettings.picklesImage;
      if (item.key === "masalas" && siteSettings.masalasImage) imgOverride = siteSettings.masalasImage;
      if (item.key === "sweets" && siteSettings.sweetsImage) imgOverride = siteSettings.sweetsImage;
      if (item.key === "snacks" && siteSettings.snacksImage) imgOverride = siteSettings.snacksImage;
    }
    return {
      ...item,
      img: imgOverride,
    };
  });

  return (
    <section id="categories" className="py-20 relative bg-card/60">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-telugu text-4xl font-bold text-primary mb-2">
            మా రుచులు
          </h2>
          <p className="font-display text-2xl italic text-primary">
            Our Categories
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
            <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((cat) => (
            <div
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className="hand-card cursor-pointer flex flex-col group"
            >
              {/* Category Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-background">
                  <h3 className="font-telugu text-xl font-bold leading-tight">
                    {cat.telugu}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-secondary">
                    {cat.title}
                  </span>
                </div>
              </div>
              
              {/* Footer info */}
              <div className="p-3 bg-card flex justify-between items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  {cat.key === "pickles" && <Flame className="w-4.5 h-4.5" />}
                  {cat.key === "masalas" && <Sparkles className="w-4.5 h-4.5" />}
                  {cat.key === "sweets" && <Heart className="w-4.5 h-4.5" />}
                  {cat.key === "snacks" && <Leaf className="w-4.5 h-4.5" />}
                </div>
                <span className="text-primary text-xs font-bold shrink-0 ml-1 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
