import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export default function CurrencySelector({ currency, setCurrency }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currencies = [
        { value: "USD", label: "US Dollar", country: "US" },
        { value: "EUR", label: "Euro", country: "EU" },
        { value: "GBP", label: "British Pound", country: "GB" },
        { value: "PKR", label: "Pakistani Rupee", country: "PK" },
        { value: "INR", label: "Indian Rupee", country: "IN" },
        { value: "JPY", label: "Japanese Yen", country: "JP" },
        { value: "CNY", label: "Chinese Yuan", country: "CN" },
        { value: "CAD", label: "Canadian Dollar", country: "CA" },
        { value: "AUD", label: "Australian Dollar", country: "AU" },
        { value: "CHF", label: "Swiss Franc", country: "CH" },
        { value: "AED", label: "UAE Dirham", country: "AE" },
        { value: "SAR", label: "Saudi Riyal", country: "SA" },
        { value: "TRY", label: "Turkish Lira", country: "TR" },
        { value: "ZAR", label: "South African Rand", country: "ZA" },
    ];

    const selected = currencies.find((c) => c.value === currency) || currencies[0];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropdownRef.current) return;

            if (dropdownRef.current.contains(e.target)) return;
            const clickedScrollbar =
                window.innerWidth - e.clientX <= 16 || 
                window.innerHeight - e.clientY <= 16;  

            if (clickedScrollbar) return;
            setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="absolute top-16 right-0 z-10">
            <div className="relative" ref={dropdownRef}>
                <button onClick={() => setOpen(!open)} className="flex items-center justify-between cursor-pointer w-20 md:w-26 px-3 py-1.5 transition-all duration-200 shadow-sm bg-white dark:bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <ReactCountryFlag countryCode={selected.country} svg
                            style={{
                                width: "1.5em",
                                height: "1.1em",
                                borderRadius: "50%",
                            }} />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {selected.value}
                        </span>
                    </div>
                    <ChevronDown size={16} className={`text-gray-600 dark:text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                    <div className="absolute p-1 right-0 mt-1 w-68 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 animate-in fade-in slide-in-from-top-2">
                        {currencies.map((item) => (
                            <button key={item.value} onClick={() => {
                                setCurrency(item.value);
                                setOpen(false);
                            }}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm transition rounded-md hover:bg-gradient-to-r from-blue-800 to-purple-800 text-black dark:text-white hover:text-white">
                                <div className="flex items-center gap-3">
                                    <ReactCountryFlag countryCode={item.country} svg style={{ width: "2em", height: "1.5em", borderRadius: "50%" }} />
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium">
                                            {item.value}
                                        </span>
                                        <span className="text-xs">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                                {item.value === currency && (
                                    <Check className="text-blue-500 dark:text-blue-400" size={16} />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
