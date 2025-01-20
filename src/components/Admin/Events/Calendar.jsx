"use client";

import {
  add,
  differenceInDays,
  endOfMonth,
  startOfMonth,
  sub, getMonth, getYear,
  format
} from "date-fns";
import { useEffect, useState } from "react";
import CalendarCell from "./CalendarCell";
import { guestEventRoute } from "@/utils/Endpoint";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function Calendar() {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([])

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [eventdata, setEventdata] = useState({})

  let startDate = startOfMonth(selectedDate);
  let endDate = endOfMonth(selectedDate);
  let prefixDays = startDate.getDay();
  let nextMonthDays = 6 - endDate.getDay();
  let numDays = differenceInDays(endDate, startDate) + 1;
  let prevMonthDays = differenceInDays(startDate, startOfMonth(sub(startDate, { months: 1 }))) - 1;

  const prevMonth = () => {
    setSelectedDate(sub(selectedDate, { months: 1 }));
  };
  const nextMonth = () => {
    setSelectedDate(add(selectedDate, { months: 1 }));
  };

  const testFn = (events) => {

    const currMonthEvents = events?.filter((item, i) => getMonth(item?.date) === selectedDate.getMonth() && getYear(item?.date) === selectedDate.getFullYear())

    const xyz = {}

    currMonthEvents.forEach((item, i) => {

      const day = Number(format(item?.date, 'dd'));

      if (!Array?.isArray(xyz[day])) {
        xyz[day] = [];
      }
      xyz[day]?.push({ title: item?.title, _id: item?._id })

    })

    setEventdata(xyz)
  }

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get(guestEventRoute)

      if (response.status === 200) {
        const event = response?.data?.event;
        console.log({ fetchedevent: event })

        setData([...event])

        testFn(event)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log({ data })
  console.log({ selectedDate })

  useEffect(() => {
    fetchData()
  }, [selectedDate])

  return (
    <div className="border rounded-xl border-gray-400 flex max-lg:flex-col justify-between">
      <div className="p-5 font-semibold flex flex-col items-center ">
        <h2 className="text-start w-full">
          {months[selectedDate.getMonth()] + " " + selectedDate.getFullYear()}
        </h2>
        <div className="flex w-full text-start">
          <button
            onClick={prevMonth}
            className="bg-primary-green text-white px-4 py-1 rounded-lg mt-2"
          >
            Prev
          </button>
          <button
            className="bg-primary-green text-white px-4 py-1 rounded-lg mt-2 ml-2"
            onClick={nextMonth}
          >
            Next
          </button>
        </div>
      </div>
      <div className="max-sm:p-3 ">
        <div className="grid grid-cols-7  max-sm:m-0 w-fit max-sm:w-full border-r">

          {dayOfTheWeek.map((day, index) => (
            <div
              key={index}
              className="border-l border-b text-sm font-medium text-gray-500 w-[6.5rem] max-sm:w-full py-2 flex justify-center"
            >
              <h4>{day}</h4>
            </div>
          ))}

          {/* Previous Month dates in display */}
          {Array.from({ length: prefixDays }).map((_, index) =>
            index === 0 ? (
              <CalendarCell
                current={false}
                date={prevMonthDays - (prefixDays - 1 - index)}
                key={index}
                monthname={months[selectedDate.getMonth() - 1]}
              />
            ) : (
              <CalendarCell
                current={false}
                date={prevMonthDays - (prefixDays - 1 - index)}
                key={index}
              />
            )
          )}

          {/* Current Month */}
          {Array.from({ length: numDays }).map((_, index) =>
            index === 0 ? (
              <CalendarCell
                current={true}
                isToday={
                  today.getDate() === index + 1 &&
                  today.getFullYear() === selectedDate.getFullYear() &&
                  today.getMonth() === selectedDate.getMonth()
                }
                date={index}
                events={eventdata[`${index + 1}`]}
                key={index}
                monthname={months[selectedDate.getMonth()]}
                year={selectedDate.getFullYear()}
                monthNo={selectedDate.getMonth()}
              />
            ) : (
              <CalendarCell
                isToday={
                  today.getDate() === index + 1 &&
                  today.getFullYear() === selectedDate.getFullYear() &&
                  today.getMonth() === selectedDate.getMonth()
                }
                date={index}
                events={eventdata[`${index + 1}`]}
                key={index}
                year={selectedDate.getFullYear()}
                monthNo={selectedDate.getMonth()}
              />
            )
          )}

          {/* Next Month dates in display */}
          {Array.from({ length: nextMonthDays }).map((_, index) =>
            index === 0 ? (
              <CalendarCell
                current={false}
                date={0}
                key={index}
                monthname={months[selectedDate.getMonth() + 1]}
              />
            ) : (
              <CalendarCell current={false} date={index} key={index} />
            )
          )}

        </div>
      </div>
    </div>
  );
}

export default Calendar;
