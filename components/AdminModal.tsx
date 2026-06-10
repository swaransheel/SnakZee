"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Edit2, Trash2, Plus, RefreshCw, Save, Search, Sparkles } from "lucide-react";
import { Product } from "../lib/mockData";

interface AdminModalProps {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onSaveProducts: (updatedProducts: Product[]) => void;
  onResetToDefault: () => void;
  isSanityConnected: boolean;
}

export default function AdminModal({
  open,
  products,
  onClose,
  onSaveProducts,
  onResetToDefault,
  isSanityConnected
}: AdminModalProps) {
  // Local states for management
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [telugu, setTelugu] = useState("");
  const [category, setCategory] = useState("pickles");
  const [price, setPrice] = useState(100);
  const [badge, setBadge] = useState("");
  const [hot, setHot] = useState(false);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  // Sync products when opened
  useEffect(() => {
    if (open) {
      setLocalProducts([...products]);
    }
  }, [open, products]);

  // Populate form for editing
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setTelugu(product.telugu);
    setCategory(product.category);
    setPrice(product.price);
    setBadge(product.badge || "");
    setHot(product.hot);
    setImage(product.image);
    setDesc(product.desc);
  };

  // Cancel edit mode or reset form
  const resetForm = () => {
    setEditingProduct(null);
    setName("");
    setTelugu("");
    setCategory("pickles");
    setPrice(100);
    setBadge("");
    setHot(false);
    setImage("");
    setDesc("");
  };

  // Form submit handler (adds or updates item in local state list)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : Date.now(), // Use existing ID or timestamp for new
      name,
      telugu,
      category,
      price: Number(price),
      badge,
      hot,
      image: image || "https://images.unsplash.com/photo-1610508500445-a4592435e27e", // fallback image
      desc
    };

    if (editingProduct) {
      // Update item
      const updatedList = localProducts.map((p) =>
        p.id === editingProduct.id ? productPayload : p
      );
      setLocalProducts(updatedList);
    } else {
      // Add new item
      setLocalProducts([productPayload, ...localProducts]);
    }

    resetForm();
  };

  // Delete product handler
  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to remove this product?")) {
      setLocalProducts(localProducts.filter((p) => p.id !== id));
      if (editingProduct && editingProduct.id === id) {
        resetForm();
      }
    }
  };

  // Save changes back to parent
  const handleSave = () => {
    onSaveProducts(localProducts);
    alert("Changes saved successfully!");
  };

  // Filter list in modal
  const filteredProducts = localProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.telugu.includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Admin Panel Modal Container */}
      <div className={`admin-modal ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="admin-header flex items-center justify-between p-5 border-b-2 border-accent/40 bg-primary/5">
          <h3 className="admin-modal-title flex items-center gap-2 text-xl font-bold text-primary">
            <Sparkles className="w-5 h-5 text-accent" />
            Snakzee Store Editor
          </h3>
          <button
            onClick={onClose}
            className="admin-close-btn w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="admin-status-bar flex flex-col sm:flex-row justify-between items-center gap-3 p-3 bg-accent/10 border-b border-accent/20">
          <span className="text-xs sm:text-sm font-semibold text-primary">
            {isSanityConnected ? (
              <span className="text-green-700">🟢 Connected to Sanity CMS (Studio under /studio)</span>
            ) : (
              <span className="text-amber-700">🟡 Local Mode: Changes saved to your browser&apos;s Local Storage</span>
            )}
          </span>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                if (confirm("Reset store back to default items? Any custom changes will be lost.")) {
                  onResetToDefault();
                  onClose();
                }
              }}
              className="btn-secondary py-1.5 px-3 rounded-lg flex items-center gap-1.5 text-xs text-primary-foreground font-semibold bg-secondary"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="btn-traditional py-1.5 px-4 rounded-lg flex items-center gap-1.5 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              Save All Changes
            </button>
          </div>
        </div>

        {/* Admin Dashboard Grid Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Panel: Add/Edit Product Form */}
          <div className="md:col-span-5 p-5 overflow-y-auto border-b md:border-b-0 md:border-r border-accent/20">
            <h4 className="font-semibold text-primary border-l-4 border-accent pl-2 mb-4">
              {editingProduct ? "✏️ Edit Product details" : "➕ Add New Product"}
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* English Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">Product Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pappu Chekkalu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                />
              </div>

              {/* Telugu Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary font-telugu">Product Name (Telugu)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. పప్పు చెక్కలు"
                  value={telugu}
                  onChange={(e) => setTelugu(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background font-telugu"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-primary">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                  >
                    <option value="pickles">Pickles</option>
                    <option value="masalas">Masalas</option>
                    <option value="sweets">Sweets</option>
                    <option value="snacks">Snacks</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-primary">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                  />
                </div>
              </div>

              {/* Badge & Hot checkbox */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-primary">Badge (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Freshly Ground"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is-hot"
                    checked={hot}
                    onChange={(e) => setHot(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <label htmlFor="is-hot" className="text-xs font-bold text-primary select-none cursor-pointer">
                    ⭐ Hot Product
                  </label>
                </div>
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.pexels.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details about flavor, spice levels, ingredients..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg text-sm bg-background resize-none"
                />
              </div>

              {/* Form submit/cancel */}
              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="py-2 px-4 rounded-lg bg-muted text-muted-foreground text-xs font-semibold hover:bg-muted/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-traditional py-2 px-5 rounded-lg text-xs"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel: Scrollable list of products */}
          <div className="md:col-span-7 p-5 flex flex-col overflow-hidden">
            <h4 className="font-semibold text-primary border-l-4 border-accent pl-2 mb-4">
              🗂️ Manage Products List ({localProducts.length})
            </h4>

            {/* List search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search catalog in panel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-input rounded-lg text-sm bg-background"
              />
            </div>

            {/* Scrollable Products List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-xs text-muted-foreground">
                  No matches in store catalog.
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 bg-card/40 border border-accent/20 rounded-lg hover:bg-card/75 transition-colors"
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded object-cover border border-accent/20 flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary text-sm truncate leading-tight">
                        {p.name}
                      </p>
                      <span className="font-telugu text-xs text-muted-foreground block truncate">
                        {p.telugu}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-accent/20 text-accent-foreground font-semibold px-1.5 py-0.5 rounded uppercase">
                          {p.category}
                        </span>
                        <span className="text-primary font-bold text-xs">₹{p.price}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="w-8 h-8 rounded-md bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-all"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
