'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusIndicator from '@/components/Admin/Members/StatusIndicator';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { adminApplicationRoute, baseUrl } from '@/utils/Endpoint';
import { TbArrowsDiagonal } from "react-icons/tb";
import { applnStatus } from '@/data/filter';
import { IoDocumentText } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";

const ApplicationTable = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState('')

    const axiosPrivate = useAxiosPrivate()

    const getData = async () => {
        try {
            const response = await axiosPrivate.get(`${adminApplicationRoute}?status=${status}`);
            console.log({ response })
            if (response.status === 200) {
                const data = response?.data?.application || [];
                setData(data)
                const requests = data?.filter((item) => item?.status === 'pending')
                setCount(requests?.length)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [status])

    return (
        <>
            <div className='flex flex-col sm:flex-row p-5 gap-4 items-center justify-between'>
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl">
                        Application requests
                    </h2>

                    {
                        count > 0
                        &&
                        <div className="px-2 py-1 rounded-full bg-[#F5FFFA]">
                            <h5 className="text-sm text-[#266941]">
                                {count < 2 ? `${count} request` : `${count} requests`}
                            </h5>
                        </div>
                    }
                </div>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-fit shadow-lg rounded-lg p-2 outline-none '>
                    <option value=''>Status</option>
                    {
                        applnStatus?.map((item, i) => (
                            <option key={i} value={item?.value}>{item?.label}</option>
                        ))
                    }
                </select>

            </div>
            <div className='w-full max-md:overflow-x-scroll'>
                <table className='w-full max-md:w-fit max-md:overflow-x-scroll text-base table '>
                    <thead className="bg-[#f4f6f7]">
                        <tr >

                            <th className='pl-5 text-start py-3 font-normal max-md:text-sm '>
                                Name
                            </th>
                            <th className='px-5 text-start py-3 font-normal max-md:text-sm '>
                                Phone
                            </th>
                            <th className='px-5 text-start py-3 font-normal max-md:text-sm '>
                                Membership
                            </th>
                            <th className='px-5 text-start py-3 font-normal max-md:text-sm '>
                                Status
                            </th>
                            <th className='pr-5 text-start py-3 font-normal max-md:text-sm '>
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, index) => (
                                <tr key={index} className='border-t border-gray-400 '>

                                    <td className='pl-5'>
                                        <div className='w-fit flex items-center py-3 '>
                                            {/\.(pdf|doc|docx)$/.test(item.idProof.location) ? (
                                                // Render a dummy image for PDF or Word files
                                                <CgProfile  size={40} /> 
                                            ) : (
                                                <img
                                                    className="max-h-10 cursor-pointer rounded-full w-10"
                                                    src={`${baseUrl}${item.idProof.location}`}
                                                    alt="idProof"
                                                />
                                            )}
                                            <div className='ml-4 truncate'>
                                                <h4 className="font-semibold max-md:text-sm text-base capitalize">
                                                    {item?.applicantName ?? 'NIL'}
                                                </h4>
                                                <h5 className="text-sm max-md:text-xs ">
                                                    {item?.email ?? 'NIL'}
                                                </h5>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-5'>
                                        {item?.phone ?? 'NIL'}
                                    </td>
                                    <td className='capitalize px-5'>
                                        {item?.membershipType?.value ?? 'NIL'}
                                    </td>
                                    <td className='capitalize px-5'>
                                        <StatusIndicator status={item?.status} />
                                    </td>

                                    <td className='pr-5'>
                                        <Link href={{ pathname: `/admin/applications/view/${item?._id}` }}>
                                            <TbArrowsDiagonal size={22} className='cursor-pointer text-blue-500 ' />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {
                data?.length === 0
                &&
                <p className='mx-auto w-fit py-5'>No available data</p>
            }
        </>
    )
}

export default ApplicationTable