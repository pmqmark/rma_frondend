import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function SaveAlert({ onConfirm, onCancel, title, content }) {
    return (
        <div className='fixed top-0 z-50 left-0 w-screen h-screen bg-[#00000088]'>
            <div className='absolute rounded-xl flex flex-col items-start gap-3 m-auto top-0 left-0 right-0 bottom-0 w-fit h-fit p-10 max-sm:p-5 bg-white'>
                <div className="rounded-full p-2 bg-[#EDFCF3] w-fit">
                    <div className="rounded-full p-[6px] bg-[#D1FADF]">
                        <IoMdCheckmarkCircleOutline size={25} color="##039855" />
                    </div>
                </div>
                <h2 className="text-sub-title font-semibold">{title}</h2>
                <p className="text-start max-sm:text-sm">
                    {content}
                </p>
                <div className="flex w-full gap-4 mt-2 justify-between">
                    <button className="w-full rounded-lg py-2 border border-gray-400" onClick={onCancel}>Cancel</button>
                    <button className="w-full rounded-lg py-2 bg-[#266941] text-white" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default SaveAlert
