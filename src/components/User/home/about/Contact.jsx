import React from "react";
import Image from "next/image";

// Icons from  React Icon
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { TiSocialTwitter } from "react-icons/ti";
import { LuInstagram } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";

// Assets
import element1 from "@/../../public/Assets/user/home/Contact/bottom 1.png";
import element2 from "@/../../public/Assets/user/home/Contact/bottom 2.png";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div data-aos='fade-up' data-aos-duration='700' className="max-w-[1280px] mx-auto w-full px-3 ">
      <div className="flex flex-col md:flex-row items-start justify-center  gap-4">

        {/* Right Side Card */}
        <div className="w-full md:w-2/5 ">
          <div className="bg-primaryColor p-10 rounded-xl w-full text-white relative overflow-hidden">
            {/* Top Part */}
            <h1 className="text-2xl font-semibold">Contact Us</h1>
            <p className="text-sm text-nowrap my-4">
              You can reach us anytime via rma.org
            </p>

            {/* Content */}
            <div className="my-10">
              <div className="flex items-center gap-5 my-5 text-xs font-[200]">
                <FaPhone />
                <h4>+91 00000000</h4>
              </div>
              <div className="flex items-center gap-5 my-5 text-xs font-[200]">
                <MdOutlineMail />
                <h4>rma.org</h4>
              </div>
              <div className="flex  gap-5 my-5 text-xs font-[200]">
                <IoLocation />
                <h4>

                  aluva, <br /> ernakulam, <br />  Kerala 682304
                </h4>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 text-black/70 my-5">
              <div className="bg-white p-1 rounded-full">
                <TiSocialTwitter />
              </div>
              <div className="bg-white p-1 rounded-full">
                <LuInstagram />
              </div>
              <div className="bg-white p-1 rounded-full">
                <FaFacebookF />
              </div>

              {/* Elements  */}
              <div className="absolute bottom-0 right-0 rounded-br-lg">
                <Image
                  src={element1}
                  alt="element1"
                  className="w-36 object-contain"
                />
              </div>
              <div className="absolute bottom-11 right-14">
                <Image
                  src={element2}
                  alt="element1"
                  className="w-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Component */}
        <div className="w-full h-full  flex  items-start justify-start mt-5 md:mt-0 md:px-5">
          <ContactForm />
        </div>

      </div>
    </div>
  );
};

export default Contact;
