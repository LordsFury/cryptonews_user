export function interleaveWithAds(
  items,
  ads,
  { interval = 5, startAfter = 5 } = {}
) {
  if (!items?.length) return [];

  const uniqueAds = [
    ...new Map(
      (ads || []).map((ad) => [String(ad._id), ad])
    ).values(),
  ];

  if (!uniqueAds.length) {
    return items.map((data) => ({ type: "article", data }));
  }

  const result = [];
  let adIndex = 0;
  let articleCount = 0;

  items.forEach((item) => {
    result.push({ type: "article", data: item });
    articleCount += 1;

    const pastFirstSlot = articleCount >= startAfter;
    const onAdSlot =
      articleCount === startAfter ||
      (articleCount > startAfter && (articleCount - startAfter) % interval === 0);

    if (pastFirstSlot && onAdSlot && adIndex < uniqueAds.length) {
      result.push({
        type: "ad",
        data: uniqueAds[adIndex],
        key: `ad-${uniqueAds[adIndex]._id}-${adIndex}`,
      });
      adIndex += 1;
    }
  });

  return result;
}
