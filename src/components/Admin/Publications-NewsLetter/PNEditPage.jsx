"use client"
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import CancelButton from '../common/CancelButton'
import SaveButton from '../common/SaveButton'
import FileUploadField from "@/components/Common/FileUploadField";
import { useEffect, useState } from 'react';
import { adminNewsletterRoute, adminPublicationRoute, memberNewsletterRoute, memberPublicationRoute, uploadImageUrl } from '@/utils/Endpoint';
import { toast } from 'react-toastify';
import { UploadImage } from '@/utils/UploadImage';

function PNEditPage({ name, id }) {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState({
        title: "",
        file: null,
    })

    console.log(name)

    const fetchData = async () => {
        try {
            const getRoute = (name === "publication") ? memberPublicationRoute : memberNewsletterRoute;
            const response = await axiosPrivate.get(`${getRoute}/${id}`)

            if (response.status === 200) {
                const data = response?.data[name]

                setData((prev) => ({
                    title: data?.title,
                    // file: data?.file,

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
            // upload the file using this function
            const res = await UploadImage(data.file, uploadImageUrl, axiosPrivate);
            if (res.status === 200) {
                console.log(res.data)
                const finalData = {
                    title: data?.title,
                    file: res?.data?.file
                }
                const putRoute = (name === "publication") ? adminPublicationRoute : adminNewsletterRoute;

                const response = await axiosPrivate.put(`${putRoute}/${id}`, finalData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (response.status === 200) {
                    toast.success("Data Updated")
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
        <div className="flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 text-black">
            <h1 className="font-semibold text-title capitalize">
                Edit {name}
            </h1>
            <div className="flex justify-between mt-2 py-5">
                <div>
                    <h2 className="font-semibold text-xl">
                        Edit {name}
                    </h2>
                    <h5 className="pt-1">
                        Update your {name} here
                    </h5>
                </div>
                <div className="flex max-sm:hidden">
                    <CancelButton />
                    <SaveButton
                        submitHandler={submitHandler}
                        title={`Edit this ${name}?`} content={<span>This post has been published. Team members <br /> will be able to edit this post and republish changes.</span>} />
                </div>
            </div>
            <div className="border-y py-5 flex items-start max-md:flex-col">
                <label className="text-base font-semibold w-4/12 max-md:w-full">
                    Title
                </label>
                <input
                    name="title"
                    value={data?.title}
                    onChange={changeHandler}
                    type="text"
                    className="w-6/12 max-md:w-full border border-gray-400 mt-1 px-5 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light" placeholder="Title document" />
            </div>
            <div className=" py-5 flex items-start max-md:flex-col max-md:gap-y-2">
                <div className="flex flex-col w-4/12 max-md:w-full">
                    <label className="text-base font-semibold">
                        Edit pdf
                    </label>
                    <p>
                        This will be diaplayed on your website
                    </p>

                </div>
                <div className="w-6/12 max-md:w-full">
                    <FileUploadField value={data?.file} onChange={(el) => setData((prev) => ({ ...prev, file: el }))} />
                </div>
            </div>
            <div className="flex sm:hidden mt-3">
                <CancelButton />
                <SaveButton
                    submitHandler={submitHandler}
                    title={`Edit this ${name}?`} content={<span>This post has been published. Team members <br /> will be able to edit this post and republish changes.</span>} />
            </div>
        </div>
    )
}

export default PNEditPage
