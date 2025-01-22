"use client";
import React, { useEffect, useState } from "react";
import log from "@/../../public/Assets/user/nav/logov1.png";
import log1 from "@/../../public/Assets/user/nav/logo.png";
import Image from "next/image";
import Link from "next/link";
import LoginPage from "../Common/Login";
import Dropdown from "./navBar/Dropdown";

import { navBar } from "@/data/nav.js";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { getSession, signOut, useSession } from "next-auth/react";

const getSessionData = async () => {
  const userData = await getSession();
  return userData;
};

const UserNav = () => {
  const path = usePathname();
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [LoginModal, setLoginModal] = useState(false);
  const [userData, setUserData] = useState({});

  const { data: session, status } = useSession();


  const [dropArr, setDropArr] = useState([
    { title: "Media", value: false },
    { title: "WSO Initiatives", value: false },
  ]);

  useEffect(() => {
    const closedDrops = dropArr.map((el) => ({ ...el, value: false }));
    setDropArr([...closedDrops]);
  }, [path]);

  const chooseOne = (title, dropArr) => {
    const newDrop = dropArr.map((el) => {
      if (el?.title === title) {
        el.value = !el.value;
      } else {
        el.value = false;
      }

      return el;
    });

    setDropArr((prev) => [...newDrop]);
  };

  const navigateFn = (link) => {
    router.push(link);
    setModal(false);
  };

  // For the user finding
  useEffect(() => {
    const fetchSessionData = async () => {
      const session = await getSessionData();
      setUserData(session?.user?.userInfo);
    };

    fetchSessionData();
  }, []);

  useEffect(() => {

  }, [status])

  return (
    <>
      {/* Desktop view */}
      <div className={`max-w-[1280px] mx-auto w-full hidden z-50 md:flex items-center justify-between ${path == '/' ? "absolute top-0 text-white" : "text-black "}`}>
        <Link href={'/'} className="logo">
          {
            path == '/' ?
              <Image src={log} alt="logo" className="w-[100px] " /> :
              <Image src={log1} alt="logo" className="w-[100px]" />
          }
        </Link>

        {/* Navigation links */}
        <div className="list">
          <div className="flex gap-5 ">
            {navBar.map((item, index) =>
              item.list.length > 0 ? (
                <Dropdown
                  key={index}
                  dropArr={dropArr}
                  chooseOne={chooseOne}
                  mobview={false}
                  title={item?.title}
                >
                  {item.list?.map((litem, i) => (
                    <Link key={i} href={litem.subLink} className="select-none">
                      <li
                        key={i}
                        className=" px-4 py-2 text-[13px] capitalize hover:bg-gray-200 cursor-pointer flex justify-center"
                      >
                        {litem.subTitle}
                      </li>
                    </Link>
                  ))}
                </Dropdown>
              ) : (
                <li
                  key={index}
                  className=" flex items-center gap-2 text-[15px]  capitalize"
                >
                  <Link href={item.link}>{item.title}</Link>
                </li>
              )
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons flex gap-3 text-[13px] font-medium capitalize">
          {
            (status === "authenticated")
              ?
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className=" bg-red-600 text-white p-2 px-5 rounded-lg"
              >
                Logout
              </button>

              :
              (
                <>
                  <button
                    onClick={() => router.push("/user/membership")}
                    className=" border-2  p-2 px-5 rounded-lg">
                    Register as member
                  </button>

                  <button
                    onClick={() => setLoginModal(!LoginModal)}
                    className=" text-white bg-primaryColor p-2 px-5 rounded-lg"
                  >
                    Login
                  </button>
                </>
              )
          }

        </div>
      </div>

      {/* Mobile view */}
      <div className="max-w-[1280px] mx-auto w-full md:hidden flex justify-between items-center ">
        <>
          <div className="logo">
            <Image src={log} alt="logo" className="w-[80px]" />
          </div>

          <div className="pe-3">
            <FiMenu size={30} onClick={() => setModal(true)} />
          </div>

          {/* Mobile side bar option modal */}
          {modal && (
            <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-white">
              <div className="absolute top-5 right-5">
                <IoCloseCircleOutline
                  size={30}
                  onClick={() => setModal(!modal)}
                />
              </div>

              <div className="w-full h-full flex flex-col items-center justify-center">
                <Image src={log} alt="logo" className="w-[320px]" />

                <div className="flex flex-col items-center gap-5">
                  {navBar.map((item, index) =>
                    item.list.length > 0 ? (
                      <Dropdown
                        key={index}
                        dropArr={dropArr}
                        chooseOne={chooseOne}
                        mobview={true}
                        title={item?.title}
                      >
                        {item.list?.map((litem, i) => (
                          <li
                            key={i}
                            onClick={() => navigateFn(litem.subLink)}
                            className="select-none px-4 py-2 text-[13px] capitalize hover:bg-gray-200 cursor-pointer flex justify-center"
                          >
                            {litem.subTitle}
                          </li>
                        ))}
                      </Dropdown>
                    ) : (
                      <li
                        key={index}
                        onClick={() => navigateFn(item.link)}
                        className="text-black flex items-center gap-2 text-[15px]  capitalize"
                      >
                        {item.title}
                      </li>
                    )
                  )}
                </div>

                <div className="buttons w-full flex flex-col items-center justify-center mt-5 gap-3 text-black text-[13px] font-medium capitalize">
                  {
                    (status === "authenticated")
                      ?
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-1/2 sm:w-fit text-white bg-red-600 p-2 px-5 rounded-lg"
                      >
                        Logout
                      </button>

                      :
                      (
                        <>
                          <button
                            onClick={() => router.push("/user/membership")}
                            className="w-1/2 sm:w-fit border-2 border-primaryColor p-2 px-5 rounded-lg">
                            Register as member
                          </button>

                          <button
                            onClick={() => setLoginModal(!LoginModal)}
                            className="w-1/2 sm:w-fit text-white bg-primaryColor p-2 px-5 rounded-lg"
                          >
                            Login
                          </button>
                        </>
                      )
                  }

                </div>
              </div>
            </div>
          )}
        </>
      </div>

      {/* login modal */}
      {LoginModal && <LoginPage modal={setLoginModal} />}
    </>
  );
};

export default UserNav;
