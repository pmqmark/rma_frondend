"use client"
import NewsArea from "@/components/Admin/News/NewsArea";
import SaveButton from "@/components/Admin/common/SaveButton";
import CancelButton from "@/components/Admin/common/CancelButton";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { adminNewsRoute, guestNewsRoute, uploadImageUrl } from "@/utils/Endpoint";
import FileUploadField from "@/components/Common/FileUploadField";
import { useRouter } from "next/navigation";
import { UploadImage } from "@/utils/UploadImage";

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

                setData((prev) => ({
                    title: news?.title,
                    description: news?.description,
                    // thumbnail: news?.thumbnail,
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }


    const changeHandler = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async () => {

        try {
            if (data?.thumbnail) {
                // try to upload the image individually 
                const res = await UploadImage(data.thumbnail, uploadImageUrl, axiosPrivate);
                if (res.status === 200) {
                    // value initializing for final form submition 
                    const finalData = {
                        title: data?.title,
                        description: data?.description,
                        thumbnail: res?.data?.file
                    }
                    console.log(finalData)
                    const response = await axiosPrivate.put(`${adminNewsRoute}/${id}`, finalData,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    if (response.status === 200) {
                        toast.success("Data Updated")
                        router.push("/admin/news")
                    }
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to submit")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-5 pt-12 max-md:pt-16 mb-6 text-black">
            <h1 className="font-semibold text-title">
                Edit news
            </h1>
            <div className="flex justify-between mt-2 py-5">
                <h5 className="pt-1">
                    Update the news here
                </h5>
                <div className="flex max-sm:hidden">
                    <CancelButton />
                    <SaveButton
                        submitHandler={submitHandler}
                        title="Add this news?" content={`Click confirm to save this news`} />
                </div>
            </div>
            <div className="border-y py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Title
                </label>
                <input
                    name="title"
                    value={data?.title}
                    onChange={changeHandler}
                    type="text"
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" placeholder="Some title here" />
            </div>
            <div className="border-b py-5 flex max-md:flex-col items-start">
                <div className="flex flex-col  w-1/4 max-md:w-full max-md:pb-3">
                    <label className="text-base font-semibold">
                        News
                    </label>
                    <p>
                        Write the news
                    </p>
                </div>
                <NewsArea value={data?.description} setValue={(el) => setData((prev) => ({ ...prev, description: el }))} />
            </div>


            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Add thumbnail
                    </label>
                    <p>
                        This will be diaplayed on your website
                    </p>

                </div>
                <div className="w-6/12 max-md:w-full">
                    <FileUploadField value={data?.thumbnail} onChange={(elem) => setData((prev) => ({ ...prev, thumbnail: elem }))} />
                </div>
            </div>

            <div className="flex sm:hidden">
                <CancelButton />
                <SaveButton
                    submitHandler={submitHandler}
                    title="Add this news?" content={`Click confirm to save this news`} />
            </div>
        </div>
    )
}

export default Page
