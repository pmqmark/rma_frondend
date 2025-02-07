'use client';
import NormalTextField from '@/components/Common/NormalTextField';
import FileUploadField from '@/components/Common/FileUploadField';
import MembershipDropdown from './MembershipDropdown';
import { useEffect, useState } from 'react';
import { baseUrl, register, uploadGustImageUrl } from '@/utils/Endpoint';
import { toast } from 'react-toastify';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { UploadImage } from '@/utils/UploadImage';

const yesNoOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
];

const initialUserdata = {
    name: '',
    idNumber: '',
    telephone: '',
    whatsapp: '',
    email: '',
    spouseName: '',
    photo: null,
    livesInOman: false,
    hasPaidMembership: false,
    job: ''
};

function MembershipForm() {
    const [userdata, setUserdata] = useState(initialUserdata);
    const [imageData, setImage] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (field, value) => {
        setUserdata(prev => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        const uploadPhoto = async () => {
            if (userdata.photo instanceof File) {
                try {
                    const res = await UploadImage(userdata.photo, uploadGustImageUrl, axiosPrivate);
                    setImage(res?.data?.file);
                } catch (error) {
                    console.error("Failed to upload photo:", error);
                    toast.error("Failed to upload photo");
                }
            }
        };
        uploadPhoto();
    }, [userdata.photo, axiosPrivate]);

    const findEmptyField = (data) => {
        const requiredFields = [
            { field: 'name', label: 'Name' },
            { field: 'idNumber', label: 'ID Number' },
            { field: 'telephone', label: 'Telephone Number' },
            { field: 'email', label: 'Email' },
            { field: 'livesInOman', label: 'Lives in Oman' },
            { field: 'hasPaidMembership', label: 'Membership Payment Status' }
        ];

        for (let { field, label } of requiredFields) {
            if (!data[field] && data[field] !== false) return label;
        }
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emptyField = findEmptyField(userdata);
        if (emptyField) {
            toast.error(`Please fill in the ${emptyField} field.`);
            return;
        }

        if (!imageData) {
            toast.error('Please upload a photo');
            return;
        }

        const submitData = {
            ...userdata,
            photo: imageData,
            // Convert boolean values to strings if backend requires
            livesInOman: userdata.livesInOman ? 'Yes' : 'No',
            hasPaidMembership: userdata.hasPaidMembership ? 'Yes' : 'No'
        };

        try {
            const response = await axiosPrivate.post(`${baseUrl.replace(/\/$/, '')}${register}`, submitData);

            
            if (response.status === 200) {
                toast.success("Registration successful!");
                setUserdata(initialUserdata);
                setImage(null);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col w-full px-10 max-md:p-4 border-separate text-sm rounded-xl border mr-10 max-md:mr-0 pb-10'>
            <NormalTextField
                editable
                label="Full Name"
                placeholder="Enter your full name"
                value={userdata.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
            />

            <NormalTextField
                editable
                label="ID Number"
                placeholder="Enter ID number"
                value={userdata.idNumber}
                onChange={(e) => handleChange('idNumber', e.target.value)}
                required
            />

            <NormalTextField
                editable
                label="Telephone Number"
                placeholder="Enter telephone number"
                type="tel"
                value={userdata.telephone}
                onChange={(e) => handleChange('telephone', e.target.value)}
                required
            />

            <NormalTextField
                editable
                label="WhatsApp Number"
                placeholder="Enter WhatsApp number"
                type="tel"
                value={userdata.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
            />
            <NormalTextField
                editable
                label="Fax"
                placeholder="Fax"
                value={userdata.fax}
                onChange={(e) => handleChange('fax', e.target.value)}
            />

            <NormalTextField
                editable
                label="Email"
                placeholder="Enter email address"
                type="email"
                value={userdata.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
            />

            <NormalTextField
                editable
                label="Spouse Name"
                placeholder="Enter spouse's name"
                value={userdata.spouseName}
                onChange={(e) => handleChange('spouseName', e.target.value)}
            />

            <div className='flex max-md:flex-col justify-between border-t w-full border-gray-300 py-5'>
                <div className='w-[35%] max-md:w-full font-medium text-sm'>
                    <h2>Member Photo</h2>
                </div>
                <div className='w-[64%] max-md:w-full'>
                    <FileUploadField
                        sizeLimit={1024 * 1024 * 5}
                        typeNames={['JPEG', 'PNG']}
                        fileTypes={['image/jpeg', 'image/png']}
                        value={userdata.photo}
                        onChange={(file) => handleChange('photo', file)}
                        url={uploadGustImageUrl}
                        required
                    />
                </div>
            </div>

            <MembershipDropdown
                options={yesNoOptions}
                placeholder="Does the family live in Oman?"
                value={userdata.livesInOman}
                onChange={(value) => handleChange('livesInOman', value)}
                required
            />

            <MembershipDropdown
                options={yesNoOptions}
                placeholder="Have you paid the membership fee?"
                value={userdata.hasPaidMembership}
                onChange={(value) => handleChange('hasPaidMembership', value)}
                required
            />

            <NormalTextField
                editable
                label="Occupation"
                placeholder="Enter your job title"
                value={userdata.job}
                onChange={(e) => handleChange('job', e.target.value)}
            />

            <div className='mt-8'>
                <button 
                    type="submit"
                    className="bg-[#266941] text-white px-8 py-3 rounded-lg hover:bg-[#1e5034] transition-colors"
                >
                    Submit Registration
                </button>
            </div>
        </form>
    );
}

export default MembershipForm;