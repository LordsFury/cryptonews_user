"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { usePlacementAds } from "@/hooks/usePlacementAds";
import AdMedia from "@/components/ads/AdMedia";

const TopBarAd = () => {
  const { ads, loading } = usePlacementAds("topbar");
  const [visible, setVisible] = useState(true);

  const ad = ads[0];

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  if (loading || !visible || !ad) return null;

  return (
    <div
      aria-label="Advertisement"
      className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-2"
    >
      <div className="pointer-events-auto w-full max-w-2xl">
        <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-400 dark:text-zinc-500">
          Advertisement
        </p>

        <div className="relative">
          <span className="absolute -top-2.5 right-11 z-20 rounded-full bg-amber-600 px-2 py-0.5 text-[9px] font-bold uppercase leading-none tracking-[0.1em] text-white shadow-md dark:border dark:border-amber-400/30 dark:bg-amber-600/90 dark:shadow-black/30">
            Ad
          </span>

          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex items-center gap-3 overflow-hidden rounded-full border border-amber-200/70 bg-white/95 py-2 pl-2 pr-11 shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm transition hover:border-amber-300 hover:shadow-[0_6px_24px_rgba(217,119,6,0.12)] dark:border-zinc-700 dark:bg-zinc-900/95 dark:shadow-[0_2px_16px_rgba(0,0,0,0.45)] dark:hover:border-zinc-600"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200/80 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
              <AdMedia ad={ad} className="object-cover" sizes="40px" />
            </div>

            <div className="min-w-0 flex-1 py-0.5">
              <p className="truncate text-sm font-semibold text-zinc-800 transition group-hover:text-amber-700 dark:text-zinc-100 dark:group-hover:text-amber-400">
                {ad.title}
              </p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {ad.description}
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss advertisement"
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBarAd;
