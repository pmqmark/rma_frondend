'use client';
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

function CountrySelector({ selected, onSelect }) {
    return (
        <div className='w-[64%] text-sm max-md:w-full relative'>
            <ReactFlagsSelect
                selected={selected}
                selectButtonClassName="rounded-lg "
                className="rounded-xl border-red-400 outline-none text-xs"
                onSelect={onSelect}
                searchable={true}
            />
        </div>
    );
}

CountrySelector.defaultProps = {
    selected: "",
    onSelect: () => { }
};

export default CountrySelector;
