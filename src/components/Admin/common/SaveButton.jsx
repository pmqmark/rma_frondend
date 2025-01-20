'use client';

import React, { useState } from 'react';
import SaveAlert from './SaveAlert';

function SaveButton({ title, content , submitHandler}) {
    const [showAlert, setShowAlert] = useState(false);
    const handleConfirm = () => {
        console.log(title + " Saved");
        setShowAlert(false);
        submitHandler()
    };

    const handleCancel = () => {
        console.log(title + " canceled");
        setShowAlert(false);
    };

    return (
        <>
            <button className='bg-primary-green px-5 h-fit py-3 ml-4 text-white text-base font-semibold rounded-lg' onClick={() => setShowAlert(true)}>
                Save
            </button>
            {showAlert && <SaveAlert title={title} content={content} onConfirm={handleConfirm} onCancel={handleCancel} />}
        </>
    );
}

export default SaveButton;