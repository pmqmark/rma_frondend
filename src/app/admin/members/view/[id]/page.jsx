"use client"
import NormalTextField from '@/components/Admin/Members/NormalTextField'
import StatusIndicator from '@/components/Admin/Members/StatusIndicator';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { adminMemberRoute, baseUrl } from '@/utils/Endpoint';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoDocumentText } from 'react-icons/io5';

function Page({ params }) {

    const axiosPrivate = useAxiosPrivate();

    const router = useRouter();

    const { id } = params;

    const [data, setData] = useState({})

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get(`${adminMemberRoute}/${id}`)

            if (response.status === 200) {
                const member = response?.data?.member;
                console.log({ fetchedmember: member })

                setData((prev) => ({
                    ...member
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const fieldData = [
        { label: "Username", placeholder: "Username", key: 'username' },
        { label: "Name of the Applicant", placeholder: "Name of the Applicant", key: "applicantName" },
        { label: "Address", placeholder: "Address", type: "textarea", key: "address" },
        { label: "State/Province", placeholder: "State", key: "state" },
        { label: "Country", placeholder: "Country", key: "country" },
        { label: "Telephone", placeholder: "Telephone", key: "phone", type: "tel" },
        { label: "Fax", placeholder: "Fax", key: "fax" },
        { label: "Email", placeholder: "Email", key: "email", type: "email" },
        { label: "Website", placeholder: "Website", key: "website", type: "url" },
        { label: "Contact Person", placeholder: "Contact Person", key: "contactPerson" },
    ]

    const businessFields = [
        { label: "Nature of business/product line", placeholder: "Nature of business", key: "nature" },
        { label: "Name of the business/entity associated with", placeholder: "business", key: "name" },
        { label: "Address of the business/entity", placeholder: "Address here", type: "textarea", key: "address" },
        { label: "Registration number business/entity", placeholder: "Registration number business/entity", key: "regNum" },
        { label: "Registration date of business/entity", key: "regDate", type: "date" },
        { label: "Date of commencement of business/entity", key: "commenceDate", type: "date" },
        { label: "Name of the authorized person representing business/entity", placeholder: "Name of the authorized person", key: "authRep" },
        { label: "Name of alternate authorized representative", placeholder: "Name of alternate authorized representative", key: "altAuthRep" },
        { label: "Name of person authorized to attend meetings", placeholder: "Position", key: "meetAuthRep" },
    ]

    console.log(data)
    return (
        <div className='flex flex-col w-full px-10 pt-12 max-md:pt-20 mb-28'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-5 mb-6 '>
                <span className="font-semibold text-title ">
                    View Member
                </span>
                <div className=''>
                    <StatusIndicator status={data?.isActive ? 'active' : 'inactive'} />
                </div>
            </div>

            {
                fieldData?.map((item, index) => (
                    <NormalTextField label={item?.label} placeholder={item?.placeholder} key={item?.key}
                        type={item?.type} value={data[item?.key]} disabled={true} />

                ))
            }

            <div className="flex flex-col lg:flex-row justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
                <div className="w-[35%] max-md:w-fit font-medium">
                    <h2>Membership applied for</h2>
                </div>
                <div className="w-[64%] max-md:w-fit">
                    <input
                        name={data?.membershipType?.value}
                        value={data?.membershipType?.label}
                        className="w-full border border-gray-400 mt-1 px-4 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
                    />
                </div>
            </div>

            <div className='flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-full font-medium'>
                    <h2>Identity Proof </h2>
                </div>
                <div className='w-[64%] max-md:w-full'>
                    {data?.idProof?.location ? (
                        <a href={`${baseUrl}${data?.idProof?.location}`} target="_blank" rel="noopener noreferrer">
                            {/\.(pdf|doc|docx)$/.test(data.idProof.location) ? (
                                // Render a dummy image for PDF or Word files
                                <IoDocumentText size={40} />
                            ) : (
                                <img
                                    className="max-h-20 cursor-pointer rounded"
                                    src={`${baseUrl}${data.idProof.location}`}
                                    alt="idProof"
                                />
                            )}
                        </a>
                    ) : (
                        <p>No ID proof available</p>
                    )}
                </div>
            </div>


            {
                businessFields?.map((item, index) => (
                    <NormalTextField label={item?.label} placeholder={item?.placeholder} key={item?.key}
                        type={item?.type} value={data?.business?.[item?.key]} disabled={true} />

                ))
            }

        </div>
    )
}

export default Page
