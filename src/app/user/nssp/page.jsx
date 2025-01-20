import React from 'react';
import Image from 'next/image';
import mill from '@/../../public/Assets/user/nss/logo.jpg';
import { nssdata } from '@/data/initiatives';
import Link from 'next/link';

const NSS = () => {
    return (
        <div className='max-w-[1280px] mx-auto w-full flex flex-col py-5 xl:py-10 px-4 xl:px-0
    gap-12 '>

            <h1 data-aos='fade-up' data-aos-duration='700' className='text-xl sm:text-2xl text-black font-semibold'>NSSP(National Sustainable Spice Program)</h1>

            <div className='w-full h-full flex flex-col-reverse lg:flex-row gap-5'>

                <div className='w-full lg:w-3/5 flex flex-col justify-between gap-8'>
                    <div data-aos='fade-up' data-aos-duration='700' className='w-full flex flex-col gap-4 '>
                        {nssdata?.map((item, i) => (
                            <div key={i} className='text-sm'>
                                <p >{item?.para}</p>
                                {
                                    item?.list?.length > 0
                                    &&
                                    <ul className='pl-4' >
                                        {item?.list?.map((litem, li) => (
                                            <li key={li}
                                                className='list-disc'
                                            >
                                                {litem}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                }
                            </div>
                        ))}
                        <Link href={'https://www.nationalspiceconference.in/about/nssp'} data-aos='fade-up' data-aos-duration='700' className=' w-full lg:w-fit bg-primaryColor text-white px-3 py-2 rounded-md'>
                            Visit NSSP
                        </Link>
                    </div>
                </div>

                <Image
                    data-aos='fade-left' data-aos-duration='700'
                    src={mill}
                    className='w-full lg:w-2/5 h-50 object-contain'
                    alt='banner'
                />

            </div>
        </div>
    )
}

export default NSS