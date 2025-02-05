import Image from "next/image";
import React from "react";
import LandingImage from "@/../../public/Assets/user/home/landingBg.png";

const LandingPage = () => {
  return (
    <div className="relative w-screen h-[60vh] md:h-[120vh] mt-0 overflow-hidden bg-contain bg-center bg-[url('/Assets/banner.jpg')]">


      <div className="max-w-[1280px] w-full h-full text-white flex flex-col items-start sm:justify-center mx-auto p-3 z-10 mt-12 sm:mt-0">
        <h1 data-aos='fade-up' data-aos-duration='700' className="text-3xl md:text-7xl"></h1>
        <h1 data-aos='fade-up' data-aos-duration='700' className="text-3xl md:text-7xl">
          {/* <span className="italic  font-bold">Spice</span> Organisation */}
        </h1>
        <p data-aos='fade-up' data-aos-duration='700' className="mt-5 sm:w-1/2 text-wrap text-xs sm:text-sm">
          {/* The World Spice Organisation is a collaborative platform that unites
          all stakeholders in the spice industry—farmers, processors, academics,
          and end-users. Its mission is to work collectively towards sustainable
          development. */}
        </p>
        <p data-aos='fade-up' data-aos-duration='700' className="mt-5 sm:w-1/2 text-wrap text-xs sm:text-sm">
          {/* improving agricultural practices, processing methods, research,
          education, and product quality across the entire spice supply chain. */}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
