import AdMedia from "./AdMedia";

const NativeAdGridCard = ({ ad }) => (
  <a
    href={ad.link}
    target="_blank"
    rel="noopener noreferrer sponsored"
    aria-label={`Sponsored: ${ad.title}`}
    className="transition duration-300 overflow-hidden flex flex-col border-b pb-6 pt-2 border-zinc-200 dark:border-zinc-800"
  >
    <div className="relative w-full h-68">
      <AdMedia ad={ad} className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
      <div className="absolute top-3 right-3 inline-flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white text-xs font-medium px-2 py-1 rounded-md shadow w-fit">
        Sponsored
      </div>
    </div>
    <div className="mt-4 flex flex-col justify-between flex-1">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
        {ad.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {ad.description}
      </p>
      <div className="flex items-center justify-between mt-4 text-md mx-1 text-gray-500 dark:text-gray-400">
        <span>Promoted</span>
        <span className="text-sm font-medium text-blue-800 dark:text-purple-300">
          {ad.ctaText || "Learn more"} →
        </span>
      </div>
    </div>
  </a>
);

export default NativeAdGridCard;
