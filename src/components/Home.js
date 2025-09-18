import Item from "./Item";

const Home = ({filtered}) => {
  let alphabets = [
    "#",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let lastInitial = "";

  const scrollToLetter = (letter) => {
    const section = document.getElementById(`letter-${letter}`);
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div className="sticky top-12 px-10 bg-gray-100 text-black dark:text-white dark:bg-black w-full flex items-center sm:flex-row gap-6 md:gap-1 flex-col py-4">
        <div className="flex flex-wrap mx-1 sm:mx-10 gap-x-4 md:gap-x-8 gap-y-2">
          {alphabets.map((alpha) => (
            <button
              onClick={() => { scrollToLetter(`${alpha.toUpperCase()}`) }}
              className="text-xl cursor-pointer hover:font-bold bg-gradient-to-r hover:from-blue-800 to-purple-800 bg-clip-text hover:text-transparent"
              key={alpha}
            >
              {alpha}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 py-8 lg:px-36 md:px-20 md:py-16">
        {filtered.map((item, index) => {
          let currentInitial = item.term[0].toUpperCase();
          if (/\d/.test(currentInitial)) {
            currentInitial = "#";
          }
          const newalpha = lastInitial !== currentInitial;
          let border = newalpha;
          if (index === 0) {
            border = false;
          }
          lastInitial = currentInitial;
          return (
            <div
              key={index}
              id={`letter-${currentInitial}`}
              className={`flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-36 py-2 ${border ? "border-t border-zinc-400 mt-14 pt-14" : ""
                }`}
            >
              <h1
                className={`font-extrabold text-5xl sm:text-7xl flex px-6 text-stroke-light
                   ${!newalpha ? "hidden md:invisible md:block" : ""}`}
              >
                {currentInitial}
              </h1>
              <Item item={item} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
