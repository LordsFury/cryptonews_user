"use client";
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from "date-fns";
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ trendingArticles = [] }) => {
  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAds = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ads?placement=sidebar`, {
          method: 'GET',
        });
        const data = await response.json();
        if (isMounted && data.success) {
          setAds(data.ads || []);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
        if (isMounted) {
          setAds([]);
        }
      } finally {
        if (isMounted) {
          setAdsLoading(false);
        }
      }
    };

    fetchAds();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderAdMedia = (ad) => {
    if (ad.mediaType === 'video') {
      return (
        <video
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={ad.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <Image
        src={ad.mediaUrl}
        alt={ad.title}
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 360px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    );
  };

  return (
    <aside className="hidden lg:block w-[360px] shrink-0 self-start lg:sticky lg:top-24">
      <div className="space-y-8 border-l border-zinc-200 pl-4 dark:border-zinc-800">
        <section className="space-y-4">
          <div className="flex items-center justify-between pr-1">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Trending News
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              Live
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 pr-1">
            Fast-moving stories and the biggest market updates.
          </p>
          <div className="space-y-3">
            {trendingArticles.slice(0, 5).map((article) => (
              <article
                key={article._id}
                className="group border-b border-zinc-200 pb-3 pr-1 transition last:border-b-0 dark:border-zinc-800"
              >
                <Link href={`/news/id/${article._id}`}>
                  <h3 className="text-sm font-medium leading-snug text-gray-900 line-clamp-2 transition group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:to-purple-800 group-hover:bg-clip-text dark:text-gray-100">
                    {article.title}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faEye} /> {article.views}
                  </span>
                </div>
              </article>
            ))}
            {trendingArticles.length === 0 && (
              <div className="border-b border-zinc-200 pb-3 pr-1 text-sm text-gray-500 dark:border-zinc-800 dark:text-gray-400">
                No trending stories right now.
              </div>
            )}
          </div>
          <div className="border-b border-zinc-200 dark:border-zinc-800"></div>
        </section>

        <section className="space-y-3 pr-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Sponsored
            </p>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
              Ads
            </span>
          </div>
          <div className="space-y-4">
            {adsLoading && (
              <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                Loading sponsor placements...
              </div>
            )}

            {!adsLoading && ads.slice(0, 2).map((ad) => (
              <article key={ad._id} className="group overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
                <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    {renderAdMedia(ad)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900 shadow-sm backdrop-blur dark:bg-zinc-950/90 dark:text-white">
                      Sponsored
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-snug text-zinc-900 transition group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:via-purple-700 group-hover:to-blue-800 group-hover:bg-clip-text dark:text-white">
                        {ad.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white dark:bg-zinc-100 dark:text-zinc-900">
                        Ad
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {ad.description}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-purple-800 to-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-md transition group-hover:translate-x-1">
                      <span>{ad.ctaText || 'Learn More'}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </a>
              </article>
            ))}

            {!adsLoading && ads.length === 0 && (
              <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 p-5 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center dark:border-zinc-700 dark:bg-zinc-950/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    Sponsored
                  </p>
                  <p className="mt-2 text-base font-medium text-zinc-900 dark:text-white">
                    Your brand can appear here.
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Publish an active sidebar ad from the admin panel to fill this spot.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
