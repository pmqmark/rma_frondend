'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbArrowsDiagonal } from 'react-icons/tb';
import StatusIndicator from '../Members/StatusIndicator';
import { CgProfile } from 'react-icons/cg';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { FiEdit2 } from 'react-icons/fi';
import DeleteButton from '../News/DeleteButton';
import {  getAllCompany } from '@/utils/Endpoint';

const CompanyTable = () => {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // To hold selected company data.
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility.

  const axiosPrivate = useAxiosPrivate();

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(getAllCompany);
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

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <table className="w-full max-md:w-fit max-md:overflow-x-scroll text-base table">
        <thead className="bg-[#f4f6f7]">
          <tr>
            <th className="pl-5 text-start py-3 font-normal max-md:text-sm">Company Name</th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm">Website</th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm">Employee Name</th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm">Designation</th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm">Contact Number</th>
            <th className="px-5 text-start py-3 font-normal max-md:text-sm ">Action</th>
            <th className="pr-5 text-start py-3 font-normal max-md:text-sm">View</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="pl-5">
                <div className="flex items-center py-3">
                  {item.logo?.location ?  (
                    <img
                      className="max-h-10 cursor-pointer rounded-full w-10"
                      src={`${item.logo.location}`}
                      alt="idProof"
                    />
                  ): (
                    <CgProfile size={40} />
                  ) }
                  <div className="ml-4 truncate">
                    <h4 className="font-semibold max-md:text-sm text-base capitalize">
                      {item?.name ?? 'NIL'}
                    </h4>
                  </div>
                </div>
              </td>
              <td className="px-5">{item?.hyperlink  ?? 'NIL'}</td>
              <td className="px-5">{item?.employee?.name ?? 'NIL'}</td>
              <td className="capitalize px-5">{item?.employee?.position ?? 'NIL'}</td>
              <td className="capitalize px-5">{item?.employee?.phone ?? 'NIL'}</td>
              {/* <td className="capitalize px-5">
                <StatusIndicator status={item?.isActive ? 'active' : 'inactive'} />
              </td> */}
              <td className="px-5">
                <div className="flex w-full justify-evenly max-md:gap-3 px-8 py-6">
                  <DeleteButton name={'company'} id={item?._id} data={data} setData={setData} />
                  <button>
                    <Link 
                    href={{ 
                      pathname: `/admin/company/addcompany`,
                      query: { companyId:item?._id },
                     }}>
                      <FiEdit2 size={20} />
                    </Link>
                  </button>
                </div>
              </td>
              <td className="pr-5">
                <button onClick={() => handleViewDetails(item)}>
                  <TbArrowsDiagonal size={22} className="cursor-pointer text-blue-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 0 && <p className="mx-auto w-fit py-5">No available data</p>}

      {/* Modal for full details */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Company Details
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition duration-150"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      {selectedCompany ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <strong className="text-gray-700">Company Logo:</strong>
            {selectedCompany.logo?.location ? (
              <img
                src={selectedCompany.logo.location}
                alt={`${selectedCompany.name ?? 'Company'} Logo`}
                className="w-16 h-16 object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </div>
          <p>
            <strong className="text-gray-700">Company Name:</strong>{' '}
            {selectedCompany.name ?? (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </p>
          <p>
            <strong className="text-gray-700">Website:</strong>{' '}
            {selectedCompany.hyperlink ? (
              <a
                href={selectedCompany.hyperlink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {selectedCompany.hyperlink}
              </a>
            ) : (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </p>
          <p>
            <strong className="text-gray-700">Employee Name:</strong>{' '}
            {selectedCompany.employee?.name ?? (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </p>
          <p>
            <strong className="text-gray-700">Designation:</strong>{' '}
            {selectedCompany.employee?.position ?? (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </p>
          <p>
            <strong className="text-gray-700">Contact Number:</strong>{' '}
            {selectedCompany.employee?.phone ?? (
              <span className="text-gray-500 italic">NIL</span>
            )}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">
          No details available.
        </p>
      )}
      <div className="mt-6 flex justify-end">
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default CompanyTable;
