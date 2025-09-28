"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin, SiBinance, SiSolana, SiTether, SiRipple, SiCardano, SiTrove } from "react-icons/si";
import { FaDog } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function Ticker() {
    const [coins, setCoins] = useState([]);
    const [paused, setPaused] = useState(false);
    const contentRef = useRef(null);
    const [anim, setAnim] = useState({ distance: 1000, duration: 30 });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crypto/ticker`,
                    {
                        headers: {
                            source: "user"
                        },
                    }
                );
                const data = await response.json();
                console.log(data)
                if (data.success) {
                    setCoins(data.tickers);
                }
            } catch (err) {
                console.error("Error fetching ticker:", err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            const width = contentRef.current.offsetWidth;
            setAnim({ distance: width, duration: width / 40 });
        }
    }, [coins]);

    const getIcon = (symbol) => {
        switch (symbol.toUpperCase()) {
            case "BTC":
                return <FaBitcoin className="text-yellow-400" />;
            case "ETH":
                return <FaEthereum className="text-blue-400" />;
            case "LTC":
                return <SiLitecoin className="text-gray-400" />;
            case "XRP":
                return <SiRipple className="text-sky-500" />;
            case "USDT":
                return <SiTether className="text-green-500" />;
            case "BNB":
                return <SiBinance className="text-yellow-500" />;
            case "SOL":
                return <SiSolana className="text-purple-500" />;
            case "USDC":
                return <AiOutlineDollarCircle className="text-blue-400" />;
            case "DOGE":
                return <FaDog className="text-yellow-600" />;
            case "TRX":
                return (
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-600"
                        aria-hidden="true"
                        role="img"
                    >
                        <circle cx="16" cy="16" r="14.5" fill="currentColor" />
                        <polygon
                            points="8.5,7.87 15.43,26.13 25.5,13.54 22.16,10.26"
                            fill="#ffffff"
                        />
                        <polygon
                            points="15.43,26.13 17,14.8 22.16,10.26"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "ADA":
                return <SiCardano className="text-blue-600" />;
            default:
                return <span className="w-4 h-4 rounded-full bg-gray-400" />;
        }
    };

    return (
        <div
            className="w-full pt-16 overflow-hidden border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="flex whitespace-nowrap animate-marquee"
                style={{
                    "--distance": `-${anim.distance}px`,
                    "--duration": `${anim.duration}s`,
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                <div ref={contentRef} className="flex items-center text-sm text-black dark:text-white">
                    {coins.map((coin) => (
                        <a
                            key={coin.id}
                            href={`https://coinmarketcap.com/currencies/${coin.slug || coin.symbol?.toLowerCase()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        >
                            {getIcon(coin.symbol)}
                            <span className="font-semibold">{coin.symbol}</span>
                            <span className="text-sm">
                                ${coin.quote?.USD?.price?.toFixed(2)}
                            </span>
                            <div className="flex gap-1 items-center">
                                <span
                                    className={`text-sm font-medium ${coin.quote?.USD?.percent_change_24h > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {coin.quote?.USD?.percent_change_24h > 0 ? <span>▲</span> : <span>▼</span>}
                                </span>
                                <span
                                    className={`text-sm font-medium ${coin.quote?.USD?.percent_change_24h > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {coin.quote?.USD?.percent_change_24h?.toFixed(2)}%
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="flex items-center text-sm text-black dark:text-white">
                    {coins.map((coin) => (
                        <a
                            key={`${coin.id}-copy`}
                            href={`https://coinmarketcap.com/currencies/${coin.slug || coin.symbol?.toLowerCase()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        >
                            {getIcon(coin.symbol)}
                            <span className="font-semibold">{coin.symbol}</span>
                            <span className="text-sm">
                                ${coin.quote?.USD?.price?.toFixed(2)}
                            </span>
                            <div className="flex gap-1 items-center">
                                <span
                                    className={`text-sm font-medium ${coin.quote?.USD?.percent_change_24h > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {coin.quote?.USD?.percent_change_24h > 0 ? <span>▲</span> : <span>▼</span>}
                                </span>
                                <span
                                    className={`text-sm font-medium ${coin.quote?.USD?.percent_change_24h > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {coin.quote?.USD?.percent_change_24h?.toFixed(2)}%
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(var(--distance)); }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
      `}</style>
        </div>
    );
}
