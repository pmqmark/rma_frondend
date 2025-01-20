
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { baseUrl } from "@/utils/Endpoint";

function PublicationNewsletterCard({ title, date, location }) {

    return (
        <div className='border border-gray-300 p-3 rounded-md relative'>
            <div className="flex mb-3 gap-1">
                <IoDocumentTextOutline size={22} className="text-primaryColor" />
                <h1 className='text-base font-medium ml-2'>{title}</h1>
            </div>
            <p className="font-medium">2024-04-12</p>
            <a target="blank" href={`${baseUrl}${location}`}>
                <GoArrowUpRight size={20} className="absolute bottom-4 right-3 cursor-pointer" />
            </a>
        </div>
    )
}

export default PublicationNewsletterCard
