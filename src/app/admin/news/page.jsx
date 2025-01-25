import Link from "next/link";
import NewsTable from "@/components/Admin/News/NewsTable";

 function Page() {


  return (
    <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 py-12 max-md:pt-16 text-black">
      <div className="flex justify-between">
        <h1 className="font-semibold text-title">News</h1>
        <div className="sm:hidden">
          <Link href="/admin/news/add">
            <button className="bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg">
              Add news
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full border border-gray-400 rounded-xl overflow-clip mt-5">
        <div className="flex p-5 items-center justify-between">
          <div>
            <h2 className="font-semibold text-xl">Current news</h2>
            <h5 className="pt-1">News are managed here</h5>
          </div>
          <div className="max-sm:hidden">
            <Link href="/admin/news/add">
              <button className="bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg">
                Add news
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full max-md:overflow-x-scroll">
          <NewsTable/>
        </div>
      </div>
    </div>
  );
}

export default Page;
