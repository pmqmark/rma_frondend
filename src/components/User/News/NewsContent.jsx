'use client';
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import cover from "../../../../public/Assets/user/news/cover.png";
import Link from "next/link";
import { toast } from "react-toastify";
import { baseUrl, getAllNews } from "@/utils/Endpoint";
import Loader from "@/app/loading";

const NewsContent = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    try {
      const res = await fetch(`${baseUrl}${getAllNews}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.news.length > 4) {
          setNews(data.news.slice(0, 4));
        } else {
          setNews(data.news);
        }
        setLoading(false);
      } else {
        toast.error('Failed to load news');
        setLoading(false);
      }
    } catch (error) {
      console.log("error" + error);
      toast.error('Failed to load news');
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef?.slickNext();
  };

  const previous = () => {
    sliderRef?.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    beforeChange: (oldI, newI) => setSlideIndex(newI),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date)) {
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  }

  return (
    loading ? (
      <div className="fixed h-screen w-screen inset-0">
        <Loader />
      </div>
    ) : (
      <div  className="w-full relative">
        <div className=" mx-auto slider-container relative">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {news?.map((item, index) => (
              <div
                key={index}
                onClick={() => console.log("lower")}
                className={`w-full h-[400px] sm:h-[500px]  relative
                  ${index === slideIndex ? "slide slide-active" : "slide"}
                `}
              >
                {item?.thumbnail?.location ? (
                  <img
                    src={`${baseUrl}${item?.thumbnail?.location}`}
                    alt="image"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Image
                    src={cover}
                    alt="image"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}

                <Link
                  href={`/user/news/${item._id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("upper");
                  }}
                  className="absolute top-0 w-full h-[400px] sm:h-[500px] flex flex-col justify-between items-center p-8"
                >
                  <div className="w-full flex flex-col gap-4">
                    <p className="text-white font-semibold line-clamp-2">
                      {item?.title}
                    </p>
                    <span className="w-fit py-1 px-2 rounded-full bg-primaryColor text-sm text-white">
                      {formatDate(item?.createdAt)}
                    </span>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                    className="w-full h-fit text-white text-sm font-light line-clamp-6"
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        <span
          className="z-40 cursor-pointer absolute top-[200px] sm:top-[250px] left-0"
          onClick={previous}
        >
          <IoIosArrowDropleft size={40} color="#266941" />
        </span>
        <span
          className="z-40 cursor-pointer absolute top-[200px] sm:top-[250px] right-0"
          onClick={next}
        >
          <IoIosArrowDropright size={40} color="#266941" />
        </span>
      </div>
    )
  );
};

export default NewsContent;
