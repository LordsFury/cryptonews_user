"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function LoginModal({ isOpen, onClose, mode, setMode }) {
    const modalRef = useRef(null);
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
                setFormData({ username: "", email: "", password: "" });
                setErrors({ username: "", email: "", password: "" });
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (mode === 'signup') {
            let errorMsg = "";

            if (name === "username") {
                if (value.length < 5) {
                    errorMsg = "Username must be at least 5 characters long";
                } else if (!/^[a-zA-Z]/.test(value)) {
                    errorMsg = "Username must start with a letter";
                } else if (!/^[a-zA-Z][a-zA-Z0-9._]+$/.test(value)) {
                    errorMsg = "Username can only contain letters, numbers, underscores, and dots";
                }
            }

            if (name === "email") {
                if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMsg = "Enter a valid email address";
                }
            }

            if (name === "password") {
                if (value.length < 8) {
                    errorMsg = "Password must be at least 8 characters";
                } else if (!/[A-Z]/.test(value)) {
                    errorMsg = "Password must contain at least one uppercase letter";
                } else if (!/[a-z]/.test(value)) {
                    errorMsg = "Password must contain at least one lowercase letter";
                } else if (!/[0-9]/.test(value)) {
                    errorMsg = "Password must contain at least one number";
                } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    errorMsg = "Password must contain at least one special character";
                }
            }

            setErrors({
                ...errors,
                [name]: errorMsg,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let route = "";
        if (mode === 'login') {
            route = "/api/login";
        }
        else {
            route = "/api/signup"
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const User = await response.json();
        if (User.success) {
            localStorage.setItem("userToken", User.userToken);
            window.dispatchEvent(new Event("storage"));
            toast.dismiss();
            toast.success(`${User.msg}`, { autoClose: 2000 });
            setErrors({username: "", email: "", password: ""});
            setFormData({username: "", email: "", password: ""});
            onClose(false)
        }
        else {
            toast.dismiss();
            toast.error(`${User.msg}`, { autoClose: 2000 });
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div ref={modalRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-gray-800 w-full h-full sm:w-[420px] sm:h-auto p-8 rounded-none sm:rounded-2xl shadow-xl relative">
                        <button onClick={() => { onClose(); setFormData({ username: "", email: "", password: "" }); setErrors({ username: "", email: "", password: "" }); }} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
                            {mode === "login" ? "Welcome Back" : "Create New Account"}
                        </h2>
                        <form className={`flex flex-col ${mode === 'login' ? 'gap-6' : 'gap-4'}`} onSubmit={handleSubmit}>
                            {mode === 'signup' && <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder=" " required className={`peer w-full px-3 pt-5 pb-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-white placeholder-transparent border border-gray-300 dark:border-gray-600 
                     ${errors.username ? 'focus:border-red-500' : 'focus:border-blue-900'} focus:ring-2 ${errors.username ? 'focus:ring-red-500' : 'focus:ring-blue-800'} ${errors.username ? 'dark:focus:border-red-500' : 'dark:focus:border-blue-500'} ${errors.username ? 'dark:focus:ring-red-500' : 'dark:focus:ring-blue-400'} shadow-sm focus:shadow-md transition-all outline-none`} />
                                    <label htmlFor="email" className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 text-sm transition-all
                     peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                     peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-900 dark:peer-focus:text-blue-500">
                                        <FontAwesomeIcon icon={faUser} /> Username
                                    </label>
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 font-semibold text-sm mt-1">{errors.username}</p>
                                )}
                            </div>
                            }
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required className={`peer w-full px-3 pt-5 pb-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-white placeholder-transparent border border-gray-300 dark:border-gray-600 
                     ${errors.email ? 'focus:border-red-500' : 'focus:border-blue-900'} focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-800'} ${errors.email ? 'dark:focus:border-red-500' : 'dark:focus:border-blue-500'} ${errors.email ? 'dark:focus:ring-red-500' : 'dark:focus:ring-blue-400'} shadow-sm focus:shadow-md transition-all outline-none`} />
                                    <label htmlFor="email" className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 text-sm transition-all
                     peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                     peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-900 dark:peer-focus:text-blue-500">
                                        <FontAwesomeIcon icon={faEnvelope} /> Email Address
                                    </label>
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 font-semibold text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=" " required className={`peer w-full px-3 pt-5 pb-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                         text-gray-900 dark:text-white placeholder-transparent border border-gray-300 dark:border-gray-600 
                         ${errors.password ? 'focus:border-red-500' : 'focus:border-blue-900'} focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-800'} ${errors.password ? 'dark:focus:border-red-500' : 'dark:focus:border-blue-500'} ${errors.password ? 'dark:focus:ring-red-500' : 'dark:focus:ring-blue-400'}
                         shadow-sm focus:shadow-md transition-all outline-none`} />
                                    <label htmlFor="password" className="absolute left-3 top-1.5 text-gray-500 dark:text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                         peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-900 dark:peer-focus:text-blue-500">
                                        <FontAwesomeIcon icon={faLock} /> Password
                                    </label>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 font-semibold text-sm mt-1">{errors.password}</p>
                                )}
                            </div>
                            <button type="submit" disabled={mode === 'login' ? false : Boolean(errors.username || errors.email || errors.password)} className="mt-4 bg-gradient-to-r from-blue-800 to-purple-800 text-white py-3 rounded-lg cursor-pointer 
                       font-medium shadow-md hover:shadow-lg hover:scale-[1.01] hover:bg-gradient-to-r hover:from-blue-700 hover:to-purpl-700 transition-all">
                                {mode === 'login' ? 'Login' : 'Signup'}
                            </button>
                        </form>
                        <div className="flex items-center my-5">
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        </div>
                        <button onClick={handleGoogleLogin} className="cursor-pointer flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 
                             w-full py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm">
                            <FcGoogle className="text-xl" />
                            <span className="text-gray-700 dark:text-gray-200 font-medium">
                                Continue with Google
                            </span>
                        </button>
                        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm"> {mode === 'login' ? 'Don’t' : 'Already'} have an account?{" "} <button onClick={() => { mode === 'login' ? setMode("signup") : setMode("login") }} className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"> {mode === 'login' ? 'Sign up' : 'Log in'} </button> </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
