"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onToggleCart: () => void;
}

export default function Navbar({
  cartCount,
  onToggleCart
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b-2 border-accent/40 shadow-sm transition-all duration-300">
      {/* Temple Border Top Accent */}
      <div className="h-2.5 temple-border-top bg-repeat-x w-full"></div>

      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div
          className="relative z-50 cursor-pointer select-none"
          onClick={() => scrollToSection("hero")}
        >
          <div className="bg-white rounded-full p-1.5 shadow-md flex items-center justify-center w-16 h-16 overflow-hidden transition-transform hover:scale-105">
            <Image
              src="/snakzee-logo.png"
              alt="Snakzee Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-primary">
          <button onClick={() => scrollToSection("hero")} className="hover:text-accent font-semibold transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection("shop")} className="hover:text-accent font-semibold transition-colors">
            Shop
          </button>
          <button onClick={() => scrollToSection("categories")} className="hover:text-accent font-semibold transition-colors">
            Categories
          </button>
          <button onClick={() => scrollToSection("about")} className="hover:text-accent font-semibold transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-accent font-semibold transition-colors">
            Contact
          </button>
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-3">

          {/* Cart Button */}
          <button
            onClick={onToggleCart}
            className="relative p-3.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground border-2 border-accent shadow-md transition-all active:scale-95 flex items-center justify-center select-none"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground font-bold text-xs min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg text-primary hover:bg-accent/15"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-accent/20 bg-background flex flex-col gap-2 p-4 animate-fadeInUp">
          <button
            onClick={() => scrollToSection("hero")}
            className="w-full text-left py-2 px-4 rounded-lg text-primary hover:bg-accent/10 font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("shop")}
            className="w-full text-left py-2 px-4 rounded-lg text-primary hover:bg-accent/10 font-semibold"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="w-full text-left py-2 px-4 rounded-lg text-primary hover:bg-accent/10 font-semibold"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="w-full text-left py-2 px-4 rounded-lg text-primary hover:bg-accent/10 font-semibold"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full text-left py-2 px-4 rounded-lg text-primary hover:bg-accent/10 font-semibold"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
