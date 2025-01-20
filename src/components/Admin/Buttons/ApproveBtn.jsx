'use client';

import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import ApproveAlert from '../common/Alerts/ApproveAlert';
import { useRouter } from 'next/navigation';

function ApproveBtn({ main, id, title, content, route }) {
    const [showAlert, setShowAlert] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()

    const handleConfirm = async () => {
        console.log("confirm click")
        try {
            const response = await axiosPrivate.put(`${route}/${id}`,
                {status:'approved'}
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
                <button onClick={() => setShowAlert(true)} className="bg-[#266941] text-white px-5 py-2 font-semibold rounded-lg mt-5 ml-5">
                    Approve
                </button>
                {showAlert && <ApproveAlert title={title} content={content} onConfirm={handleConfirm} onCancel={handleCancel} />}
        </>
    );
}

export default ApproveBtn;