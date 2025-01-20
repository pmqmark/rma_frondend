"use client";
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import DeleteButton from "@/components/Admin/News/DeleteButton";
import axios from '@/axios-folder/axios';
import { guestNewsRoute } from '@/utils/Endpoint';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import parse from 'html-react-parser';
import { TbArrowsDiagonal } from 'react-icons/tb';

const NewsTable = () => {
  const [data, setData] = useState([]);

  const axiosPrivate = useAxiosPrivate()

  const getNews = async () => {
    try {
      const response = await axiosPrivate.get(guestNewsRoute);
      console.log({ response })
      if (response.status === 200) {
        setData(response?.data?.news)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <>
      <table className="w-full text-base max-md:text-sm table">
        <thead className="bg-[#f4f6f7]">
          <tr>
            <th className="pl-5 py-3 font-normal text-start">No</th>
            <th className="px-5 py-3 font-normal text-start">
              Title
            </th>
            <th className="px-5 py-3 font-normal text-start">
              Description
            </th>
            <th className="px-8 py-3 font-normal">Action</th>
            <th className="pr-5 py-3 font-normal text-start">View</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.length > 0
            &&
            data?.map((item, i) => (
              <tr key={i}>
                <td className="px-5 py-6">{i + 1}</td>
                <td className="px-5 py-6">{item?.title}</td>
                <td className="px-5 py-6">{parse(item?.description)}</td>
                <td className="flex w-full justify-around px-5 py-6">
                  <DeleteButton name={"news"} id={item?._id} data={data} setData={setData} />
                  <button>
                    <Link href={{ pathname: `/admin/news/edit/${item?._id}` }}>
                      <FiEdit2 size={20} />
                    </Link>
                  </button>
                </td>

                <td >
                  <Link 
                  href={{ pathname: `/admin/news/view/${item?._id}` }}
                  >
                    <TbArrowsDiagonal size={22} className='cursor-pointer text-blue-500 ' />
                  </Link>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>

      {
        data?.length === 0
        &&
        <p className='mx-auto w-fit py-5'>No available data</p>
      }
    </>
  )
}

export default NewsTable