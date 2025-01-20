import NormalTextField from '@/components/Common/NormalTextField'
import FileUploadField from '@/components/Common/FileUploadField'
import React from 'react'

function Page() {
    return (
        <div className='flex flex-col w-full px-10 pt-12 max-md:pt-20 mb-28'>
            <h1 className="font-semibold text-title pb-10">
                Manage Members
            </h1>
            <NormalTextField label="Username" placeholder="Username" key='usename' />
            <NormalTextField label="Password" placeholder="Password" type='password' key="password" />
            <NormalTextField label="Name of the Applicant" placeholder="Name of the Applicant" key="name" />
            <NormalTextField label="Address" placeholder="Address" type="textarea" key="address" />
            <NormalTextField label="State/Province" placeholder="State" key="state" />
            <div className='flex max-md:flex-col border-t w-10/12 max-md:w-full border-gray-3 00 py-5 justify-between'>
                <div className='w-[35%] max-md:w-full font-medium'>
                    <h2>Country</h2>
                </div>
                <div className='w-[64%] max-md:w-full relative'>
                    <div className='absolute size-6 left-2 rounded-full overflow-clip bg-black top-0 bottom-0 my-auto'>
                        <img src="data:image/png;base64,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" alt="" />
                    </div>
                    <input
                        type="text"
                        className="w-full border border-gray-400 mt-1 pr-4 pl-10 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
                        placeholder="Coutnrty"
                    />
                </div>
            </div>
            <NormalTextField label="Telephone" placeholder="Telephone" key="Telephone" type="tel" />
            <NormalTextField label="Fax" placeholder="Fax" key="fax" />
            <NormalTextField label="Email" placeholder="Email" key="email" type="email" />
            <NormalTextField label="Website" placeholder="Website" key="Website" type="url" />
            <NormalTextField label="Contact Person" placeholder="Contact Person" key="person" />
            <NormalTextField label="Telephone" placeholder="Telephone" key="Telephone" type="tel" />
            <NormalTextField label="Nature of business/product line" placeholder="Nature of business" key="Nature of business" />
            <NormalTextField label="Membership applied for" placeholder="Membership applied for" key='membership' />
            <NormalTextField label="Name of the business/entity associated with" placeholder="business" key="business" />
            <NormalTextField label="Address of the business/entity" placeholder="Address here" type="textarea" key="Address of the business" />
            <NormalTextField label="Registration number business/entity" placeholder="Registration number business/entity" key="regno" />
            <NormalTextField label="Registration date of business/entity" key="regdate" type="date" />
            <NormalTextField label="Date of commencement of business/entity" key="comdate" type="date" />
            <NormalTextField label="Name of the authorized person representing business/entity" placeholder="Name" key="business person name" />
            <NormalTextField label="Name of person authorized to attend meetings" placeholder="Position" key="position" />
            <div className='flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-full font-medium'>
                    <h2>Attach Identity Proof File</h2>
                </div>
                <div className='w-[64%] max-md:w-full'>
                    <img className='max-h-20 cursor-pointer' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhwvC08CQaL9SRB8A0NBnCXRKNz6dS-cQLg&s" alt="" />
                </div>
            </div>
            <div className='flex justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-fit font-medium'>
                    <h2>Including Renewal Payment</h2>
                </div>
                <div className='w-[64%] max-md:w-fit'>
                    <input type="checkbox" className="scale-150 accent-[#266941]" />
                </div>
                <div>

                </div>
            </div>
            <NormalTextField label="Mode of Payment" placeholder="Mode of Payment" key="payment" />
            <div>
                <button className="border border-[#DB3636] text-[#DB3636] bg-[#F9DFDF] font-semibold px-5 py-2 rounded-lg mt-5">
                    Reject
                </button>
                <button className="bg-[#266941] text-white px-5 py-2 font-semibold rounded-lg mt-5 ml-5">
                    Approve
                </button>
            </div>
        </div>
    )
}

export default Page

