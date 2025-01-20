import ApplicationTable from '@/components/Admin/Application/ApplicationTable';

function Page() {

    return (
        <div className='flex flex-col bg-white min-h-screen w-full px-10 max-md:px-6 pt-12 max-md:pt-16 mb-20 text-black'>
            <h1 className="font-semibold text-title">
                Manage applications
            </h1>
            <div className='w-full border border-gray-400 rounded-xl overflow-clip mt-5'>
                <ApplicationTable />
            </div>

        </div>
    );
}

export default Page;
