"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useCategory } from "@/context/CategoryContext";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import NewsItem from "@/components/NewsItem";
import Image from "next/image";
import Footer from "@/components/Footer";

const Page = () => {
    const { searchQuery } = useSearch();
    const { category } = useCategory();

    const [articles, setArticles] = useState([]);
    const [displayArticles, setDisplayArticles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false)
    const limit = 3;

    const getArticles = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL
                }/api/articles/?category=${encodeURIComponent(category)}`,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const filtered = useMemo(() => {
        const q = (searchQuery || "").toLowerCase();
        let list = articles;
        if (q) {
            list = list.filter((a) => {
                const titleMatch = a.title?.toLowerCase().includes(q);
                const summaryMatch = a.summary?.toLowerCase().includes(q);
                return titleMatch || summaryMatch;
            });
        }
        return list;
    }, [articles, searchQuery]);

    useEffect(() => {
        setDisplayArticles(filtered.slice(0, limit));
        setHasMore(filtered.length > limit);
    }, [filtered, limit]);

    const handleShowMore = () => {
        setDisplayArticles((prev) => {
            const next = filtered.slice(prev.length, prev.length + limit);
            const combined = [...prev, ...next];
            setHasMore(combined.length < filtered.length);
            return combined;
        });
    }

    const handleShowLess = () => {
        setDisplayArticles(filtered.slice(0, limit));
        setHasMore(true);
    }

    return (
        <div className="bg-white dark:bg-zinc-900 min-h-screen">
            {loading && !initialized && <div className="flex justify-center pt-20 p-6">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>}
            {!loading && initialized && displayArticles.length === 0 && (
                <div className="flex flex-col items-center justify-center pt-20 bg-white dark:bg-zinc-900 h-screen text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        No Articles Found
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
                        We couldn’t find any articles matching your request. Try adjusting your
                        filters or search again.
                    </p>
                </div>
            )}
            {initialized && displayArticles.length > 0 && <div className="flex justify-between gap-8 pt-20 px-4 sm:px-6 lg:px-20">
                <div className="lg:max-w-2/3 w-full px-4 sm:px-8 md:px-8 lg:px-2 xl:px-2">
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-3xl font-semibold text-black dark:text-white">
                            Latest {category !== "Latest News" && category} News
                        </h1>
                        <span className="block h-[3px] w-16 rounded-full bg-gradient-to-r from-blue-800 to-purple-800 mt-2"></span>
                    </div>
                    <ul className="flex flex-col gap-12 md:gap-8 lg:gap-8 xl:gap-8">
                        {displayArticles.map((article) => (
                            <NewsItem key={article._id} article={article} />
                        ))}
                    </ul>
                    <div className="flex justify-center lg:justify-end lg:mr-20 items-center mt-8">
                        <button onClick={hasMore ? handleShowMore : handleShowLess} className="flex items-center gap-1 px-3 py-2 cursor-pointer text-sm bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white text-black font-medium rounded-lg shadow-md">
                            <span>Show {hasMore ? 'more' : 'less'}</span>
                            {hasMore ? <ArrowDown size={20} /> : <ArrowUp />}
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Image alt='text' src='/images/img.avif' width={350} height={400} />
                    <Image alt='text' src='/images/img.avif' width={350} height={400} />
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Page;
