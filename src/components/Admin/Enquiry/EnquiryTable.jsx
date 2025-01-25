"use client";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getAllEnquirys } from "@/utils/Endpoint";
import { TbArrowsDiagonal } from "react-icons/tb";

const EnquiryTable = () => {
  const [data, setData] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null); // State for selected enquiry
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(getAllEnquirys);
      if (response.status === 200) {
        const data = response?.data?.result || [];
        console.log(response?.data?.result);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleViewClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEnquiry(null);
    setIsModalOpen(false);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <table className="w-full max-md:w-fit max-md:overflow-x-scroll text-base table">
        <thead className="bg-[#f4f6f7]">
          <tr>
            <th className="pl-5 text-start py-3 font-normal max-md:text-sm ">
              Name
            </th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">
              Phone
            </th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">
              Address
            </th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">
              Comments
            </th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">
              Email
            </th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">
              Company
            </th>
            <th className="pr-5 text-start py-3 font-normal max-md:text-sm ">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="pl-5">
                <div className="flex items-center py-3">
                  <div className="ml-4 truncate">
                    <h4 className="font-semibold max-md:text-sm text-base capitalize">
                      {item?.name ?? "NIL"}
                    </h4>
                  </div>
                </div>
              </td>
              <td className="px-5">{item?.phone ?? "NIL"}</td>
              <td className="px-5">{item?.address ?? "NIL"}</td>
              <td className="px-5">{item?.comments ?? "NIL"}</td>
              <td className="px-5">{item?.email ?? "NIL"}</td>
              <td className="px-5">{item?.company ?? "NIL"}</td>
              <td className="pr-5">
                <TbArrowsDiagonal
                  size={22}
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleViewClick(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 0 && (
        <p className="mx-auto w-fit py-5">No available data</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Enquiry Details</h2>
            <p>
              <strong>Name:</strong> {selectedEnquiry?.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedEnquiry?.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedEnquiry?.email}
            </p>
            <p>
              <strong>Comments:</strong> {selectedEnquiry?.comments}
            </p>
            <p>
              <strong>Address:</strong> {selectedEnquiry?.address}
            </p>
            <p>
              <strong>Company:</strong> {selectedEnquiry?.company}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEnquiry?.designation}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {selectedEnquiry?.createdAt
                ? formatDate(selectedEnquiry.createdAt)
                : "NIL"}
            </p>

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryTable;
