'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { adminMemberRoute, baseUrl } from '@/utils/Endpoint';
import { TbArrowsDiagonal } from "react-icons/tb";
import DeleteButton from "@/components/Admin/News/DeleteButton";
import { FiEdit2 } from "react-icons/fi";
import StatusIndicator from './StatusIndicator';
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";
import ActivateBtn from '../Buttons/ActivateBtn';
import DeactivateBtn from '../Buttons/DeactivateBtn';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';


const MemberTable = () => {
    const [data, setData] = useState([]);

    const axiosPrivate = useAxiosPrivate()

    const getData = async () => {
        try {
            const response = await axiosPrivate.get(adminMemberRoute);
            console.log({ response })
            if (response.status === 200) {
                const data = response?.data?.member || [];
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
    }, [])

    return (
        <>

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
                        <th className='px-5 text-start py-3 font-normal max-md:text-sm w-[10%]'>
                            Action
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
                                    <div className='flex items-center py-3 '>
                                        {/\.(pdf|doc|docx)$/.test(item?.idProof?.location) ? (
                                            // Render a dummy image for PDF or Word files
                                            <CgProfile size={40} />
                                        ) : (
                                            <img
                                                className="max-h-10 cursor-pointer rounded-full w-10"
                                                src={`${item.idProof.location}`}
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
                                    <StatusIndicator status={item?.isActive ? 'active' : 'inactive'} />
                                </td>

                                <td className='px-5'>
                                    <div>
                                        {item?.isActive ?
                                            (
                                                <DeactivateBtn id={item?._id} title={`Deactivate member`}
                                                    content={`Click confirm to Deactivate the member`}
                                                    route={`/api/admin/member`} data={data} setData={setData} />
                                            )
                                            :
                                            (
                                                <ActivateBtn id={item?._id} title={`Activate member`}
                                                    content={`Click confirm to Activate the member`}
                                                    route={`/api/admin/member`} data={data} setData={setData} />
                                            )}
                                    </div>
                                </td>

                                <td className='pr-5'>
                                    <Link href={{ pathname: `/admin/members/view/${item?._id}` }}>
                                        <TbArrowsDiagonal size={22} className='cursor-pointer text-blue-500 ' />
                                    </Link>
                                </td>
                            </tr>
                        ))}
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

export default MemberTable