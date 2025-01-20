import LoaderData from '@/components/Common/Loader'
import React from 'react'

const Loader = () => {
    return (
        <div className='bg-white items-center justify-center flex h-screen w-screen fixed z-50'>
            <LoaderData />
        </div>
    )
}

export default Loader