"use client";
import { useState } from "react";
import AboutBanner from "@/../public/Assets/user/about_us/about_us.png";
import MembersBanner from "@/../public/Assets/user/about_us/manage_members.png";
import Image from "next/image";
import AboutContent from "@/components/User/about/AboutContent";

function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [
    AboutBanner,
    AboutBanner,
    AboutBanner,
    AboutBanner,
    MembersBanner,
  ];
  return (
    <div className="max-w-[1280px] max-lg:w-10/12 max-sm:w-full mx-auto relative flex flex-col p-3 my-5 mb-10 md:mb-20">
      <h1 data-aos='fade-up' data-aos-duration='700' className="text-[#101828] font-bold text-2xl self-start  mb-5">About Us</h1>
      <Image data-aos='fade-up' data-aos-duration='700' className="w-full" src={banners[currentIndex]} />
      <AboutContent
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default Page;
