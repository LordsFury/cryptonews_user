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
import { Loader2, Share2Icon } from 'lucide-react';

const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const getArticle = async () => {
    setLoading(true);
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${id}`, {
      method: 'GET',
      headers: { source: "user" },
    });
    const data = await response.json();
    setArticle(data.Article);
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
      window.open(platformUrl, "_blank");
    }
    await updateShareCount(platform);
  };


  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-zinc-900 py-10 px-4 sm:px-8 md:px-16 text-zinc-800 dark:text-zinc-100">
      {loading && <div className="flex justify-center pt-20 p-6 bg-white dark:bg-zinc-900 h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>}
      {!loading && article && <div className='flex justify-between gap-16'>
        <div className="max-w-2/3 px-4 sm:px-6 space-y-4">
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
          <div className="flex flex-wrap items-center justify-between gap-4 mx-1 mt-4 mb-6 text-gray-600 dark:text-gray-300">
            <div className='flex items-center gap-4'>
              <span className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEye} />
                <span className="text-lg">{article.views}</span>
              </span>
              <span className="flex items-center gap-2 transition">
                <button className='focus:outline-none' onClick={toggleLike}>
                  <FontAwesomeIcon
                    icon={liked ? solidHeart : regularHeart}
                    className={`cursor-pointer transition-all duration-300 ease-in-out ${liked ? "text-red-600 scale-125" : "text-gray-500 scale-100"}`} />
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
              <button onClick={(e) => handleShare(e, 'X')} className="hover:text-black cursor-pointer dark:hover:text-gray-100 hover:scale-110 transition-all duration-200">
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </button>
              <button onClick={(e) => handleShare(e, 'telegram')} className="hover:text-sky-500 cursor-pointer hover:scale-110 transition-all duration-200">
                <FaTelegramPlane size={20} />
              </button>
              <button onClick={(e) => handleShare(e, 'reddit')} className="hover:text-orange-500 cursor-pointer hover:scale-110 transition-all duration-200">
                <FaRedditAlien size={20} />
              </button>
              <button onClick={(e) => handleShare(e, 'linkedin')} className="hover:text-blue-700 cursor-pointer hover:scale-110 transition-all duration-200">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </button>
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
        <div>
          <Image alt='text' src='/images/img.avif' width={350} height={400} />
        </div>
      </div>
      }
    </div>
  );
};

export default Page;
