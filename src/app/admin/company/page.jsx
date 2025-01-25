
import CompanyTable from '@/components/Admin/company/CompanyTable'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 mb-20 text-black'>
    <h1 className="font-semibold text-title">
        Manage Companies
    </h1>
    <div className='w-full border border-gray-400 rounded-xl overflow-clip mt-5'>
        <div className='flex p-5 items-center justify-between'>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl">
                   Company list
                </h2>
                <div className="max-sm:hidden">
            </div>
        </div>
    <Link href="/admin/company/addcompany">
      <button className="bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg">
        Add Company
      </button>
    </Link>
  </div>
        <div className='w-full max-md:overflow-x-scroll'>
            <CompanyTable/>
        </div>
    </div>
</div>
  )
}

export default Page
