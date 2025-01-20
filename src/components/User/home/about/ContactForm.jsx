"use client";

import { baseUrl, contactRoute, register } from "@/utils/Endpoint";
import axios from "axios";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
    designation: "",
    phone: "",
    comments: "",
  });

  //   OnChange Input Handler
  const inputChangeHandler = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value) => {
    setPostData({
      ...postData,
      phone: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/

      if (!postData.name.trim()) {
        toast.error("Name is required")
        return
      }
      else if (!nameRegex.test(postData?.name)) {
        toast.error("Enter a valid name")
        return
      }

      if (!postData.email.trim()) {
        toast.error("Email is required")
        return
      } else if (!/\S+@\S+\.\S+/.test(postData.email)) {
        toast.error("Email is not valid")
        return

      }

      if (!postData.company.trim()) {
        toast.error("Company is required")
        return
      }

      if (!postData.comments.trim()) {
        toast.error("Comment is required")
        return
      }
      const response = await axios.post(`${baseUrl}${contactRoute}`, postData)

      if (response.status === 200) {
        toast.success('Message Sent');

        setPostData({
          name: "",
          email: "",
          company: "",
          address: "",
          designation: "",
          phone: "",
          comments: "",
        })

      }
      else {
        toast.error('Failed to sent message')
      }

    } catch (error) {
      console.log(error)
      toast.error('Failed to sent message')
    }
  }

  return (
    <form action="" className="w-full  grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Name
        </label>
        <input
          type="text"
          value={postData?.name}
          onChange={inputChangeHandler}
          name="name"
          required
          placeholder="Your name"
          className="text-sm border rounded-lg p-3 focus:outline-none text-black/85"
        />
      </div>

      {/* Designation */}
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Designation
        </label>
        <input
          type="text"
          value={postData?.designation}
          onChange={inputChangeHandler}
          name="designation"
          required
          placeholder="Designation"
          className="text-sm border rounded-lg p-3 focus:outline-none text-black/85"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Email
        </label>
        <input
          type="email"
          value={postData?.email}
          onChange={inputChangeHandler}
          name="email"
          required
          placeholder="you@company.com"
          className="text-sm border rounded-lg p-3 focus:outline-none text-black/85"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Phone number
        </label>
        <PhoneInput
          country={"in"}
          value={postData?.phone}
          onChange={handlePhoneChange}
          inputProps={{
            name: "phone",
            required: true,
            // autoFocus: true,
          }}
          containerStyle={{
            width: "100%",
          }}
          inputStyle={{
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            padding: "12px 14px",
            paddingLeft: "40px",
            fontSize: "14px",
            color: "black",
          }}
          buttonStyle={{
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        />
      </div>

      {/* Company +  Address */}
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Company
        </label>
        <input
          type="text"
          value={postData?.company}
          onChange={inputChangeHandler}
          name="company"
          required
          placeholder="company"
          className="text-sm border rounded-lg p-3 focus:outline-none text-black/85"
        />

        <label
          htmlFor=""
          className="text-black/70 font-medium text-[14px] mt-5"
        >
          Address
        </label>
        <input
          type="text"
          value={postData?.address}
          onChange={inputChangeHandler}
          name="address"
          required
          placeholder="Address"
          className="text-sm border rounded-lg p-3 focus:outline-none text-black/85"
        />
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1  w-full h-full ">
        <label htmlFor="" className="text-black/70 font-medium text-[14px]">
          Comments
        </label>
        <textarea
          type="text"
          value={postData?.comments}
          onChange={inputChangeHandler}
          name="comments"
          required
          placeholder="comments here"
          className="text-sm border w-full h-full rounded-lg p-3 focus:outline-none text-black/85"
        />
      </div>

      {/* Button */}
      <div className="flex flex-col gap-1  w-full h-full ">
        <button onClick={handleSubmit} className="bg-primaryColor p-2 rounded-lg text-white text-sm">
          Get started
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
