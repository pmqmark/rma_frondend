'use client';

import { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import Link from 'next/link';
import DeleteButton from "@/components/Admin/News/DeleteButton";
import StatusIndicator from '@/components/Admin/Members/StatusIndicator';
import MemberTable from '@/components/Admin/Members/MemberTable';

function Page() {
    const [selectedNews, setSelectedNews] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const newsCount = 15;

    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedNews([]);
        } else {
            setSelectedNews(Array.from({ length: newsCount }, (_, i) => i));
        }
        setIsSelectAll(!isSelectAll);
    };

    const handleSelect = (index) => {
        if (selectedNews.includes(index)) {
            setSelectedNews(selectedNews.filter(item => item !== index));
        } else {
            setSelectedNews([...selectedNews, index]);
        }
    };

    return (
        <div className='flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 mb-20 text-black'>
            <h1 className="font-semibold text-title">
                Manage Members
            </h1>
            <div className='w-full border border-gray-400 rounded-xl overflow-clip mt-5'>
                <div className='flex p-5 items-center justify-between'>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl">
                            Member list
                        </h2>

                    </div>
                </div>
                <div className='w-full max-md:overflow-x-scroll'>
                    <MemberTable />
                </div>
            </div>
        </div>
    );
}

export default Page;
