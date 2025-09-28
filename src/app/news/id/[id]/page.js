"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from 'next/navigation';
import { FaRedditAlien, FaTelegramPlane } from 'react-icons/fa';
import { faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Loader2, Share2Icon } from 'lucide-react'; import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [trendingArticles, setTrendingArticles] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState(null);

  const getArticle = async () => {
    setLoading(true);
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${id}`, {
      method: 'GET',
      headers: { source: "user" },
    });
    const data = await response.json();
    setArticle(data.Article);
    setTrendingArticles(data.trendingArticles);
    setRelatedArticles(data.relatedArticles);
    setLoading(false);
  }

  const addView = async () => {
    let viewed = [];

    try {
      const stored = localStorage.getItem("viewedNews");
      if (stored) {
        try {
          viewed = JSON.parse(stored);
          if (!Array.isArray(viewed)) viewed = [];
        } catch (err) {
          console.warn("Failed to parse viewedNews:", err);
          viewed = [];
        }
      }
      if (!viewed.includes(id)) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${id}/view`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "source": "user"
          },
        });
        const data = await response.json();
        if (data.success) {
          viewed.push(id);
          setArticle(data.article)
          localStorage.setItem("viewedNews", JSON.stringify(viewed));
        }
      }
    } catch (error) {
      console.error("Error in addView:", error);
    }
  };

  useEffect(() => {
    getArticle();
    addView();
    try {
      const stored = localStorage.getItem("likedNews");
      if (stored) {
        const likedArticles = JSON.parse(stored);
        if (Array.isArray(likedArticles)) {
          setLiked(likedArticles.includes(id));
        }
      }
    } catch (err) {
      console.warn("Failed to parse likedNews from localStorage", err);
    }
  }, []);

  const toggleLike = async () => {
    try {
      const idStr = String(id);

      let likedNews = [];
      const stored = localStorage.getItem("likedNews");
      if (stored) {
        try {
          likedNews = JSON.parse(stored);
          if (!Array.isArray(likedNews)) likedNews = [];
        } catch {
          likedNews = [];
        }
      }

      let action = "like";
      if (likedNews.includes(idStr)) {
        action = "unlike";
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${idStr}/${action}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", source: "user" },
        }
      );

      const data = await response.json();
      if (data.success) {
        setLiked(prev => !prev);
        setArticle(data.article);

        if (action === "like") {
          likedNews.push(idStr);
        } else {
          likedNews = likedNews.filter(item => item !== idStr);
        }
        localStorage.setItem("likedNews", JSON.stringify(likedNews));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const updateShareCount = async (platform) => {
    let sharedArticles = JSON.parse(localStorage.getItem("sharedNews")) || [];
    if (!sharedArticles.includes(id)) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${id}/${platform}/share`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'source': 'user'
        }
      });
      sharedArticles.push(id);
      localStorage.setItem("sharedNews", JSON.stringify(sharedArticles));
      setShared(true);
    }
  };

  const handleShare = async (e, platform) => {
    e.preventDefault();
    const articleUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/news/${article._id}`;
    const articleTitle = article.title || "Check out this article";

    let platformUrl = "";
    if (platform === "telegram") {
      platformUrl = `https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`;
    } else if (platform === "X") {
      platformUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`;
    } else if (platform === "reddit") {
      platformUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`;
    } else if (platform === "linkedin") {
      platformUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    }

    if (platformUrl) {
      window.open(platformUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      await updateShareCount(platform);
    }
  };

  return (
    <div className="min-h-screen pt-6 bg-white dark:bg-zinc-900 py-10 px-4 sm:px-8 md:px-16 text-zinc-800 dark:text-zinc-100">
      {loading && <div className="flex justify-center pt-20 p-6 bg-white dark:bg-zinc-900 h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>}
      {!loading && article && <div className='flex gap-8'>
        <div className='flex flex-col flex-1 max-w-2/3 px-4 sm:px-6'>
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
              {article.title}
            </h3>
            <p className="text-base sm:text-md md:text-lg leading-relaxed text-zinc-800 dark:text-zinc-100">
              {article.summary}
            </p>
            {article.coverImage && (
              <div className="flex">
                <div className="relative w-full overflow-hidden rounded-sm shadow-xl ring-1 ring-zinc-300 dark:ring-zinc-700">
                  <Image
                    src={article.coverImage}
                    alt="Uploaded"
                    width={800}
                    height={500}
                    priority
                    className="object-cover w-full max-h-[500px]"
                  />
                  <div className="absolute top-4 right-4 flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-md font-medium px-3 py-1 shadow">
                    {article.category.name}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 mx-1 mt-8 mb-8 text-gray-600 dark:text-gray-300">
              <div className='flex items-center gap-4'>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEye} size='md' />
                  <span className="text-md">{article.views}</span>
                </span>
                <span className="flex items-center gap-2 transition">
                  <button className='focus:outline-none' onClick={toggleLike}>
                    <FontAwesomeIcon size='lg'
                      icon={liked ? solidHeart : regularHeart}
                      className={`cursor-pointer transition-all duration-300 ease-in-out ${liked ? "text-red-600 scale-105" : "text-gray-500 scale-100"}`} />
                  </button>
                  <span className="text-lg">{article.likes}</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className='flex items-center gap-3 mr-6'>
                  <Share2Icon size={18} />
                  <h1 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                    Share Article
                  </h1>
                </div>
                <div className='bg-zinc-900 dark:bg-zinc-100 p-1 text-white dark:text-zinc-900 rounded-md flex items-center justify-center transition-all duration-200 hover:scale-110'>
                  <button onClick={(e) => handleShare(e, 'X')} className="cursor-pointer">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                  </button>
                </div>
                <div className='bg-zinc-900 dark:bg-zinc-100 p-1 text-white dark:text-zinc-900 rounded-md flex items-center justify-center transition-all duration-200 hover:scale-110'>
                  <button onClick={(e) => handleShare(e, 'telegram')} className="cursor-pointer">
                    <FaTelegramPlane size={24} />
                  </button>
                </div>
                <div className='bg-zinc-900 dark:bg-zinc-100 p-1 text-white dark:text-zinc-900 rounded-md flex items-center hover:scale-110 transition-all duration-200 justify-center'>
                  <button onClick={(e) => handleShare(e, 'reddit')} className="cursor-pointer">
                    <FaRedditAlien size={24} />
                  </button>
                </div>
                <div className='bg-zinc-900 dark:bg-zinc-100 p-1 text-white dark:text-zinc-900 rounded-md flex items-center hover:scale-110 transition-all duration-200 justify-center'>
                  <button onClick={(e) => handleShare(e, 'linkedin')} className="cursor-pointer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </button>
                </div>
              </div>
            </div>
            <div className="tiptap prose prose-sm sm:prose-lg dark:prose-invert leading-relaxed max-w-none">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <div className="flex flex-wrap gap-2 border-y py-4 border-zinc-200 dark:border-zinc-700">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white px-2 py-1 text-sm rounded-sm shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          {relatedArticles.length > 0 && <div>
            <h1 className='mt-10 text-2xl font-medium'>Read More</h1>
            <div className='grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-4'>
              {relatedArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/news/id/${article._id}`}
                  className="transition duration-300 overflow-hidden flex flex-col border-b pb-4 pt-2 border-zinc-200 dark:border-zinc-800">
                  <div className="relative w-full h-40">
                    <Image
                      src={article.coverImage || "/images/img.avif"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-col justify-between flex-1">
                    <h3 className="text-sm font-medium tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div></div>}
        </div>
        <Sidebar trendingArticles={trendingArticles} />
      </div>
      }
    </div>
  );
};

export default Page;
