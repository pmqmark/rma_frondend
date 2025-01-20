'use client'
import SaveButton from "@/components/Admin/common/SaveButton";
import CancelButton from "@/components/Admin/common/CancelButton";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { adminEventRoute, baseUrl, guestEventRoute } from "@/utils/Endpoint";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LiaFileDownloadSolid } from "react-icons/lia";
import Link from "next/link";
import DeleteButton from "@/components/Admin/News/DeleteButton";

function Page({ params }) {
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()
    const { id } = params;

    const [data, setData] = useState({
        title: "",
        date: '',
        description: "",
        thumbnail: null,
        document: null,
    })

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get(`${guestEventRoute}/${id}`)

            if (response.status === 200) {
                const event = response?.data?.event;
                console.log({ fetchedevent: event })

                setData((prev) => ({
                    title: event?.title,
                    date: event?.date,
                    description: event?.description,
                    thumbnail: event?.thumbnail,
                    document: event?.document,
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-5 pt-12 max-md:pt-20 text-black">
            <h1 className="font-semibold text-title">
                View event
            </h1>
            <div className="flex  justify-between mt-2 py-5 max-md:py-3">

                <h5 className="pt-1">
                    View your event here
                </h5>

                <DeleteButton name={"event"} id={id} />
            </div>

            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Thumbnail
                    </label>

                </div>
                <img src={`${baseUrl}${data?.thumbnail?.location}`} alt=""
                    className="w-[200px] h-[150px] object-contain"
                />
            </div>

            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Document
                    </label>

                </div>
                <Link
                    href={data?.document?.location ?? ''}
                    className="bg-[#F4EBFF] p-3 rounded-full ">
                    <div className="">
                        <LiaFileDownloadSolid size={24} />
                    </div>
                </Link>
            </div>

            <div className="border-y py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Title
                </label>
                <input type="text" name="title"
                    value={data?.title}
                    disabled
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" placeholder="Some title here" />
            </div>
            <div className=" py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Date
                </label>
                <input type="date" name="date"
                    value={data?.date}
                    disabled
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" />
            </div>

            <div className="border-b py-5 flex max-md:flex-col items-start">
                <div className="flex flex-col  w-1/4 max-md:w-full max-md:pb-3">
                    <label className="text-base font-semibold">
                        Description
                    </label>

                </div>
                <textarea
                    name='description'
                    value={data?.description}
                    disabled
                    className="w-7/12 max-md:w-full min-h-40 border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
                    placeholder='Enter description'
                    rows={4}
                />
            </div>

        </div>
    )
}

export default Page
