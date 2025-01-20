"use client";
import {
  baseUrl,
  getAllNewsletters,
  getAllPublications,
} from "@/utils/Endpoint";
import PublicationNewsletterCard from "./PublicationNewsletterCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserLogin from "@/components/Common/UserLogin";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import LoaderData from "@/components/Common/Loader";

function PublicationNewsletterPage({ name }) {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  async function getData(name) {
    try {
      setLoading(true);
      const res = await axiosPrivate.get(
        `${baseUrl}${
          name === "Publications" ? getAllPublications : getAllNewsletters
        }`
      );

      if (res.status === 200) {
        if (name === "Publications") {
          console.log(res.data)
          setData(res?.data?.publication);
        } else {
          setData(res?.data?.newsletter);
        }
      }
    } catch (error) {
      console.error("Error in fetching data", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (status === "authenticated") {
      getData(name);
    }
  }, [status]);

  console.log(data)

  return (
    <div className="max-w-[1280px] mx-auto mb-16 p-3">
      <h1 data-aos='fade-up' data-aos-duration='700' className="text-title max-sm:text-2xl font-semibold my-8">{name}</h1>
      {status === "loading" || loading ? (
        <div className="min-h-[55vh]  h-full w-full grid place-items-center">
          <LoaderData />
        </div>
      ) : status === "authenticated" ? (
        data?.length > 0 ? (
          <div className="w-full grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 gap-x-4 gap-y-8 max-sm:gap-y-5">
            {data?.map((item, index) => {
              return (
                <PublicationNewsletterCard
                  key={index}
                  title={item?.title}
                  location={item?.file?.location}
                />
              );
            })}
          </div>
        ) : (
          <p className="w-full grid place-items-center min-h-[45vh]">
            No data available
          </p>
        )
      ) : (
        <div className="w-full grid place-items-center my-16 ">
          <p data-aos='fade-up' data-aos-duration='700' className="text-primaryColor px-4 text-sm sm:text-base">
            The content on this page is available exclusively to World Spice
            Organisation members.
          </p>
          <UserLogin />
        </div>
      )}
    </div>
  );
}

export default PublicationNewsletterPage;
