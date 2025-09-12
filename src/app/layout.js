import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "@/context/SearchContext";
import { CategoryProvider } from "@/context/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto News",
  description: "Latest crypto news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CategoryProvider>
          <SearchProvider>
            <ToastContainer />
            <Navbar />
            {children}
          </SearchProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
