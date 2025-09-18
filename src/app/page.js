"use client"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Footer from '@/components/Footer';

const Page = () => {

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false)

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/trending`,
        {
          method: "GET",
          headers: { source: "user" },
        }
      );
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);


  return (
    <div className='bg-white dark:bg-zinc-900 min-h-screen'>
      {loading && !initialized && <div className="flex justify-center p-6 pt-20 pb-8 px-4 sm:px-8 lg:px-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>}
      {initialized && articles.length > 0 && <div className='pt-20 pb-8 px-4 sm:px-8 lg:px-12'>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          🔥 Top Trending News
        </h2>
        <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden p-6">
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            {articles.length > 0 && (
              <div className="lg:w-1/2 w-full border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <Link href={`/news/id/${articles[0]._id}`} className="block">
                  <div className="relative w-full h-64 sm:h-80 lg:h-[400px]">
                    <Image
                      className="object-cover"
                      src={articles[0].coverImage || "/images/img.avif"}
                      alt={articles[0].title}
                      fill
                      priority
                    />
                    <div className="absolute bottom-3 right-3 flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-xs font-medium px-2 py-1 shadow">
                      {articles[0].category?.name}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <h2 className="text-lg lg:text-xl font-bold text-black dark:text-white line-clamp-2">
                      {articles[0].title}
                    </h2>
                    <p className="text-sm lg:text-md text-zinc-700 dark:text-zinc-300 line-clamp-3">
                      {articles[0].summary}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-md text-zinc-600 dark:text-zinc-300">
                      <span>
                        {formatDistanceToNow(new Date(articles[0].publishedAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faEye} /> {articles[0].views}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            <div className="lg:w-1/2 w-full flex flex-col justify-between">
              <ul className="space-y-4">
                {articles.slice(1, 5).map((article) => (
                  <li key={article._id} className="flex items-center pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex-1 mr-2">
                      <Link href={`/news/id/${article._id}`}>
                        <h3 className="text-sm sm:text-lg text-gray-900 dark:text-gray-100 font-semibold hover:underline line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <div className='flex flex-col gap-2'>
                        <div className="text-sm flex flex-col gap-2 text-gray-500 dark:text-gray-300">
                          <span>
                            {formatDistanceToNow(new Date(article.publishedAt), {
                              addSuffix: true,
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} /> {article.views}
                          </span>
                        </div>
                        <div className="inline-flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-xs font-medium px-2 py-1 shadow w-fit">
                          {article.category?.name}
                        </div>
                      </div>
                    </div>
                    <Link href={`/news/id/${article._id}`}>
                      <div className="relative flex-shrink-0 w-32 h-24 sm:w-44 sm:h-32 overflow-hidden">
                        <Image
                          src={article.coverImage || "/images/img.avif"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/news/category=LatestNews`}
              className="inline-flex items-center gap-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg shadow-md hover:from-purple-800 hover:to-blue-800 transition-all duration-300">
              <span>See More Trending News</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-8">
          {articles.slice(5, 14).map((article) => (
            <Link
              key={article._id}
              href={`/news/id/${article._id}`}
              className="transition duration-300 overflow-hidden flex flex-col border-b pb-6 pt-2 border-zinc-200 dark:border-zinc-800">
              <div className="relative w-full h-68">
                <Image
                  src={article.coverImage || "/images/img.avif"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 inline-flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white text-xs font-medium px-2 py-1 rounded-md shadow w-fit">
                  {article.category?.name}
                </div>
              </div>
              <div className="mt-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between mt-4 text-md mx-1 text-gray-500 dark:text-gray-400">
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
            </Link>
          ))}
        </div>
      </div>
      }
      {initialized && articles.length > 0 && <Footer />}
    </div>
  )
}

export default Page