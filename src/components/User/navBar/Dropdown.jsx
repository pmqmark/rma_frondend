import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";


function Dropdown({ title, children, mobview, dropArr, chooseOne }) {

  const dropObj = dropArr.find(el => el?.title === title);

  const isOpen = dropObj?.value

  return (
    <>
      <div className="relative  hidden md:inline-block">
        <span
          onClick={() => chooseOne(title, dropArr)}
          className="flex items-center gap-2 hover:cursor-pointer text-[15px] capitalize select-none"
        >
          {title}
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}{" "}
        </span>

        {isOpen && (
          <ul
            className={`absolute z-50 top-10  w-fit bg-white text-black ${mobview
              ? " min-w-[40vw] -left-10"
              : " min-w-[10vw] -left-5"
              } shadow-lg rounded-b-md rounded-t-none overflow-hidden mt-1`}
          >
            {children}
          </ul>
        )}
      </div>
      <div className="relative flex w-full items-center justify-center sm:hidden">
        <span
          onClick={() => chooseOne(title, dropArr)}
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          {title}
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}{" "}
        </span>

        {isOpen && (
          <ul
            className={`absolute z-50 top-7  w-fit ${mobview
              ? "bg-white w-full "
              : "bg-primaryColor min-w-[10vw] -left-5"
              } shadow-md rounded-b-md rounded-t-none overflow-hidden mt-1`}
          >
            {children}
          </ul>
        )}
      </div>
    </>
  );
}

export default Dropdown;