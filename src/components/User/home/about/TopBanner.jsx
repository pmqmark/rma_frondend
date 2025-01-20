import { Banner } from '@/data/about'
import Image from 'next/image'
import React from 'react'

const TopBanner = () => {
  return (
    <div className='w-full h-full rounded-xl'>
      {
        Banner.map((item)=>(
          <Image key={item?.id} className='w-full h-full object-contain' alt='' src={item?.img} />
        ))
      }
    </div>
  )
}

export default TopBanner