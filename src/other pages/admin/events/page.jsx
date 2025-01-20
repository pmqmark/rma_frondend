
import Calendar from '@/components/Admin/Events/Calendar'
import Link from 'next/link'
function Page() {
    return (
        <div className='flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 mb-20 text-black'>
            <div className='flex justify-between'>
                <h1 className="font-semibold text-title">
                    Events
                </h1>
                <div className='sm:hidden'>
                    <Link href="/admin/events/addevent">
                        <button className="bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg">
                            Add event
                        </button>
                    </Link>
                </div>
            </div>

            <div className='w-full overflow-clip mt-5'>
                <div className='flex py-5 max-md:pt-0 items-center justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl">
                            Current Events
                        </h2>
                        <h5 className="pt-1">
                            Events are managed here
                        </h5>
                    </div>
                    <div className='max-sm:hidden'>
                        <Link href="/admin/events/add">
                            <button className="bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg">
                                Add event
                            </button>
                        </Link>
                    </div>
                </div>
                <Calendar />
            </div>
        </div>
    )
}

export default Page
