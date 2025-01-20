'use client';

import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteAlert from '../common/DeleteAlert';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function DeleteButton({ name, id ,data, setData}) {
    const [showAlert, setShowAlert] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()

    const handleConfirm = async () => {
        console.log("confirm click")
        try {
            const response = await axiosPrivate.delete(`/api/admin/${name}/${id}`)
    
            if(response.status === 200){
                toast.success(`Deleted the ${name} `)

                if(data && Array?.isArray(data)){
                    const newData = data?.filter((item)=> item._id !== id)
                    setData(newData)
                }else{
                    router.back()
                }
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
            <button className='' onClick={() => setShowAlert(true)}>
                <RiDeleteBin6Line size={20} />
            </button>
            {showAlert && <DeleteAlert name={name} onConfirm={handleConfirm} onCancel={handleCancel} />}
        </>
    );
}

export default DeleteButton;