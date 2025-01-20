import HomePage from '@/components/User/home/page'
import UserNav from "@/components/User/UserNav";
import UserFooter from "@/components/User/footer/UserFooter";

export default function Page() {
  return (
    <>
      <div className="w-full bg-transparent flex items-center justify-center">
        <UserNav />
      </div>

      {/* User Side */}
      <div className="">
        <HomePage />
      </div>

      <div>
        <UserFooter />
      </div>
    </>

  );
}
