"use client";
import ApproveBtn from "@/components/Admin/Buttons/ApproveBtn";
import RejectBtn from "@/components/Admin/Buttons/RejectBtn";
import NormalTextField from "@/components/Admin/Members/NormalTextField";
import StatusIndicator from "@/components/Admin/Members/StatusIndicator";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { adminApplicationRoute, baseUrl } from "@/utils/Endpoint";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoDocumentText } from "react-icons/io5";

function Page({ params }) {
  const axiosPrivate = useAxiosPrivate();

  const router = useRouter();

  const { id } = params;

  const [data, setData] = useState({});

  useEffect(() => {
    axiosPrivate
      .get(`${adminApplicationRoute}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const appln = response?.data?.application;

          setData((prev) => ({
            ...appln,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPrivate, id]);

  const fieldData = [
    { label: "Username", placeholder: "Username", key: "username" },
    {
      label: "Name of the Applicant",
      placeholder: "Name of the Applicant",
      key: "applicantName",
    },
    {
      label: "Address",
      placeholder: "Address",
      type: "textarea",
      key: "address",
    },
    { label: "State/Province", placeholder: "State", key: "state" },
    { label: "Country", placeholder: "Country", key: "country" },
    { label: "Telephone", placeholder: "Telephone", key: "phone", type: "tel" },
    { label: "Fax", placeholder: "Fax", key: "fax" },
    { label: "Email", placeholder: "Email", key: "email", type: "email" },
    { label: "Website", placeholder: "Website", key: "website", type: "url" },
    {
      label: "Contact Person",
      placeholder: "Contact Person",
      key: "contactPerson",
    },
  ];

  const businessFields = [
    {
      label: "Nature of business/product line",
      placeholder: "Nature of business",
      key: "nature",
    },
    {
      label: "Name of the business/entity associated with",
      placeholder: "business",
      key: "name",
    },
    {
      label: "Address of the business/entity",
      placeholder: "Address here",
      type: "textarea",
      key: "address",
    },
    {
      label: "Registration number business/entity",
      placeholder: "Registration number business/entity",
      key: "regNum",
    },
    {
      label: "Registration date of business/entity",
      key: "regDate",
      type: "date",
    },
    {
      label: "Date of commencement of business/entity",
      key: "commenceDate",
      type: "date",
    },
    {
      label: "Name of the authorized person representing business/entity",
      placeholder: "Name of the authorized person",
      key: "authRep",
    },
    {
      label: "Name of alternate authorized representative",
      placeholder: "Name of alternate authorized representative",
      key: "altAuthRep",
    },
    {
      label: "Name of person authorized to attend meetings",
      placeholder: "Position",
      key: "meetAuthRep",
    },
  ];

  console.log(data);
  return (
    <div className="flex flex-col w-full px-10 pt-12 max-md:pt-20 mb-28">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 ">
        <span className="font-semibold text-title ">View Application</span>
        <div className="">
          <StatusIndicator status={data?.status} />
        </div>
      </div>

      {fieldData?.map((item, index) => (
        <NormalTextField
          label={item?.label}
          placeholder={item?.placeholder}
          key={item?.key}
          type={item?.type}
          value={data[item?.key]}
          disabled={true}
        />
      ))}

      <div className="flex flex-col lg:flex-row justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
        <div className="w-[35%] max-md:w-fit font-medium">
          <h2>Membership applied for</h2>
        </div>
        <div className="w-[64%] max-md:w-fit">
          <input
            name={data?.membershipType?.value}
            value={data?.membershipType?.label}
            className="w-full border border-gray-400 mt-1 px-4 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
        <div className="w-[35%] max-md:w-fit font-medium">
          <h2>Mode of payment</h2>
        </div>
        <div className="w-[64%] max-md:w-fit">
          <input
            name={data?.payMode?.value}
            value={data?.payMode?.label}
            className="w-full border border-gray-400 mt-1 px-4 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
          />
        </div>
      </div>

      <div className="flex justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
        <div className="w-[35%] max-md:w-fit font-medium">
          <h2>Includes Renewal Payment</h2>
        </div>
        <div className="w-[64%] max-md:w-fit">
          {data?.hasRenewalPay ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-red-500">No</span>
          )}
        </div>
      </div>

      <div className="flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
        <div className="w-[35%] max-md:w-full font-medium">
          <h2>Identity Proof </h2>
        </div>
        <div className="w-[64%] max-md:w-full">
          {data?.idProof?.location ? (
            <a href={`${baseUrl}${data?.idProof?.location}`} target="_blank" rel="noopener noreferrer">
              {/\.(pdf|doc|docx)$/.test(data.idProof.location) ? (
                // Render a dummy image for PDF or Word files
                <IoDocumentText size={40} />
              ) : (
                <img
                  className="max-h-20 cursor-pointer rounded"
                  src={`${baseUrl}${data.idProof.location}`}
                  alt="idProof"
                />
              )}
            </a>
          ) : (
            <p>No ID proof available</p>
          )}

        </div>
      </div>

      {businessFields?.map((item, index) => (
        <NormalTextField
          label={item?.label}
          placeholder={item?.placeholder}
          key={item?.key}
          type={item?.type}
          value={data?.business?.[item?.key]}
          disabled={true}
        />
      ))}

      {data?.status === "pending" && (
        <div>
          <RejectBtn
            main="/admin/applications"
            id={id}
            route={adminApplicationRoute}
            title="Reject application"
            content="Click Reject to reject this application"
          />
          <ApproveBtn
            main="/admin/applications"
            id={id}
            route={adminApplicationRoute}
            title="Approve application"
            content="Click Confirm to approve this application"
          />
        </div>
      )}
    </div>
  );
}

export default Page;
