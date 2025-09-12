import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSearch } from "@/context/SearchContext";

const Item = ({ item }) => {

  const [showExample, setshowExample] = useState(false);
  const { searchQuery } = useSearch();

  const toggleExamples = () => {
    setshowExample(!showExample);
  };

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
    <button onClick={toggleExamples} className="cursor-pointer w-full hover:bg-gray-100 text-black dark:hover:bg-zinc-950 dark:text-white text-start p-6 rounded-2xl transition flex flex-col gap-2">
      <div className="flex justify-between text-xl sm:text-3xl font-bold">
        {highlightText(item.term, searchQuery)}
        <span className={`text-zinc-500 -mt-1 transition-transform duration-300 `}>
        {showExample ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
        </span>
      </div>
      <p className="text-sm sm:text-lg">{highlightText(item.definition, searchQuery)}</p>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showExample ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm sm:text-lg">Example:</p>
        <div className={`pl-4 pt-2 flex flex-col gap-1 text-xs sm:text-base`}>
          {item.examples.map((example, index) => (
            <p key={index}>• {example}</p>
          ))}
        </div>
      </div>
    </button>
  )
}

export default Item