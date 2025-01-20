"use client"

function NormalTextField({ type, label, placeholder, editable = false, top = false, value, onChange }) {
    return (
        <div className={`flex max-md:flex-col  ${editable ? 'w-full' : 'w-10/12'} max-md:w-full ${top ? '' : 'border-t'} border-gray-300 py-5 justify-between`}>
            <div className='w-[35%] max-md:w-full text-sm font-medium text-sm'>
                <h2>{label}</h2>
            </div>
            <div className='w-[64%] max-md:w-full'>
                {type === 'textarea' ? (
                    <textarea
                        className="w-full border text-sm border-gray-400 mt-1 px-4 py-3 rounded-lg placeholder:text-gray-400 placeholder:font-light"
                        placeholder={placeholder}
                        readOnly={!editable}
                        rows="4"
                        value={value}
                        onChange={onChange}
                    />
                ) : (
                    <input
                        type={type}
                        className="w-full border text-xs border-gray-400 mt-1 px-4 py-[.6rem] rounded-lg placeholder:text-gray-400 placeholder:font-light"
                        placeholder={placeholder}
                        readOnly={!editable}
                        value={value}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
}

NormalTextField.defaultProps = {
    type: 'text',
    label: 'Label',
    placeholder: '',
    value: '',
    onChange: () => { }
};

export default NormalTextField;
