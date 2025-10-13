import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "@/context/SearchContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Ticker from '@/components/Ticker';

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
              {children}
            </CurrencyProvider>
          </SearchProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
