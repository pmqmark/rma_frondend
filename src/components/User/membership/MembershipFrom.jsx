'use client';
import NormalTextField from '@/components/Common/NormalTextField';
import FileUploadField from '@/components/Common/FileUploadField';
import CountrySelector from './CountrySelector';
import MembershipDropdown from './MembershipDropdown';
import { useEffect, useState } from 'react';
import { baseUrl, register, uploadGustImageUrl } from '@/utils/Endpoint';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { UploadImage } from '@/utils/UploadImage';

const options = [
    { value: '1', label: 'option 1' },
    { value: '2', label: 'option 2' },
    { value: '3', label: 'option 3' }
];
const initialUserdata = {
    username: '',
    password: '',
    applicantName: '',
    address: '',
    state: '',
    country: '',
    phone: '',
    fax: '',
    email: '',
    website: '',
    contactPerson: '',
    membershipType: '',
    business: {
        nature: '',
        name: '',
        address: '',
        regNum: '',
        regDate: '',
        commenceDate: '',
        authRep: '',
        altAuthRep: '',
        meetAuthRep: ''
    },
    hasRenewal: false,
    payMode: '',
    file: null
};

function MembershipForm() {
    const [userdata, setuserdata] = useState(initialUserdata);
    const [imageData, setImage] = useState()
    const axiosPrivate = useAxiosPrivate()

    const handleChange = (field, value) => {

        const updatedUserdata = { ...userdata };

        if (field.includes('.')) {
            const fields = field.split('.');
            let nestedField = updatedUserdata;

            for (let i = 0; i < fields.length - 1; i++) {
                nestedField = nestedField[fields[i]];
            }

            nestedField[fields[fields.length - 1]] = value;
        } else {
            updatedUserdata[field] = value;
        }

        setuserdata(updatedUserdata);
    };

    useEffect(() => {
        const uploadThumbnail = async () => {
            if (userdata?.file) {
                try {
                    const res = await UploadImage(userdata?.file, uploadGustImageUrl, axiosPrivate);
                    setImage(res?.data?.file);
                } catch (error) {
                    console.error("Failed to upload thumbnail:", error);
                }
            }
        };

        uploadThumbnail();
    }, [userdata?.file])

    const findEmptyField = (data) => {
        const fieldsToCheck = [
            { field: 'username', label: 'Username' },
            { field: 'password', label: 'Password' },
            { field: 'applicantName', label: 'Name of the Applicant' },
            { field: 'address', label: 'Address' },
            { field: 'state', label: 'State/Province' },
            { field: 'country', label: 'Country' },
            { field: 'phone', label: 'Telephone' },
            { field: 'fax', label: 'Fax' },
            { field: 'email', label: 'Email' },
            { field: 'website', label: 'Website' },
            { field: 'contactPerson', label: 'Contact Person' },
            { field: 'membershipType', label: 'Membership Type' },
            { field: 'business.nature', label: 'Nature of Business/Product Line' },
            { field: 'business.name', label: 'Name of Business/Entity' },
            { field: 'business.address', label: 'Address of Business/Entity' },
            { field: 'business.regNum', label: 'Registration Number' },
            { field: 'business.regDate', label: 'Registration Date' },
            { field: 'business.commenceDate', label: 'Date of Commencement' },
            { field: 'business.authRep', label: 'Authorized Person' },
            { field: 'business.meetAuthRep', label: 'Person Authorized to Attend Meetings' },
            { field: 'payMode', label: 'Payment Mode' },
        ];

        for (let { field, label } of fieldsToCheck) {
            const value = field.split('.').reduce((o, i) => o[i], data);
            if (!value) return label;
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

        const formElement = event.target;

        if (!(formElement instanceof HTMLFormElement)) {
            console.error('Expected an HTMLFormElement but got:', formElement);
            return;
        }

        const submitUserData = {
            username: userdata?.username,
            password: userdata?.password,
            applicantName: userdata?.applicantName,
            address: userdata?.address,
            state: userdata?.state,
            country: userdata?.country,
            phone: userdata?.phone,
            fax: userdata?.fax,
            email: userdata?.email,
            website: userdata?.website,
            contactPerson: userdata?.contactPerson,
            membershipType: userdata?.membershipType,
            business: {
                nature: userdata?.business?.nature,
                name: userdata?.business?.name,
                address: userdata?.business?.address,
                regNum: userdata?.business?.regNum,
                regDate: userdata?.business?.regDate,
                commenceDate: userdata?.business?.commenceDate,
                authRep: userdata?.business?.authRep,
                altAuthRep: userdata?.business?.altAuthRep,
                meetAuthRep: userdata?.business?.meetAuthRep
            },
            hasRenewal: userdata?.hasRenewal,
            payMode: userdata?.payMode,
            idProof: imageData
        };

        console.log(submitUserData)

        try {
            const response = await fetch(`${baseUrl}${register}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitUserData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            console.log(result);
            setuserdata(initialUserdata);
            toast.success("Form submitted successfully.");

        } catch (error) {
            toast.error("Failed to submit the form. Please try again.");
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <form data-aos='fade-up' data-aos-duration='700' onSubmit={handleSubmit} className='flex flex-col w-full px-10 max-md:p-4 border-separate text-sm rounded-xl border mr-10 max-md:mr-0 pb-10'>
            <NormalTextField
                editable
                label="Username"
                placeholder="Username"
                top
                value={userdata.username}
                onChange={(e) => handleChange('username', e.target.value)}
            />
            <NormalTextField
                editable
                label="Password"
                placeholder="Password"
                type='password'
                value={userdata.password}
                onChange={(e) => handleChange('password', e.target.value)}
            />
            <NormalTextField
                editable
                label="Name of the Applicant"
                placeholder="Name of the Applicant"
                value={userdata.applicantName}
                onChange={(e) => handleChange('applicantName', e.target.value)}
            />
            <NormalTextField
                editable
                label="Address"
                placeholder="Address"
                type="textarea"
                value={userdata.address}
                onChange={(e) => handleChange('address', e.target.value)}
            />
            <NormalTextField
                editable
                label="State/Province"
                placeholder="State"
                value={userdata.state}
                onChange={(e) => handleChange('state', e.target.value)}
            />
            <div className='flex max-md:flex-col border-t w-full border-gray-300 py-5 justify-between'>
                <div className='w-[35%] max-md:w-full font-medium text-sm' >
                    <h2>Country</h2>
                </div>
                <CountrySelector
                    selected={userdata.country}
                    onSelect={(code) => handleChange('country', code)}
                />
            </div>
            <NormalTextField
                editable
                label="Telephone"
                placeholder="Telephone"
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
                placeholder="Email"
                type="email"
                value={userdata.email}
                onChange={(e) => handleChange('email', e.target.value)}
            />
            <NormalTextField
                editable
                label="Website"
                placeholder="Website"
                type="url"
                value={userdata.website}
                onChange={(e) => handleChange('website', e.target.value)}
            />
            <NormalTextField
                editable
                label="Contact Person"
                placeholder="Contact Person"
                value={userdata.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
            />
            <NormalTextField
                editable
                label="Nature of business/product line"
                placeholder="Nature of business"
                value={userdata.business.nature}
                onChange={(e) => handleChange('business.nature', e.target.value)}
            />
            <MembershipDropdown
                options={options}
                placeholder="Membership applied for"
                value={userdata.membershipType}
                onChange={(value) => handleChange('membershipType', value)}
            />
            <NormalTextField
                editable
                label="Name of the business/entity associated with"
                placeholder="Business"
                value={userdata.business.name}
                onChange={(e) => handleChange('business.name', e.target.value)}
            />
            <NormalTextField
                editable
                label="Address of the business/entity"
                placeholder="Address here"
                type="textarea"
                value={userdata.business.address}
                onChange={(e) => handleChange('business.address', e.target.value)}
            />
            <NormalTextField
                editable
                label="Registration number business/entity"
                placeholder="Registration number business/entity"
                value={userdata.business.regNum}
                onChange={(e) => handleChange('business.regNum', e.target.value)}
            />
            <NormalTextField
                editable
                label="Registration date of business/entity"
                type="date"
                value={userdata.business.regDate}
                onChange={(e) => handleChange('business.regDate', e.target.value)}
            />
            <NormalTextField
                editable
                label="Date of commencement of business/entity"
                type="date"
                value={userdata.business.commenceDate}
                onChange={(e) => handleChange('business.commenceDate', e.target.value)}
            />
            <NormalTextField
                editable
                label="Name of the authorized person representing business/entity"
                placeholder="Name"
                value={userdata.business.authRep}
                onChange={(e) => handleChange('business.authRep', e.target.value)}
            />
            <NormalTextField
                editable
                label="Name of person authorized to attend meetings"
                placeholder="Position"
                value={userdata.business.meetAuthRep}
                onChange={(e) => handleChange('business.meetAuthRep', e.target.value)}
            />
            <div className='flex max-md:flex-col justify-between border-t w-full border-gray-300 py-5'>
                <div className='w-[35%] max-md:w-full font-medium text-sm'>
                    <h2>Attach Identity Proof File</h2>
                </div>
                <div className='w-[64%] max-md:w-full'>
                    <FileUploadField
                        sizeLimit={1024 * 1024 * 5}
                        typeNames={['JPEG', 'PNG', 'GIF', 'PDF']}
                        fileTypes={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
                        value={userdata.file}
                        onChange={(file) => handleChange('file', file)}
                        url={uploadGustImageUrl}
                    />
                </div>
            </div>
            <div className='flex justify-between border-t w-full border-gray-300 py-5'>
                <div className='w-[35%] max-md:w-fit font-medium text-sm'>
                    <h2>Including Renewal Payment</h2>
                </div>
                <div className='w-[64%] max-md:w-fit'>
                    <input
                        type="checkbox"
                        className="scale-150 accent-[#266941]"
                        checked={userdata.hasRenewal}
                        onChange={(e) => handleChange('hasRenewal', e.target.checked)}
                    />
                </div>
            </div>
            <MembershipDropdown
                options={options}
                placeholder="Payment Mode"
                value={userdata.payMode}
                onChange={(value) => handleChange('payMode', value)}
            />
            <div>
                <button className="bg-[#266941] text-white px-5 p-3 text-xs  rounded-lg mt-5" type='submit'>
                    Register as a Member
                </button>
            </div>
        </form>
    );
}

export default MembershipForm;
