import AdMedia from "./AdMedia";

const NativeAdListItem = ({ ad }) => (
  <div>
    <li className="flex flex-col mx-auto md:flex-row items-start gap-4 bg-white dark:bg-zinc-900 overflow-hidden">
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="w-full md:w-auto"
        aria-label={`Sponsored: ${ad.title}`}
      >
        <div className="relative flex-shrink-0 w-full md:w-68 h-72 sm:h-80 md:h-44">
          <AdMedia
            ad={ad}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute bottom-3 right-3 flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-xs font-medium px-2 py-1 shadow">
            Sponsored
          </div>
        </div>
      </a>
      <div className="flex flex-col justify-between flex-1">
        <a href={ad.link} target="_blank" rel="noopener noreferrer sponsored">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-none md:line-clamp-2 hover:underline">
            {ad.title}
          </h3>
        </a>
        <p className="text-sm text-gray-900 dark:text-white line-clamp-none md:line-clamp-3 mt-1">
          {ad.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mt-2 md:mt-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Promoted</span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-blue-800 dark:text-purple-300 font-medium">
            {ad.ctaText || "Learn more"} →
          </span>
        </div>
      </div>
    </li>
  </div>
);

export default NativeAdListItem;
