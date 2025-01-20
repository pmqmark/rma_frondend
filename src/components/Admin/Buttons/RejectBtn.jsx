'use client';

import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import RejectAlert from '../common/Alerts/RejectAlert';
import { useRouter } from 'next/navigation';

function RejectBtn({ main, id ,title, content, route}) {
    const [showAlert, setShowAlert] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()

    const handleConfirm = async () => {
        console.log("confirm click")
        try {
            const response = await axiosPrivate.put(`${route}/${id}`,
                {status:'rejected'}
            )
    
            if(response.status === 200){
                toast.success(response?.data?.msg)
                router.push(main)
            }
    
            setShowAlert(false);
            
        } catch (error) {
            toast.error(error?.response?.data?.msg)
            console.log(error)
        }
    };

    const handleCancel = () => {
        setShowAlert(false);
    };

    return (
        <>
            <button onClick={() => setShowAlert(true)} className="border border-[#DB3636] text-[#DB3636] bg-[#F9DFDF] font-semibold px-5 py-2 rounded-lg mt-5">
                    Reject
                </button>
            {showAlert && <RejectAlert title={title} content={content} onConfirm={handleConfirm} onCancel={handleCancel} />}
        </>
    );
}

export default RejectBtn;