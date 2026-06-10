"use client";

import Image from "next/image";
import { ShoppingCart, Sparkles, Star } from "lucide-react";
import { Product } from "../lib/mockData";

interface BestSellersProps {
  products: Product[];
  cartItems: { product: Product; quantity: number }[];
  onAddToCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, qty: number) => void;
}

export default function BestSellers({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity
}: BestSellersProps) {
  // Select best seller products dynamically (those marked as 'hot' in Sanity CMS)
  let bestProducts = products.filter((p) => p.hot === true).slice(0, 3);
  // Fallback if no products are marked as hot/best seller
  if (bestProducts.length === 0) {
    bestProducts = products.slice(0, 3);
  }

  return (
    <section id="best-sellers" className="py-20 relative bg-secondary/5 border-t border-accent/30 overflow-hidden">
      {/* Background muggu pattern overlay */}
      <div className="absolute inset-0 muggu-pattern opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-primary text-secondary border border-accent px-4 py-1.5 rounded-full font-bold text-xs uppercase shadow-md mb-4 tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current text-secondary" />
            BEST SELLERS
            <Star className="w-3.5 h-3.5 fill-current text-secondary" />
          </div>
          <h2 className="font-telugu text-4xl sm:text-5xl font-bold text-primary mb-2">
            అత్యధికంగా అమ్ముడుపోయేవి
          </h2>
          <p className="font-display text-2xl italic text-primary">
            Customer Favorites & Festival Picks
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
            <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>

        {/* 3-column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {bestProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.product.id === product.id);
            const qty = cartItem ? cartItem.quantity : 0;

            return (
              <div key={product.id} className="hand-card flex flex-col group h-full bg-card">
                {/* Image and Badges */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-secondary text-primary font-bold text-xs px-2.5 py-1 rounded-full shadow-md z-10">
                      {product.badge}
                    </span>
                  )}
                  {product.hot && (
                    <span className="absolute top-2.5 right-2.5 bg-destructive text-destructive-foreground font-semibold text-xs px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                      ★ Hot
                    </span>
                  )}
                  {/* Bottom-right Best Seller Stamp */}
                  <span className="absolute bottom-2.5 right-2.5 bg-primary text-secondary border border-accent/30 font-bold text-xs px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                    ★ Best Seller
                  </span>
                </div>

                {/* Info Panel */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-telugu text-lg font-bold text-primary leading-tight">
                    {product.telugu}
                  </p>
                  <h3 className="font-display text-xl text-primary font-bold mt-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 flex-1 line-clamp-2 leading-relaxed">
                    {product.desc}
                  </p>

                  {/* Footer Row: Price & Quantities */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-accent/20">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>

                    <div className="flex items-center gap-2.5 bg-background border border-accent/40 rounded-lg px-2.5 py-1 shadow-sm shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(product.id, qty - 1)}
                        className="w-5 h-5 flex items-center justify-center font-bold text-primary hover:bg-accent/15 rounded transition-colors select-none text-base border-none bg-transparent p-0 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-bold text-primary select-none text-sm leading-none flex items-center justify-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, qty + 1)}
                        className="w-5 h-5 flex items-center justify-center font-bold text-primary hover:bg-accent/15 rounded transition-colors select-none text-base border-none bg-transparent p-0 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="btn-traditional w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
