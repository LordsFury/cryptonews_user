"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMoon, faSun, faBars, faXmark, faAngleDown, faSignInAlt, faUserPlus, faSignOutAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Banknote, BitcoinIcon, BookOpenIcon, Code2, Layers3, Shield } from "lucide-react";
import { FaEthereum } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { useSearch } from "@/context/SearchContext";
import { categories } from "@/Data/categories";
import { useCategory } from "@/context/CategoryContext";

const iconMap = {
  LatestNews: (props) => <FontAwesomeIcon icon={faNewspaper} {...props} />,
  Bitcoin: (props) => <BitcoinIcon {...props} />,
  Ethereum: (props) => <FaEthereum {...props} />,
  Altcoins: (props) => <Code2 {...props} />,
  Blockchain: (props) => <Banknote {...props} />,
  Regulations: (props) => <Shield {...props} />,
  Market: (props) => <Layers3 {...props} />,
};

const Navbar = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userToken, setuserToken] = useState(null);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  const [modalMode, setModalMode] = useState("login");
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showLearnMenu, setShowLearnMenu] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { setCategory } = useCategory();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
    const handleStorageChange = () => setuserToken(localStorage.getItem("userToken"));
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    }
    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal])


  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openModal = () => setModal(!modal);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setuserToken(null);
  };

  return (
    <div>
      <nav className="bg-gray-100 backdrop-blur-md shadow dark:bg-gray-900 fixed top-0 w-full z-50">
        <div className="mx-auto px-8 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
            Logo
          </Link>
          <div className="relative group">
            <span
              className="cursor-pointer text-gray-900 hidden lg:flex dark:text-white text-xl font-medium bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text group-hover:text-transparent transition duration-300">
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-800 to-purple-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              News
            </span>
            <div className="absolute -left-10 mt-2 w-48 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition ease-in duration-300">
              <ul className="py-2 px-2">
                {categories.map((category) => {
                  const OptionIcon = category.icon ? iconMap[category.icon] : null;
                  return (
                    <li key={category.id}>
                      <button
                        className="cursor-pointer flex items-center gap-2 w-full text-left px-2 py-2 rounded-sm hover:bg-gradient-to-r hover:from-blue-800 hover:to-purple-800 hover:text-white"
                        onClick={() => { setCategory(category.name); router.push(`/news/${category.name}`) }}>
                        {OptionIcon && <OptionIcon className="h-5 w-5" />}
                        <span>{category.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="relative group">
            <span
              className="cursor-pointer text-gray-900 hidden lg:flex dark:text-white text-xl font-medium bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text group-hover:text-transparent transition duration-300">
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-800 to-purple-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              Learn
            </span>
            <div className="absolute -left-10 mt-2 w-36 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition ease-in duration-300">
              <ul className="py-2 px-2">
                <li>
                  <button
                    onClick={() => { router.push("/glossary") }}
                    className="cursor-pointer flex items-center gap-2 w-full text-left px-2 py-2 rounded-sm hover:bg-gradient-to-r hover:from-blue-800 hover:to-purple-800 hover:text-white">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>Glossary</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <Link
            href="/about"
            className="text-gray-900 hidden lg:flex group relative dark:text-white text-xl font-medium bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text hover:text-transparent transition duration-300">
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-800 to-purple-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            About
          </Link>
          <div className="relative lg:w-2/5 xl:w-2/5 w-1/2">
            <div className="flex items-center bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full px-4 py-2 shadow-md border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Cryptonews..."
                className="bg-transparent outline-none text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 w-full"
                name="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6 text-md font-bold">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1 px-2 py-2 rounded-full text-lg text-white bg-gradient-to-r from-gray-600 to-gray-900 dark:from-yellow-500 dark:to-orange-500 transition-all">
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            {userToken ? <div className="cursor-pointer font-medium flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-orange-600 text-white px-3 py-1 rounded-lg text-md transition-all duration-300">
              <button onClick={handleLogout} className="cursor-pointer">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div> : <button
              onClick={() => { openModal(); setModalMode("login"); }}
              className="cursor-pointer font-medium flex items-center justify-center gap-1 bg-gradient-to-r from-blue-800 to-purple-800 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-md transition-all duration-300">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </button>}
            {!userToken && <button
              onClick={() => { openModal(); setModalMode("signup"); }}
              className="cursor-pointer font-medium flex items-center justify-center gap-1 bg-gradient-to-r from-blue-800 to-purple-800 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-md transition-all duration-200">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Signup</span>
            </button>}
          </div>
          <div className="lg:hidden p-2 bg-gradient-to-r from-blue-800 to-purple-800">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} style={{ fontSize: "20px" }} className="text-white" />
            </button>
          </div>
        </div>
        <div className={`lg:hidden fixed border-t-2 border-gray-200 dark:border-gray-800 ${menuOpen ? 'top-14' : 'top-0'} left-0 w-full h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 text-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="lg:hidden">
            <button onClick={() => setShowNewsMenu(!showNewsMenu)} className="w-full flex py-4 justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-900 dark:text-white text-xl font-medium">
                News
              </span>
              <span className={`text-gray-900 dark:text-white -mt-1 transform transition-transform duration-300 ${showNewsMenu ? "rotate-180" : "rotate-0"}`}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
            <ul className={`flex flex-col px-2 overflow-hidden transition-all duration-500 ${showNewsMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`} >
              {categories.map((category) => {
                const OptionIcon = iconMap[category.icon];
                return (
                  <li key={category.id}>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-white transition-all duration-300 ease-in-out"
                      onClick={() => { setCategory(category.name); router.push(`/news/${category.name}`) }}>
                      {OptionIcon && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300">
                          <OptionIcon className="h-4 w-4" />
                        </span>
                      )}
                      <span className="font-medium tracking-wide">{category.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setShowLearnMenu(!showLearnMenu)}
              className="w-full py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-900 dark:text-white text-xl font-medium">
                Learn
              </span>
              <span className={`text-gray-900 dark:text-white -mt-1 transform transition-transform duration-300 ${showLearnMenu ? "rotate-180" : "rotate-0"}`}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
            <ul className={`flex flex-col px-2 overflow-hidden transition-all duration-500 ${showLearnMenu ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <li>
                <button
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-gray-700 dark:text-white transition duration-300"
                  onClick={() => {
                    toggleMenu();
                    router.push("/glossary");
                  }}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">
                    <BookOpenIcon className="h-4 w-4" />
                  </span>
                  <span className="font-medium tracking-wide">Glossary</span>
                </button>
              </li>
            </ul>
          </div>
          <Link onClick={toggleMenu} href="/admin/create" className="block text-xl font-medium py-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
            About
          </Link>
          <button
            onClick={toggleDarkMode}
            className="my-6 mt-20 flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-white bg-gradient-to-r from-gray-700 via-black to-gray-900 dark:from-yellow-500 dark:via-orange-600 dark:to-orange-500 w-full font-medium"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {userToken ? <div className="my-6 flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-xl font-medium">
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div> : <button
            onClick={() => { openModal(); setModalMode("login") }}
            className="my-6 flex justify-center items-center gap-2 w-full bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white px-5 py-2 rounded-xl font-medium">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Login</span>
          </button>}
          {!userToken && <button
            onClick={() => { openModal(); setModalMode("signup") }}
            className="flex justify-center items-center gap-2 w-full  bg-gradient-to-r from-blue-800 via-blue-700 to-purple-800 text-white px-5 py-2 rounded-xl font-medium">
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Signup</span>
          </button>}
        </div>
      </nav>
      <LoginModal isOpen={modal} onClose={() => setModal(false)} mode={modalMode} setMode={setModalMode} />

    </div>
  );
};

export default Navbar;
