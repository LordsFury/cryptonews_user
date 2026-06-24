import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "@/context/SearchContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Ticker from '@/components/Ticker';
import TopBarAd from '@/components/TopBarAd';

export const metadata = {
  title: "Crypto News",
  description: "Latest crypto news",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <CategoryProvider>
          <SearchProvider>
            <CurrencyProvider>
              <ToastContainer />
              <Navbar />
              <Ticker />
              <main className="relative">
                <TopBarAd />
                {children}
              </main>
            </CurrencyProvider>
          </SearchProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
