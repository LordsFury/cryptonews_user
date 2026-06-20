"use client";
import { formatDistanceToNow } from "date-fns";
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ trendingArticles = [] }) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            Sponsored
          </p>
          <div className="space-y-3">
            <Image alt="Sponsored placement" src="/images/img.avif" width={350} height={220} className="w-full object-cover" />
            <Image alt="Sponsored placement" src="/images/img.avif" width={350} height={220} className="w-full object-cover" />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
