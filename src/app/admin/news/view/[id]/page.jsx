"use client"

import { useEffect, useState } from "react";
import { baseUrl, guestNewsRoute } from "@/utils/Endpoint";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import parse from 'html-react-parser';


function Page({ params }) {
    const axiosPrivate = useAxiosPrivate();

    const router = useRouter();
    const { id } = params;

    const [data, setData] = useState({
        title: "",
        description: "",
        thumbnail: null,
    })

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get(`${guestNewsRoute}/${id}`)

            if (response.status === 200) {
                const news = response?.data?.news;
                console.log({ fetchednews: news })

                setData((prev) => ({
                    title: news?.title,
                    description: news?.description,
                    thumbnail: news?.thumbnail,
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log({ data })

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-5 pt-12 max-md:pt-16 mb-6 text-black">
            <h1 className="font-semibold text-title mb-10">
                View news
            </h1>

            <div className="border-y py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Title
                </label>
                <input
                    name="title"
                    value={data?.title}
                    type="text"
                    disabled
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" placeholder="Some title here" />
            </div>

            <div className='flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Thumbnail
                </label>
                <div className='w-7/12 max-md:w-full'>
                    {
                        data?.thumbnail?.location
                            ?
                            <img className='max-h-20 cursor-pointer' src={`${baseUrl}${data?.thumbnail?.location}`} alt="" />
                            :
                            <span>NIL</span>
                    }
                </div>
            </div>

            <div className="border-y py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Description
                </label>
                <p
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" >
                    {parse(data?.description)}

                </p>
            </div>

        </div>
    )
}

export default Page
