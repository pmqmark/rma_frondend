import RmaPrivilegeCard from "@/components/User/rmaprivilege/RmaPrivilegeCard";
import AboutPart from "@/components/User/home/about/AboutPart";
import Contact from "@/components/User/home/about/Contact";
import LatestNews from "@/components/User/home/about/LatestNews";
import LandingPage from "@/components/User/home/LandingPage";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 pb-20">
      <LandingPage />
      <div className="">
        <AboutPart />
      </div>
      <div className="">
        <LatestNews />
        <RmaPrivilegeCard />
      </div>
      <div className="">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
