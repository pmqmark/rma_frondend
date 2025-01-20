'use client';
import { useRouter } from 'next/navigation'
function CancelButton() {
    const router = useRouter();
    const handleCancel = () => {
        router.back();
    };
    return (
        <button onClick={handleCancel} className="border border-gray-500 px-5 h-fit py-3 text-base font-semibold rounded-lg">
            Cancel
        </button>
    )
}

export default CancelButton
