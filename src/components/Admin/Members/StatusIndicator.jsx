function StatusIndicator({ status }) {
    let containerClass = "flex items-center gap-2 px-2 py-1 rounded-full w-fit max-md:mr-6 capitalize";
    let dotClass = "size-2 rounded-full";
    let textClass = "text-sm font-medium";

    switch (status) {
        case "pending":
            containerClass += " bg-[#ECFDF3]";
            dotClass += " bg-[#BCBCBC]";
            textClass += " text-[#626262]";
            break;
        case "approved":
            containerClass += " bg-[#ECFDF3]";
            dotClass += " bg-[#12B76A]";
            textClass += " text-[#027A48]";
            break;
        case "rejected":
            containerClass += " bg-[#FDECEC]";
            dotClass += " bg-[#B71212]";
            textClass += " text-[#7A0202]";
            break;
        case "active":
            containerClass += " bg-[#ECFDF3]";
            dotClass += " bg-[#12B76A]";
            textClass += " text-[#027A48]";
            break;
        case "inactive":
            containerClass += " bg-[#FDECEC]";
            dotClass += " bg-[#B71212]";
            textClass += " text-[#7A0202]";
            break;
        default:
            // Default case to handle unknown statuses
            containerClass += " bg-[#ecfef5]";
            dotClass += " bg-gray-500";
            textClass += " text-gray-500";
    }

    return (
        <div className={containerClass}>
            <div className={dotClass}></div>
            <h5 className={textClass}>
                {status}
            </h5>
        </div>
    );
}

export default StatusIndicator;