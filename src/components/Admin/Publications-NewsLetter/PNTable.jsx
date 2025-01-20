"use client";
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import DeleteButton from "@/components/Admin/News/DeleteButton";
import { memberNewsletterRoute, memberPublicationRoute } from '@/utils/Endpoint';
import { CiImageOn } from "react-icons/ci";
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { LiaFileDownloadSolid } from "react-icons/lia";

const PNTable = ({name}) => {

    const [data, setData] = useState([]);

    const axiosPrivate = useAxiosPrivate()

    const getPublications = async()=>{
        try {
            const getRoute = (name === "publication") ? memberPublicationRoute : memberNewsletterRoute;
            const response = await axiosPrivate.get(getRoute);
            console.log({response})
            if(response.status === 200){
                setData(response?.data[name])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPublications()
    }, [])


    return (
        <>
            <table className='w-full text-base table'>
                <thead className="bg-[#f4f6f7]" >
                    <tr>
                        <th className='px-6 py-3 font-normal text-start text-nowrap'>
                            Title
                        </th>
                        <th className='px-6 py-3 font-normal clamp text-nowrap'>
                            File size
                        </th>
                        <th className='px-8 py-3 font-normal'>
                            Date uploaded
                        </th>
                        <th className='px-8 py-3 font-normal'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (
                            <tr className="border-t border-gray-400" key={index} style={{ backgroundColor: (index + 1) % 2 === 0 ? '#f4f6f7' : 'transparent' }}>
                                <td>
                                    <div className='px-6 py-4 max-w-[90%]  max-md:max-w-52 flex items-center max-md:overflow-clip'>
                                        <Link 
                                        href={item?.file?.location ?? ''}
                                        download={item?.file?.name}
                                        className="bg-[#F4EBFF] p-3 rounded-full">
                                             <LiaFileDownloadSolid size={24} />
                                        </Link>
                                        <div>
                                            <h4 className="font-semibold text-base ml-4 text-nowrap line-clamp-1 max-w-[30rem] max-lg:max-w-72 max-md:max-w-56">
                                                {item?.title}
                                            </h4>
                                            <h5 className="text-sm ml-4">
                                                {item?.file?.name}
                                            </h5>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    {item?.file?.size ? `${parseFloat(item?.file?.size / (1024*1024))?.toFixed(2)} MB` : 'NIL'}
                                </td>
                                <td className='px-8 py-4 text-center'>
                                    {item?.createdAt ? new Date(item?.createdAt)?.toLocaleDateString("en-IN") : 'NIL'}
                                </td>
                                <td>
                                    <div className='flex w-full justify-evenly max-md:gap-3 px-8 py-6'>
                                        <DeleteButton name={name} id={item?._id} data={data} setData={setData} />
                                        <button >
                                            <Link href={{ pathname: `/admin/${name}/edit/${item?._id}` }}>
                                                <FiEdit2 size={20} />
                                            </Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
        data?.length === 0 
        &&
        <p className='mx-auto w-fit py-5'>No available data</p>
    }
        </>
    )
}

export default PNTable