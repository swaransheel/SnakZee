"use client";

import { useState } from "react";
import { Info, X, Settings, Database } from "lucide-react";

interface AdminBannerProps {
  isSanityConnected: boolean;
  onOpenAdmin: () => void;
}

export default function AdminBanner({ isSanityConnected, onOpenAdmin }: AdminBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-xs sm:text-sm py-2.5 px-4 flex justify-between items-center z-50 border-b border-accent/40 shadow-sm relative transition-all">
      <div className="flex items-center gap-2 flex-wrap">
        <Info className="w-4 h-4 text-secondary shrink-0" />
        <span className="font-medium">
          {isSanityConnected ? (
            <span>Store is connected to Sanity CMS. Go to <a href="/studio" className="underline font-bold text-secondary">/studio</a> to manage live products.</span>
          ) : (
            <span>Store is in local preview mode. Click <button onClick={onOpenAdmin} className="underline font-bold text-secondary flex-inline items-center gap-0.5">Settings <Settings className="w-3 h-3 inline" /></button> to customize photos, pricing, and products.</span>
          )}
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-primary-foreground/60 hover:text-primary-foreground p-0.5 rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
