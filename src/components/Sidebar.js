"use client";
import { formatDistanceToNow } from "date-fns";
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ trendingArticles }) => {
  return (
    <aside className="hidden lg:block w-[350px]">
      <div className="sticky top-4">
        <div className='mb-8'>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            Trending News
          </h2>
          {trendingArticles.slice(0, 5).map((article) => (
            <div
              key={article._id}
              className="transition duration-300 overflow-hidden flex flex-col border-b pb-2 border-zinc-200 dark:border-zinc-800"
            >
              <div className="mt-4 flex flex-col justify-between flex-1">
                <Link href={`/news/id/${article._id}`}>
                  <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between text-sm mx-1 text-gray-500 dark:text-gray-400">
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faEye} /> {article.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ads */}
        <div className="space-y-4">
          <Image alt="text" src="/images/img.avif" width={350} height={400} />
          <Image alt="text" src="/images/img.avif" width={350} height={400} />
          <Image alt="text" src="/images/img.avif" width={350} height={400} />
          <Image alt="text" src="/images/img.avif" width={350} height={400} />
          <Image alt="text" src="/images/img.avif" width={350} height={400} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
