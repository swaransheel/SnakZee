"use client";

import Image from "next/image";
import { X, ShoppingBag, Trash2, MessageSquare } from "lucide-react";
import { Product } from "../lib/mockData";

interface CartDrawerProps {
  open: boolean;
  cartItems: { product: Product; quantity: number }[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  deliveryCost?: number;
  freeDeliveryThreshold?: number;
}

export default function CartDrawer({
  open,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  deliveryCost = 50,
  freeDeliveryThreshold = 500
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Cart Sidebar Sheet */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l-2 border-accent/40 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-accent/30 bg-primary/5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="font-semibold text-primary">Your cart is empty</p>
              <p className="font-telugu text-sm mt-1 opacity-70">మీ కార్ట్ ఖాళీగా ఉంది</p>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 py-3 border-b border-accent/15 items-start animate-fadeInUp"
              >
                {/* Product Thumbnail */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-accent/20"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm truncate">
                    {product.name}
                  </p>
                  <span className="font-telugu text-xs text-muted-foreground block -mt-0.5">
                    {product.telugu}
                  </span>
                  <p className="text-primary text-xs font-semibold mt-1">
                    ₹{product.price} × {quantity} = ₹{product.price * quantity}
                  </p>
                  
                  <div className="flex items-center gap-2.5 bg-background border border-accent/40 rounded-lg px-2.5 py-1 shadow-sm shrink-0 w-fit mt-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      className="w-4 h-4 flex items-center justify-center font-bold text-primary hover:bg-accent/15 rounded transition-colors select-none text-base border-none bg-transparent p-0 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-4 text-center font-bold text-primary select-none text-xs leading-none flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="w-4 h-4 flex items-center justify-center font-bold text-primary hover:bg-accent/15 rounded transition-colors select-none text-base border-none bg-transparent p-0 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(product.id)}
                  className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t-2 border-accent/30 bg-primary/5">
            <div className="flex justify-between text-lg font-bold text-primary mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            {/* Delivery notice */}
            <p className="text-xs text-muted-foreground text-center mb-4 leading-normal">
              {subtotal >= freeDeliveryThreshold ? (
                <span className="text-green-600 font-semibold">🎉 You qualify for FREE Delivery!</span>
              ) : (
                <span>Add ₹{freeDeliveryThreshold - subtotal} more for FREE delivery (otherwise ₹{deliveryCost})</span>
              )}
            </p>

            {/* Order Checkout CTA */}
            <button
              onClick={onCheckout}
              className="btn-whatsapp w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
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
        )}
      </div>
    </>
  );
}
