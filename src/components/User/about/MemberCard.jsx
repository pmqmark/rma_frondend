import React from 'react'

function MemberCard({ name, designation, image }) {
    return (

        <div className="flex flex-col items-start">
            <img src={image} alt="member" className="w-full aspect-square object-cover rounded-lg" />
            <div className="font-semibold mt-2">{name}</div>
            <div className="text-gray-600 text-sm">{designation}</div>
        </div>

    )
}

export default MemberCard
