import React from "react";
import TopBanner from "./TopBanner";
import ScrollLogo from "./ScrollLogo";
import Link from "next/link";

import element1 from "@/../../public/Assets/user/home/Contact/bottom 1.png";
import element2 from "@/../../public/Assets/user/home/Contact/bottom 2.png";

import Image from "next/image";

const AboutPart = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-3 overflow-hidden">
      <div data-aos="fade-up" data-aos-duration="700" className="w-full rounded-xl">
        <TopBanner />
      </div>
      <div className="flex flex-col mb-5 lg:mb-0">
        <h1 data-aos="fade-right" data-aos-duration="700" className="my-5 md:my-8 text-4xl font-[400]">
          About RMA
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Left side text + Scroll option */}
          <div data-aos="fade-up" data-aos-duration="700" className="w-full lg:w-3/5">
            <p className="text-xs md:text-sm text-wrap md:w-[90%] text-black/80">
              The first general body meeting of the Ruwi Malayalee Association was held on 19-01-2024 at the Clock Tower, Ruwi. A 15-member executive committee was elected during this meeting. From this committee, the chief architect Faizal Aluva was elected as the president. Sunil Nair was elected as the general secretary, Santosh as the treasurer, Neetu Jit as the program coordinator, and Binsi Sijo as the general convener of the women&apos;s wing. The executive committee also elected co-officers.
            </p>

            <p className="text-xs md:text-sm text-wrap md:w-[90%] mt-3 text-black/80">
              {/* RMA seeks to identify areas of potential growth, ensure proper allocation of resources, interact with the academia, engage with the governments on legislations and stand by and help the farmer to increase production and productivity through eco-friendly methods. */}
            </p>

            <Link href={`/user/about`} className="bg-primaryColor text-white text-xs md:text-sm p-3 px-5 rounded-lg lg:mt-5 hidden w-fit lg:flex">
              Learn More
            </Link>
          </div>

          {/* Right side Green part */}
          <div data-aos="fade-left" data-aos-duration="700" className="w-full lg:w-2/5 flex items-start justify-center mt-5 lg:mt-0">
            <div className="relative bg-primaryColor p-7 rounded-lg overflow-clip w-full lg:w-3/4">
              <h1 className="text-white font-semibold text-[27px]">
                Want to be a member?
              </h1>
              <p className="my-5 text-white text-xs font-[200]">
              RMA 
              </p>
              <Link href={`/user/membership`} className="p-3 px-5 text-primaryColor rounded-lg font-[600] bg-white text-xs">
                Register as a Member
              </Link>

              {/* Elements */}
              <div className="absolute bottom-0 right-0 rounded-br-lg">
                <Image
                  src={element1}
                  alt="element1"
                  className="w-16 object-contain"
                />
              </div>
              <div className="absolute bottom-6 right-6">
                <Image
                  src={element2}
                  alt="element1"
                  className="w-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-3 lg:w-3/5">
          <ScrollLogo />
        </div>
      </div>

      <Link href={`/user/about`} className="bg-primaryColor text-white text-xs md:text-sm p-3 px-5 rounded-lg lg:mt-5 block w-fit lg:hidden">
        Learn More
      </Link>
    </div>
  );
};

export default AboutPart;
