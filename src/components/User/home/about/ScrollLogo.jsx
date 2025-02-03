'use client'
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getAllCompany } from "@/utils/Endpoint";

const ScrollLogo = () => {
  const [data, setData] = useState([]);
  const marqueeAnimation = {
    x: ['-100%', '0%'],
    transition: {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    }
  }
  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(getAllCompany);
      if (response.status === 200) {
        const data = response?.data?.result || [];
        console.log(response?.data?.result);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="w-full overflow-hidden mt-10 ">
      <h1 className="mb-5 lg:mb-10 text-2xl font-[400]">Our Members</h1>

      {
        data?.length > 0
          ?
          <div className="containerMarquee">
            <motion.div animate={marqueeAnimation} className="marquee">
              {data.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc?.logo?.location}
                  alt={`Image ${index + 1}`}
                  className="brand "
                />
              ))}
            </motion.div>
            <motion.div animate={marqueeAnimation} className="marquee">
              {data.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc?.logo?.location}
                  alt={`Image ${index + 1}`}
                  className="brand"
                />
              ))}
            </motion.div>
            <motion.div animate={marqueeAnimation} className="marquee">
              {data.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc?.logo?.location}
                  alt={`Image ${index + 1}`}
                  className="brand"
                />
              ))}
            </motion.div>
          </div>
          :
          <p className="">No Data Available</p>
      }
    </div>
  );
};

export default ScrollLogo;




