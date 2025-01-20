'use client';

import { useState } from "react";
import CalendarEventModal from "./CalendarEventModal";

function CalendarCell({ date, events = [], current = true, monthname, isToday = false, year, monthNo }) {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        if (events.length === 0) {
            return;
        }
        console.log('show modal')
        setShowModal(!showModal)
    };
    return (
        <>
            <div key={date} style={{ backgroundColor: isToday ? 'rgba(91, 212, 123, 0.2)' : '' }} className={`border-l border-b text-sm h-[6.5rem] max-md:h-[5.5rem]  max-sm:h-auto  relative flex flex-col items-end p-2 ${events.length > 0 ? 'cursor-pointer' : ''}`} onClick={handleShowModal} >
                {
                    monthname && <h4 className={`absolute left-2  max-sm:hidden text-xs ${current ? 'text-black' : 'text-gray-400'}`}>{monthname}</h4>
                }
                {
                    events.length > 0 && <div className="absolute left-1 top-1 size-[0.4rem] bg-blue-400 rounded-full sm:hidden">

                    </div>
                }
                <h4 className={`${current ? '' : 'text-gray-400'}`}>{date + 1}</h4>
                <div className="h-fit overflow-hidden max-sm:hidden">
                    {
                        events.map((event, index) => (
                            <p key={index} className="line-clamp-1 text-right text-xs">{event?.title}</p>
                        ))
                    }
                </div>

            </div>
            {
                showModal && (
                    <CalendarEventModal
                        setShowModal={setShowModal}
                        events={events}
                        date={date}
                        monthNo={monthNo}
                        year={year}
                    />
                )
            }
        </>
    )
}

export default CalendarCell
