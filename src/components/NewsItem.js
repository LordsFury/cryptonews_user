import React from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

const NewsItem = ({ article }) => {
    const { searchQuery } = useSearch();

    const publishedTime = article.publishedAt ? new Date(article.publishedAt).getTime() : null;
    const editedTime = article.editedAt ? new Date(article.editedAt).getTime() : null;
    let isSame = false;
    if (publishedTime && editedTime && editedTime > publishedTime) {
        isSame = true;
    }

    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        const highlighted = text.replace(
            regex,
            `<span class="bg-yellow-300 dark:bg-teal-600">$1</span>`
        );
        return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        <div>
            <li className="flex flex-col mx-auto md:flex-row items-start gap-4 bg-white dark:bg-zinc-900 overflow-hidden">
                <Link
                    href={`/news/id/${article._id}`}
                    className="w-full md:w-auto">
                    <div className="relative flex-shrink-0 w-full md:w-68 h-72 sm:h-80 md:h-44">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-xs font-medium px-2 py-1 shadow">
                            {article.category.name}
                        </div>
                    </div>
                </Link>
                <div className="flex flex-col justify-between flex-1">
                    <Link href={`/news/id/${article._id}`}>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-none md:line-clamp-2 hover:underline">
                            {highlightText(article.title, searchQuery)}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-900 dark:text-white line-clamp-none md:line-clamp-3 mt-1">
                        {highlightText(article.summary, searchQuery)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mt-2 md:mt-3">
                        <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(article.publishedAt), {
                                addSuffix: true,
                            })}
                        </span>
                        <span className="text-gray-400 hidden sm:inline">|</span>
                        <h1 className="text-gray-700 dark:text-gray-200 font-medium">
                            By {article.author}
                        </h1>
                    </div>
                    {isSame && (
                        <span className="text-sm text-gray-500">
                            Last Updated:{" "}
                            {new Date(article.editedAt).toLocaleDateString("en-GB").replace(/\//g, "-")}{" "}
                            {new Date(article.editedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true, })}
                        </span>
                    )}
                    <div className="flex items-center mt-2 md:mt-3 text-gray-600 dark:text-gray-300 gap-3">
                        <FontAwesomeIcon icon={faEye} />
                        <span>{article.views}</span>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default NewsItem;
