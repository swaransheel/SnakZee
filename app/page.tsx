"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import ProductGrid from "../components/ProductGrid";
import BestSellers from "../components/BestSellers";
import dynamic from "next/dynamic";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import AdminBanner from "../components/AdminBanner";

const CartDrawer = dynamic(() => import("../components/CartDrawer"), { ssr: false });
const CheckoutModal = dynamic(() => import("../components/CheckoutModal"), { ssr: false });
const AdminModal = dynamic(() => import("../components/AdminModal"), { ssr: false });

import { Product, Testimonial, defaultProducts } from "../lib/mockData";
import { getProducts, getTestimonials, getSiteSettings, SiteSettingsData } from "../lib/sanity.client";
import { logOrderToSupabase } from "../lib/supabase";

const WHATSAPP_NUMBER = "918897586142";

export default function Storefront() {
  // Store Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  // App UI states
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const isSanityConnected = 
    !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.includes("mock-project");

  // Load products, testimonials, categories, and settings
  useEffect(() => {
    async function loadData() {
      try {
        const prodData = await getProducts();
        const testData = await getTestimonials();
        const settingsData = await getSiteSettings();
        setProducts(prodData);
        setTestimonials(testData);
        setSiteSettings(settingsData);
      } catch (err) {
        console.error("Error loading store data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const localCart = localStorage.getItem("snakzee_cart");
    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (e) {
        console.error("Error loading cart from storage", e);
      }
    }
  }, []);

  // Sync cart to localStorage
  const syncCart = (updatedCart: typeof cart) => {
    setCart(updatedCart);
    localStorage.setItem("snakzee_cart", JSON.stringify(updatedCart));
  };

  // Add to cart helper
  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existing = cart.find((item) => item.product.id === productId);
    let newCart = [...cart];
    if (existing) {
      newCart = cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart.push({ product, quantity: 1 });
    }
    syncCart(newCart);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }

    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    );
    syncCart(newCart);
  };

  // Remove from cart
  const handleRemoveItem = (productId: number) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    syncCart(newCart);
  };

  // Open WhatsApp for general chat
  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      "🙏 Namaskaram! I'm interested in your authentic Telugu snacks. Could you help me?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  // Direct Phone Call Router
  const handleCallUs = () => {
    window.open("tel:+919876543210");
  };

  // Open checkout details modal
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutOpen(true);
  };

  // Checkout order router (WhatsApp API & Supabase Logger) after details are provided
  const handleConfirmCheckout = async (details: { name: string; phone: string; address: string; pincode: string }) => {
    const orderItems = cart.map(
      ({ product, quantity }) =>
        `• ${product.name} (${product.telugu}) × ${quantity} — ₹${product.price * quantity}`
    );

    const message = [
      "🙏 Namaskaram! I would like to place an order from SnakZee.",
      "",
      "Items Ordered:",
      ...orderItems,
      "",
      "Order Summary:",
      `- Subtotal: ₹${subtotal}`,
      `- Delivery: ${deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge}`,
      `- Total Amount: ₹${total}`,
      "",
      "My Delivery Details:",
      `- Name: ${details.name}`,
      `- Phone: ${details.phone}`,
      `- Delivery Address: ${details.address}`,
      `- Pincode: ${details.pincode}`,
      "",
      "Please confirm availability and share payment options. Thank you!"
    ].join("\n");

    // Supabase Logging (include customer details)
    const orderLog = {
      items: cart.map(i => ({ id: i.product.id, name: i.product.name, qty: i.quantity, price: i.product.price })),
      subtotal,
      delivery: deliveryCharge,
      total,
      customer: details,
      timestamp: new Date().toISOString()
    };
    
    try {
      await logOrderToSupabase(orderLog);
    } catch (err) {
      console.error("Failed to log order to Supabase:", err);
    }

    // Clear cart and close modals
    syncCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);

    // Redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  // Admin save changes
  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("snakzee_products", JSON.stringify(updatedProducts));
  };

  // Admin reset catalog
  const handleResetToDefault = () => {
    localStorage.removeItem("snakzee_products");
    setProducts(defaultProducts);
  };

  // Select category triggers scroll to shop
  const handleSelectCategory = (key: string) => {
    setActiveCategory(key);
    const el = document.getElementById("shop");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const freeDeliveryThreshold = siteSettings?.freeDeliveryThreshold ?? 500;
  const defaultDeliveryCost = siteSettings?.deliveryCost ?? 50;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = subtotal >= freeDeliveryThreshold ? 0 : defaultDeliveryCost;
  const total = subtotal + deliveryCharge;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Admin Help Banner */}
      <AdminBanner
        isSanityConnected={isSanityConnected}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Header Sticky Navigation */}
      <Navbar
        cartCount={cartCount}
        onToggleCart={() => setCartOpen(true)}
      />

      <main className="flex-grow">
        {/* Welcome Hero Landing */}
        <HeroSection
          onShopClick={() => handleSelectCategory("all")}
          onWhatsAppClick={handleOpenWhatsApp}
        />

        {/* Telugu Proverb Banner */}
        <div className="bg-secondary/20 py-6 border-y-2 border-accent/40 text-center">
          <div className="container mx-auto px-4">
            <h3 className="font-telugu text-2xl font-bold text-primary mb-1">
              తెలుగు రుచుల అసలైన చిరునామా
            </h3>
            <p className="text-xs sm:text-sm italic text-muted-foreground">
              &ldquo;The true destination for authentic Telugu flavors.&rdquo;
            </p>
          </div>
        </div>

        {/* Brand Heritage Story */}
        <AboutSection siteSettings={siteSettings} />

        {/* Categories grid directory */}
        <CategoriesSection siteSettings={siteSettings} onSelectCategory={handleSelectCategory} />

        {/* Store Catalog */}
        {loading ? (
          <div className="py-20 text-center text-primary font-semibold">
            <div className="w-10 h-10 border-4 border-accent border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            Loading traditional flavors...
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              cartItems={cart}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchQuery}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            <BestSellers
              products={products}
              cartItems={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </>
        )}

        {/* Testimonials & Contact */}
        <ContactSection
          testimonials={testimonials}
          onCallClick={handleCallUs}
          onWhatsAppClick={handleOpenWhatsApp}
        />
      </main>

      {/* Footer copyright */}
      <Footer
        onSelectCategory={handleSelectCategory}
      />

      {/* Slide-out Cart Drawer Sheet */}
      <CartDrawer
        open={cartOpen}
        cartItems={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        deliveryCost={defaultDeliveryCost}
        freeDeliveryThreshold={freeDeliveryThreshold}
      />

      {/* Checkout Details Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={handleConfirmCheckout}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        total={total}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        open={adminOpen}
        products={products}
        onClose={() => setAdminOpen(false)}
        onSaveProducts={handleSaveProducts}
        onResetToDefault={handleResetToDefault}
        isSanityConnected={isSanityConnected}
      />
    </div>
  );
}
