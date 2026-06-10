"use client";

import Image from "next/image";
import { Search, ShoppingCart, Sparkles } from "lucide-react";
import { Product, categories } from "../lib/mockData";

interface ProductGridProps {
  products: Product[];
  cartItems: { product: Product; quantity: number }[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onAddToCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, qty: number) => void;
}

export default function ProductGrid({
  products,
  cartItems,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onAddToCart,
  onUpdateQuantity
}: ProductGridProps) {
  // Filter products based on active category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery) return true;

    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.telugu.includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  });

  return (
    <section id="shop" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-sm font-semibold tracking-wider text-accent uppercase mb-2">
            ~ Shop ~
          </div>
          <h2 className="font-telugu text-4xl font-bold text-primary mb-2">
            ప్రేమతో తయారు చేసినవి
          </h2>
          <p className="font-display text-2xl italic text-primary">
            Made with Love
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6 max-w-md mx-auto">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-accent"></div>
            <Sparkles className="text-accent animate-spin-slow w-5 h-5" />
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search snacks... (English or తెలుగు)"
              className="search-input"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = cat.key === activeCategory;

              return (
                <button
                  key={cat.key}
                  onClick={() => onCategoryChange(cat.key)}
                  className={`filter-btn flex items-center justify-center py-2 px-5 rounded-xl text-sm transition-all select-none border-2 font-semibold ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-background text-primary border-accent/40 hover:bg-accent/10 hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card/10 rounded-2xl border-2 border-dashed border-accent/30">
            <p className="text-lg">No products found. Try a different search or category.</p>
            <p className="font-telugu text-sm mt-2">మీరు వెతుకుతున్న ఆహారం లభించలేదు.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find((item) => item.product.id === product.id);
              const qty = cartItem ? cartItem.quantity : 0;

              return (
                <div key={product.id} className="hand-card flex flex-col group h-full">
                  {/* Image and badges */}
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
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
                  </div>

                  {/* Info and action panel */}
                  <div className="p-4 flex flex-col flex-1">
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
        )}
      </div>
    </section>
  );
}
