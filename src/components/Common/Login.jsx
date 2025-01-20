"use client";

import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { login } from "@/utils/Endpoint";

const LoginPage = ({ modal }) => {
  const router = useRouter();

  // Login Modal Form Data Part
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Change Update
  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData?.username?.trim()) return toast.warning("Enter valid username")
    if (!formData?.password?.trim()) return toast.warning("Enter password")

    try {
      const res = await signIn("credentials", {
        username: formData?.username,
        password: formData?.password,
        route: login,
        redirect: false,
      });

      console.log(res);

      if (res?.status === 401) {
        console.log("Invalid Credentials", res?.error);
        toast.error("Invalid Credentials")
        return;
      }

      // Get the user data from the session
      const session = await getSession();

      if (session?.user?.userInfo?.role === "member") {
        modal(false);
        return router.replace("/user/news");
      } 

    } catch (error) {
      console.log("Error throwing while we try to login", error);
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="fixed z-50 top-20 right-0 md:right-[8%] bg-white shadow rounded w-full md:w-[300px] p-5 md:p-10">
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col items-center justify-center gap-5 "
      >
        <IoCloseCircleOutline
          size={20}
          onClick={() => modal(false)}
          className="text-[#000000]/50 cursor-pointer absolute top-4 right-4"
        />

        {/* userName */}
        <div>
          <label
            className="text-sm font-semibold text-[#000000]/80 "
            htmlFor=""
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData?.username}
            onChange={inputChangeHandler}
            placeholder="Username"
            className="p-3 text-sm text-[#000000]/50 border border-[#000000]/20 w-full rounded-lg focus:outline-none"
          />
        </div>

        {/* password */}
        <div>
          <label
            className="text-sm font-semibold text-[#000000]/80 "
            htmlFor=""
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData?.password}
            onChange={inputChangeHandler}
            placeholder="********"
            className="p-3 text-sm text-[#000000]/50 border border-[#000000]/20 w-full rounded-lg focus:outline-none"
          />
        </div>

        {/* Button */}
        <div className="w-full">
          <button
            type="submit"
            className="p-3 bg-primaryColor text-white text-sm rounded-lg w-full">
            Sign in
          </button>
        </div>

        {/* Sign-up link */}
        <div>
          <h4 className="text-[#000000]/50 text-sm">
            Don&apos;t have a account?{" "}
            <Link
              href={"/user/membership"}
              className="font-semibold text-primaryColor "
            >
              Sign up
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
