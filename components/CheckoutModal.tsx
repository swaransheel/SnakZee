"use client";

import { useState, useEffect } from "react";
import { X, MessageSquare, User, Phone, MapPin, Hash } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { name: string; phone: string; address: string; pincode: string }) => void;
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  subtotal,
  deliveryCharge,
  total
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  // Load from localStorage if available
  useEffect(() => {
    if (isOpen) {
      const savedDetails = localStorage.getItem("snakzee_customer_details");
      if (savedDetails) {
        try {
          const parsed = JSON.parse(savedDetails);
          if (parsed.name) setName(parsed.name);
          if (parsed.phone) setPhone(parsed.phone);
          if (parsed.address) setAddress(parsed.address);
          if (parsed.pincode) setPincode(parsed.pincode);
        } catch (e) {
          console.error("Failed to parse saved customer details", e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const phoneClean = phone.trim();
    // Indian phone validation: optionally starts with +91 or 0, followed by a 10-digit number starting with 6-9
    const phoneRegex = /^(\+91[\-\s]?)?[0]?[6-9]\d{9}$/;
    if (!phoneClean) {
      setError("Please enter your phone number.");
      return;
    }
    if (!phoneRegex.test(phoneClean)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    const pincodeClean = pincode.trim();
    // 6-digit PIN code validation
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeClean) {
      setError("Please enter your delivery pincode.");
      return;
    }
    if (!pincodeRegex.test(pincodeClean)) {
      setError("Please enter a valid 6-digit delivery pincode.");
      return;
    }

    // Save details to localStorage for future orders
    localStorage.setItem(
      "snakzee_customer_details",
      JSON.stringify({ name, phone: phoneClean, address, pincode: pincodeClean })
    );

    onConfirm({ name, phone: phoneClean, address, pincode: pincodeClean });
  };

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="w-full max-w-md bg-background border-3 border-accent rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-fadeInUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b-2 border-accent/30 bg-primary/5">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary font-display">
              <MessageSquare className="w-5 h-5 text-accent" />
              Delivery Details
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg p-3 font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-name" className="block text-sm font-semibold text-primary flex items-center gap-1.5">
                <User className="w-4 h-4 text-accent" />
                Your Name *
              </label>
              <input
                id="checkout-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rama Rao"
                className="w-full px-3.5 py-2.5 bg-card border border-accent/40 rounded-xl outline-none focus:border-primary text-sm font-medium transition-all"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-phone" className="block text-sm font-semibold text-primary flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-accent" />
                Phone Number *
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 bg-card border border-accent/40 rounded-xl outline-none focus:border-primary text-sm font-medium transition-all"
                required
              />
            </div>

            {/* Address Input */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-address" className="block text-sm font-semibold text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                Delivery Address *
              </label>
              <textarea
                id="checkout-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 101, Srinivasa Towers, Madhapur"
                rows={2}
                className="w-full px-3.5 py-2.5 bg-card border border-accent/40 rounded-xl outline-none focus:border-primary text-sm font-medium transition-all resize-none"
                required
              />
            </div>

            {/* Pincode Input */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-pincode" className="block text-sm font-semibold text-primary flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-accent" />
                Pincode *
              </label>
              <input
                id="checkout-pincode"
                type="text"
                pattern="\d*"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 500081"
                className="w-full px-3.5 py-2.5 bg-card border border-accent/40 rounded-xl outline-none focus:border-primary text-sm font-medium transition-all"
                required
              />
            </div>

            {/* Order total info display */}
            <div className="bg-primary/5 border border-accent/20 rounded-xl p-4 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Items Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Delivery Charges:</span>
                <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-primary pt-1 border-t border-accent/15">
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border-2 border-accent/30 text-primary hover:bg-accent/10 rounded-xl font-semibold text-sm transition-all"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 btn-whatsapp py-3 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-sm cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4.5 h-4.5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

