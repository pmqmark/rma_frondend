import React from 'react';

function MemberCard({ name, designation, image }) {
    return (
        <div className="flex flex-col items-start">
            <div className="w-full aspect-square overflow-hidden rounded-lg">
                <img 
                    src={image} 
                    alt="member" 
                    className={`w-full h-full object-cover transition-transform duration-300 
                        ${name === "Sujith" ? "object-top translate-y-0" : "object-center"}`}
                />
            </div>
            <div className="font-semibold mt-2">{name}</div>
            <div className="text-gray-600 text-sm">{designation}</div>
        </div>
    );
}

export default MemberCard;
