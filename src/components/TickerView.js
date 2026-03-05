import React, { useEffect, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { useCurrency } from "@/context/CurrencyContext";
import useExchangeRates from "@/app/hooks/useExchangeRates";

const TickerView = ({ node }) => {

  const { currency } = useCurrency();
  const { symbol } = node.attrs;
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [url, setUrl] = useState("");
  const { rates, ratesLoading } = useExchangeRates();

  const convertPrice = (usdPrice) => {
    if (!usdPrice) return "--";

    const numericPrice = Number(String(usdPrice).replace(/,/g, ""));
    if (isNaN(numericPrice)) return "--";

    if (currency === "USD" || !rates[currency]) {
      return numericPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    const converted = numericPrice * rates[currency];
    return converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  function currencySymbol(curr) {
    switch (curr) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "PKR": return "₨";
      case "INR": return "₹";
      case "JPY": return "¥";
      case "CNY": return "¥";
      case "CAD": return "C$";
      case "AUD": return "A$";
      case "CHF": return "CHF";
      case "AED": return "د.إ";
      case "SAR": return "﷼";
      case "TRY": return "₺";
      case "ZAR": return "R";
      default: return "$";
    }
  }

  const fetchPrice = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CRYPTO_DATA_URL}/api/crypto/top/10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "source": "user",
          },
        }
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.tickers)) {
        const coin = data.tickers.find(
          (c) => c.symbol.toUpperCase() === symbol.toUpperCase()
        );
        if (coin) {
          const newPrice = coin.price ? Number(coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null;
          const newChange = Number(coin.percent_change_24h);
          const newMarketCap = coin.market_cap ? Number(coin.market_cap).toLocaleString() : null;

          if (price && newPrice !== price) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 400);
          }
          setPrice(newPrice);
          setChange(newChange);
          setMarketCap(newMarketCap);
          setUrl(coin.coinrankingUrl);
        }
      }
    } catch (err) {
      console.error("Error fetching ticker:", err);
    }
  };

  useEffect(() => {
    if (!symbol) return;
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [symbol, price]);

  const isUp = change > 0;

  return (
    <NodeViewWrapper
      as="span"
      contentEditable={false}
      className="relative inline-flex items-center mx-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold transition-all duration-300 ease-in-out no-underline cursor-pointer select-none
          ${isUp
            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60"
            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/60"}
          ${animate ? "scale-110" : "scale-100"}`}
        style={{ textDecoration: "none" }}
        onClick={() => window.open(url, "_blank")}
      >
        <span className="uppercase mr-1">{symbol}</span>
        <span className={`text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>
          {isUp ? "▲" : "▼"}
        </span>
        <span className="ml-1">
          {currencySymbol(currency)}
          {convertPrice(price) || "--"}
        </span>
      </span>
      {showTooltip && (
        <span
          className="absolute left-1/2 bottom-full z-50 mb-2 -translate-x-1/2
            bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
            border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-3 w-60
            text-xs text-left transition-all duration-200"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="relative">
            <strong className="block mb-1 text-gray-900 dark:text-gray-100">
              {symbol} Overview
            </strong>
            <span className="block mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                24h Change:
              </span>{" "}
              <span
                className={`${isUp ? "text-green-600" : "text-red-600"} font-semibold`}
              >
                {isUp ? "▲" : "▼"} {change ? `${change.toFixed(2)}%` : "--"}
              </span>
            </span>
            <span className="block mb-3">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Market Cap:
              </span>{" "}
              {marketCap ? `${currencySymbol(currency)} ${convertPrice(marketCap)}` : "--"}
            </span>
            <button
              className="inline-block w-full text-center bg-gradient-to-r from-blue-800 to-purple-800 hover:from-purple-800 hover:to-blue-800 text-white py-2 rounded-md text-md font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(url, "_blank");
              }}
            >
              View more
            </button>
          </span>
        </span>
      )}
    </NodeViewWrapper>
  );
};

export default TickerView;
