"use client";
import FileUploadField from "@/components/Common/FileUploadField";
import NormalTextField from "@/components/Common/NormalTextField";
import { CompanyAPI, getAllCompany, uploadGustImageUrl } from "@/utils/Endpoint";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from 'next/navigation';
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { UploadImage } from "@/utils/UploadImage";

const initialUserdata = {
  name: "",
  hyperlink: "",
  employee: {
    name: "",
    position: "",
    phone: "",
  },
  logo: "",
};

const Page = () => {
  const [userdata, setuserdata] = useState(initialUserdata);
  const [logo, setLogo] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');

 useEffect(() => {
        if (companyId) {
            console.log(companyId)
            setIsEditMode(true);
            const fetchMemberDetails = async () => {
                try {
                    const res = await axiosPrivate.get(`${getAllCompany}/${companyId}`);
                    setuserdata(res?.data?.result);
                    console.log(res?.data)
                    setLogo(userdata.logo?.location);
                } catch (error) {
                    console.error('Error fetching Company details:', error);
                    toast.error('Failed to load Company details.');
                }
            };
            fetchMemberDetails();
        }
    }, [companyId, axiosPrivate]);

  const handleChange = (field, value) => {
    const updatedUserdata = { ...userdata };

    if (field.includes(".")) {
      const fields = field.split(".");
      let nestedField = updatedUserdata;

      for (let i = 0; i < fields.length - 1; i++) {
        nestedField = nestedField[fields[i]];
      }

      nestedField[fields[fields.length - 1]] = value;
    } else {
      updatedUserdata[field] = value;
    }

    setuserdata(updatedUserdata);
    console.log(userdata)
  };

  useEffect(() => {
    const uploadLogo = async () => {
      if (userdata.logo) {
        try {
          const res = await UploadImage(
            userdata.logo,
            uploadGustImageUrl,
            axiosPrivate
          );
          setLogo(res.data.file);
          console.log(res.data.file);
        } catch (error) {
          console.error("Error uploading logo:", error);
        }
      }
    };

    uploadLogo();
  }, [userdata?.logo]);

  const handleSubmitform = async (event) => {
    event.preventDefault();

    const endpoint = isEditMode ? `${CompanyAPI}/${companyId}` : CompanyAPI;
    const method = isEditMode ? "put" : "post";

    const submitUserData = {
      ...userdata,
      logo,
    };

    try {
      const response = await axiosPrivate[method](endpoint, submitUserData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(`Company ${isEditMode ? "updated" : "added"} successfully.`);
      router.push("/admin/company");
    } catch (error) {
      console.error("Error submitting Company data:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} Company.`);
    }
  };

  return (
    <div className="flex flex-col w-full px-10 pt-12 max-md:pt-20 mb-28">
      <h1 className="font-semibold text-title pb-10">
        {isEditMode ? "Edit Company" : "Add Company"}
      </h1>
      <form onSubmit={handleSubmitform}>
        <NormalTextField
          editable
          value={userdata.name}
          onChange={(e) => handleChange("name", e.target.value)}
          label="Company Name"
          placeholder="Company Name"
          key="name"
        />
        <NormalTextField
          editable
          value={userdata.hyperlink}
          onChange={(e) => handleChange("hyperlink", e.target.value)}
          label="Website"
          placeholder="Website"
          key="hyperlink"
        />
        <NormalTextField
          editable
          value={userdata.employee.name}
          onChange={(e) => handleChange("employee.name", e.target.value)}
          label="Employee Name"
          placeholder="Employee Name"
          key="employeeName"
        />
        <NormalTextField
          editable
          value={userdata.employee.position}
          onChange={(e) => handleChange("employee.position", e.target.value)}
          label="Designation"
          placeholder="Designation"
          type="text"
          key="designation"
        />
        <NormalTextField
          editable
          value={userdata.employee.phone}
          onChange={(e) => handleChange("employee.phone", e.target.value)}
          label="Contact Number"
          placeholder="Contact Number"
          type="text"
          key="contactNumber"
        />
        <div className="flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5">
          <div className="w-[35%] max-md:w-full font-medium">
            <h2>Attach Company logo File</h2>
          </div>
          <div className="w-6/12 max-md:w-full">
            <FileUploadField
              sizeLimit={1024 * 1024 * 5}
              typeNames={["JPEG", "PNG", "GIF", "PDF"]}
              fileTypes={[
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
              ]}
              value={userdata.logo}
              onChange={(file) => handleChange("logo", file)}
              url={uploadGustImageUrl}
            />
          </div>
        </div>
        <div>
          <button
            className="bg-[#266941] text-white px-5 p-3 text-xs rounded-lg mt-5"
            type="submit"
          >
            {isEditMode ? "Update Company" : "Add Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
