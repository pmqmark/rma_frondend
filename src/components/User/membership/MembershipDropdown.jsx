import Select from 'react-select';

function MembershipDropdown({ options, placeholder, value, onChange }) {
    return (
        <div className='flex max-md:flex-col border-t w-full border-gray-300 py-5 justify-between'>
            <div className='w-[35%] max-md:w-full text-sm font-medium'>
                <h2>{placeholder}</h2>
            </div>
            <Select
                className='w-[64%] max-md:w-full text-sm max-md:mt-2 placeholder:text-gray-300 rounded-lg'
                options={options}
                placeholder={placeholder}
                value={value}  // Ensure value is properly passed and defined
                onChange={onChange}  // Ensure onChange is a function and properly invoked
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
    );
}

export default MembershipDropdown;
