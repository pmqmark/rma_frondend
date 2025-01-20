'use client';

import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import RejectAlert from '../common/Alerts/RejectAlert';
import { MdFilterListOff } from 'react-icons/md';

function DeactivateBtn({ id, title, content, route, data ,setData }) {
    const [showAlert, setShowAlert] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleConfirm = async () => {
        console.log("confirm click")
        try {
            const response = await axiosPrivate.patch(`${route}/${id}`,
                { isActive: false }
            )

            if (response.status === 200) {
                toast.success(response?.data?.msg)
                const newData = data?.map((item, i)=> {
                    if(item?._id === id){
                        item.isActive = false;
                    }

                    return item
                })

                setData([...newData])
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
            <MdFilterListOff
                size={22}
                className="text-red-500 cursor-pointer"
                onClick={() => setShowAlert(true)}
            />
            {showAlert && <RejectAlert title={title} content={content} onConfirm={handleConfirm} onCancel={handleCancel} />}
        </>
    );
}

export default DeactivateBtn;