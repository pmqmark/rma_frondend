'use client'
import React, { useEffect } from "react";
import { motion } from 'framer-motion'
import { imgs } from "@/data/logo";

const ScrollLogo = () => {
  const marqueeAnimation = {
    x: ['-100%', '0%'],
    transition: {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    }
  }



  return (
    <div className="w-full overflow-hidden mt-10 ">
      <h1 className="mb-5 lg:mb-10 text-2xl font-[400]">Our Members</h1>
      <div className="containerMarquee">
        <motion.div animate={marqueeAnimation} className="marquee">
          {imgs.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className="brand "
            />
          ))}
        </motion.div>
        <motion.div animate={marqueeAnimation} className="marquee">
          {imgs.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className="brand"
            />
          ))}
        </motion.div>
        <motion.div animate={marqueeAnimation} className="marquee">
          {imgs.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className="brand"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollLogo;
