"use client";
import { useEffect, useState } from "react";

export function usePlacementAds(placement) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAds = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ads?placement=${placement}`,
          { method: "GET" }
        );
        const data = await response.json();
        if (isMounted && data.success) {
          setAds(data.ads || []);
        }
      } catch (error) {
        console.error(`Error fetching ${placement} ads:`, error);
        if (isMounted) setAds([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAds();
    return () => {
      isMounted = false;
    };
  }, [placement]);

  return { ads, loading };
}
