'use client';
import EnquiryTable from '@/components/Admin/Enquiry/EnquiryTable';
import MemberTable from '@/components/Admin/Members/MemberTable';
import React, { useState } from 'react'

const Page = () => {
     const [selectedNews, setSelectedNews] = useState([]);
        const [isSelectAll, setIsSelectAll] = useState(false);
        const newsCount = 15;
  return (
    <div className='flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 mb-20 text-black'>
            <h1 className="font-semibold text-title">
                Manage Enquiries
            </h1>
            <div className='w-full border border-gray-400 rounded-xl overflow-clip mt-5'>
                <div className='flex p-5 items-center justify-between'>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl">
                        Enquiries list
                        </h2>
                        <div className="max-sm:hidden">
                    </div>
                </div>
          
          </div>
                <div className='w-full max-md:overflow-x-scroll'>
                    <EnquiryTable />
                </div>
            </div>
        </div>
  )
}

export default Page
