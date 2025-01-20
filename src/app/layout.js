import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { ToastContainer } from "react-toastify";
import AOSInitializer from "@/components/AOSInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WSO",
  description: "World Spice Organization (WSO)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <AOSInitializer />
            <ToastContainer />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
