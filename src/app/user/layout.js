import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/Providers";
// import { ToastContainer } from "react-toastify";
import UserNav from "@/components/User/UserNav";
import UserFooter from "@/components/User/footer/UserFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "WSO",
    description: "World Spice Organization (WSO)",
};

export default function Layout({ children }) {
    return (
        <>
            <div className="w-full bg-white">
                <UserNav />
            </div>
            <div>
                {/* <ToastContainer /> */}
                {children}
            </div>
            <div>
                <UserFooter />
            </div>
        </>
    );
}
