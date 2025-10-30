import { useEffect, useState } from "react";

export default function useExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Failed to fetch currency rates:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
    const interval = setInterval(fetchRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { rates, loading };
}
