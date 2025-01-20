'use client'
import Select from 'react-select'


function MembershipDropdown({ options, placeholder }) {
    return (
        <div className='flex max-md:flex-col border-t w-full border-gray-3 00 py-5 justify-between'>
            <div className='w-[35%] max-md:w-full text-sm font-medium'>
                <h2>{placeholder}</h2>
            </div>
            <Select
                className='w-[64%] text-sm max-md:w-full max-md:mt-2 placeholder:text-gray-300 rounded-lg'
                options={options}
                placeholder="Membership applied for"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderRadius: '7px',
                        padding: '0.25rem',
                        borderColor: 'gray',
                        ":focus": {
                            borderColor: 'black',
                            outlineColor: 'black'
                        },
                        ":active": {
                            borderColor: 'black',
                            outlineColor: 'black'
                        }
                    }),
                }}
            />
        </div>
    )
}

export default MembershipDropdown
