'use client'
import SaveButton from "@/components/Admin/common/SaveButton";
import CancelButton from "@/components/Admin/common/CancelButton";
import FileUploadField from "@/components/Common/FileUploadField";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { adminEventRoute, guestEventRoute, uploadImageUrl } from "@/utils/Endpoint";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UploadImage } from "@/utils/UploadImage";

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

    const changeHandler = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

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
                    // thumbnail: news?.thumbnail,
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [thumbnail, setThumbnail] = useState()
    const [document, setDocument] = useState()

    useEffect(() => {
        const uploadThumbnail = async () => {
            if (data?.thumbnail) {
                try {
                    const res = await UploadImage(data?.thumbnail, uploadImageUrl, axiosPrivate);
                    setThumbnail(res?.data?.file);
                } catch (error) {
                    console.error("Failed to upload thumbnail:", error);
                }
            }
        };

        uploadThumbnail();
    }, [data?.thumbnail, axiosPrivate]);

    useEffect(() => {
        const uploadThumbnail = async () => {
            if (data?.document) {
                try {
                    const res = await UploadImage(data?.document, uploadImageUrl, axiosPrivate);
                    setDocument(res?.data?.file);
                } catch (error) {
                    console.error("Failed to upload thumbnail:", error);
                }
            }
        };

        uploadThumbnail();
    }, [data?.document, axiosPrivate]);

    const submitHandler = async () => {
        try {
            const formData = {
                title: data?.title,
                date: data?.date,
                description: data?.description,
                thumbnail: thumbnail,
                document: document,
            }
            const response = await axiosPrivate.put(`${adminEventRoute}/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                toast.success("Data Updated")
                router.push('/admin/events')
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
        <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-5 pt-12 max-md:pt-20 text-black">
            <h1 className="font-semibold text-title">
                Edit event
            </h1>
            <div className="flex  justify-between mt-2 py-5 max-md:py-3">
                <div>
                    <h2 className="font-semibold text-xl">
                        Update Event
                    </h2>
                    <h5 className="pt-1">
                        Update your event here
                    </h5>
                </div>
                <div className="flex max-sm:hidden">
                    <CancelButton />
                    <SaveButton
                        submitHandler={submitHandler}
                        title="Edit this event?" content={`Click Confirm to save this event`} />
                </div>
            </div>
            <div className="border-y py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Event title
                </label>
                <input type="text" name="title"
                    value={data?.title}
                    onChange={changeHandler}
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" placeholder="Some title here" />
            </div>
            <div className=" py-5 flex max-md:flex-col items-start">
                <label className="text-base font-semibold w-1/4 max-md:w-full">
                    Event date
                </label>
                <input type="date" name="date"
                    value={data?.date}
                    onChange={changeHandler}
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" />
            </div>
            <div className="border-b py-5 flex max-md:flex-col items-start">
                <div className="flex flex-col  w-1/4 max-md:w-full max-md:pb-3">
                    <label className="text-base font-semibold">
                        Description
                    </label>
                    <p>
                        Write the description
                    </p>
                </div>
                <textarea
                    name='description'
                    value={data?.description}
                    onChange={changeHandler}
                    className="w-7/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
                    placeholder='Enter description'
                    rows="4"
                />
            </div>
            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Edit thumbnail
                    </label>
                    <p>
                        This will be diaplayed on your website
                    </p>

                </div>
                <div className="w-6/12 max-md:w-full">
                    <FileUploadField value={data?.thumbnail} onChange={(elem) => setData((prev) => ({ ...prev, thumbnail: elem }))} />
                </div>
            </div>
            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Edit document
                    </label>
                    <p>
                        This will be diaplayed on your website
                    </p>

                </div>
                <div className="w-6/12 max-md:w-full">
                    <FileUploadField value={data?.document} onChange={(elem) => setData((prev) => ({ ...prev, document: elem }))} />
                </div>
            </div>
            <div className="flex mt-6 sm:hidden">
                <CancelButton />
                <SaveButton
                    submitHandler={submitHandler}
                    title="Edit this event?" content={`Click Confirm to save this event`} />
            </div>
        </div>
    )
}

export default Page
