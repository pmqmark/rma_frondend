'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbArrowsDiagonal } from 'react-icons/tb';
import DeleteButton from '../News/DeleteButton';
import { FiEdit2 } from 'react-icons/fi';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function CalendarEventModal({ events, date, year, monthNo, setShowModal }) {
    const [data, setData] = useState([...events])
    return (
        <div className='fixed top-0 z-50 left-0 w-screen h-screen bg-[#00000088]'>
            <div className='absolute rounded-xl flex flex-col items-center gap-4 m-auto top-0 left-0 right-0 bottom-0 w-fit h-fit p-9 max-sm:p-5  bg-white'>
                <h2 className="text-sub-title font-semibold">{date + 1} {months[monthNo]} {year}</h2>
                <div className='max-h-44 overflow-y-scroll'>
                    <div className="flex min-w-80 flex-col gap-2 w-full max-sm:w-auto">
                        <ol className="list-decimal pl-4" style={{ listStyleType: 'decimal', marginLeft: '1em' }}>
                            {
                                data.map((event, index) => (
                                    <li key={index} className='w-full mb-2' style={{ display: 'list-item' }}>
                                        <div className="flex items-center justify-between w-full" >
                                            <p className="text-left w-fit max-sm:text-sm">{event?.title}</p>

                                            <div className='flex gap-2'>
                                                <Link href={{ pathname: `/admin/events/edit/${event?._id}` }}>
                                                    <FiEdit2 size={20} className='cursor-pointer text-blue-500 ' />
                                                </Link>

                                                <Link href={{ pathname: `/admin/events/view/${event?._id}` }}>
                                                    <TbArrowsDiagonal size={20} className='cursor-pointer text-green-500 ' />
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
                <div className="flex  gap-4 mt-2 justify-between">
                    <button className="w-full rounded-lg py-2 border border-gray-400 px-5" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CalendarEventModal
