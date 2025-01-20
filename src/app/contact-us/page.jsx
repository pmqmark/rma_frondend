import React from 'react'
import Contact from '@/components/User/home/about/Contact'
import UserNav from "@/components/User/UserNav";
import UserFooter from "@/components/User/footer/UserFooter";

const page = () => {
  return (
    <>
      <div className="w-full bg-white">
        <UserNav />
      </div>
    <div className='my-14'>
        <Contact/>
    </div>

    
    <div>
        <UserFooter />
      </div>
    </>
  )
}

export default page