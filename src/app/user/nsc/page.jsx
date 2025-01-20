import React from "react";
import Image from "next/image";
import hall from "@/../../public/Assets/user/nsc/hall.png";
import mill from '@/../../public/Assets/user/nss/mill.jpg';
import { nscdata } from "@/data/initiatives";
import { getSession } from "next-auth/react";
import Link from "next/link";

async function test() {
  const userData = await getSession();
  console.log(userData);
  return userData
}
const NSC = async () => {
  test()
  return (
    <div
      className="max-w-[1280px] mx-auto w-full flex flex-col p-3 py-5 xl:py-10 px-4 xl:px-0
    gap-12 "
    >
      <h1 data-aos='fade-up' data-aos-duration='700' className="text-[#101828] font-bold text-2xl self-start ">
        NSC (National Spice Conference)
      </h1>

      <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-5">
        <div className="w-full lg:w-3/5 flex flex-col justify-between gap-8">
          <div data-aos='fade-up' data-aos-duration='700' className="w-full flex flex-col gap-4 ">
            {nscdata?.map((item, i) => (
              <div key={i} className="text-sm">
                <p>{item?.para}</p>
                {item?.list?.length > 0 && (
                  <ul className="pl-4">
                    {item?.list?.map((litem, li) => (
                      <li key={li} className="list-disc">
                        {litem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link href={'https://www.nationalspiceconference.in/'} data-aos='fade-up' data-aos-duration='700' className=" w-full lg:w-fit bg-primaryColor text-white p-2 text-sm  px-5 mt-2 rounded-md">
              Visit NSC
            </Link>
          </div>
        </div>

        <Image data-aos='fade-left' data-aos-duration='700' src={mill} className="w-full lg:w-2/5 h-50 object-cover" alt="banner" />
      </div>
    </div>
  );
};

export default NSC;
