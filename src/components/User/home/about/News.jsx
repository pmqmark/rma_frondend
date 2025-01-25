import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import cover from "../../../../../public/Assets/user/news/cover.png";
import { baseUrl } from "@/utils/Endpoint";

const NewsComponent = ({ News }) => {

  return (
    <>
      {
        News?.length > 0
          ?
          News?.map((item) => {
            const date = new Date(item?.createdAt);
            let formattedDate = null;
            if (!isNaN(date)) {
              const day = String(date.getUTCDate()).padStart(2, '0');
              const month = String(date.getUTCMonth() + 1).padStart(2, '0');
              const year = date.getUTCFullYear();
              formattedDate = `${day}/${month}/${year}`;
            }
            return (
              <div
                data-aos='fade-up' data-aos-duration='700'
                key={item?._id}
                className="w-full sm:w-[300px] h-[280px] overflow-hidden border-rounded-xl relative"
              >
                <div className="bg-primaryColor rounded-xl w-full h-full">
                  <Link href={`/user/news/${item?._id}`}>
                    <GoArrowUpRight
                      size={16}
                      className="absolute top-2 right-2 text-white"
                    />
                  </Link>
                  {
                    item?.thumbnail
                      ? <img src={`${baseUrl}${item?.thumbnail?.location}`} alt="cards" className="rounded-t-xl w-full h-[70%] object-cover" />
                      : <Image src={cover} alt="cards" className="rounded-t-xl w-full h-[70%] object-cover" />
                  }
                  <div className="p-3 text-white">
                    <div className="flex items-center justify-between">
                      <h1 className="text-nowrap text-sm">{item?.title}</h1>
                      <h1 className="text-xs font-[200]">{formattedDate}</h1>
                    </div>
                    {/* Description limited to 2 lines */}
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                      className="text-xs font-[200] mt-2 line-clamp-2"
                    />
                  </div>
                </div>
              </div>
            );
          }
          )
          :
          <p className="">No Data Available</p>
      }
    </>
  );
};

export default NewsComponent;
