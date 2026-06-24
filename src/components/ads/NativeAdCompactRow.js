import AdMedia from "./AdMedia";

const NativeAdCompactRow = ({ ad }) => (
  <li className="flex items-center pb-6 border-b border-zinc-200 dark:border-zinc-800">
    <div className="flex-1 mr-2">
      <a href={ad.link} target="_blank" rel="noopener noreferrer sponsored">
        <h3 className="text-sm sm:text-lg text-gray-900 dark:text-gray-100 font-semibold hover:underline line-clamp-2">
          {ad.title}
        </h3>
      </a>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {ad.description}
        </p>
        <div className="text-sm flex flex-col gap-2 text-gray-500 dark:text-gray-300">
          <span className="text-blue-800 dark:text-purple-300 font-medium">
            {ad.ctaText || "Learn more"} →
          </span>
        </div>
        <div className="inline-flex items-center bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-md text-xs font-medium px-2 py-1 shadow w-fit">
          Sponsored
        </div>
      </div>
    </div>
    <a href={ad.link} target="_blank" rel="noopener noreferrer sponsored">
      <div className="relative flex-shrink-0 w-32 h-24 sm:w-44 sm:h-32 overflow-hidden">
        <AdMedia ad={ad} className="object-cover" fill sizes="176px" />
      </div>
    </a>
  </li>
);

export default NativeAdCompactRow;
