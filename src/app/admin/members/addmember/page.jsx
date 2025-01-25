"use client"
import NormalTextField from '@/components/Common/NormalTextField'
import FileUploadField from '@/components/Common/FileUploadField'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Addmember, baseUrl, register, uploadGustImageUrl } from '@/utils/Endpoint';
import CountrySelector from '@/components/User/membership/CountrySelector';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { UploadImage } from '@/utils/UploadImage';
import { useRouter, useSearchParams } from 'next/navigation';
import MembershipDropdown from '../../../../components/User/membership/MembershipDropdown';

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
        meetAuthRep: '',
    },
    logo: null,
    hasRenewal: false,
    payMode: '',
    idProof: null
};

function Page() {
    const [userdata, setuserdata] = useState(initialUserdata);
    const [imageData, setImage] = useState();
    const [logo, setLogo] = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const searchParams = useSearchParams();
    const memberId = searchParams.get('memberId');

    useEffect(() => {
        if (memberId) {
            console.log(memberId)
            setIsEditMode(true);
            const fetchMemberDetails = async () => {
                try {
                    const res = await axiosPrivate.get(`${Addmember}/${memberId}`);
                    setuserdata(res?.data.member);
                    console.log(res?.data)
                    setLogo(userdata.logo?.location);
                    setImage(userdata.idProof?.location);
                } catch (error) {
                    console.error('Error fetching member details:', error);
                    toast.error('Failed to load member details.');
                }
            };
            fetchMemberDetails();
        }
    }, [memberId, axiosPrivate]);

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
            if (userdata?.idProof) {
                try {
                    const res = await UploadImage(userdata?.idProof, uploadGustImageUrl, axiosPrivate);
                    setImage(res?.data?.file);
                    toast.success("idProof upload successfully.")
                } catch (error) {
                    console.error('Failed to upload thumbnail:', error);
                }
            }
        };

        uploadThumbnail();
    }, [userdata?.idProof, axiosPrivate]);

    useEffect(() => {
        const uploadLogo = async () => {
            if (userdata.logo) {
                try {
                    const res = await UploadImage(userdata.logo, uploadGustImageUrl, axiosPrivate);
                    setLogo(res.data.file);
                } catch (error) {
                    console.error('Error uploading logo:', error);
                }
            }
        };

        uploadLogo();
    }, [userdata?.logo, axiosPrivate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = isEditMode ? `${Addmember}/${memberId}` : Addmember;
        const method = isEditMode ? 'put' : 'post';

        const submitUserData = {
            ...userdata,
            logo,
            idProof: imageData,
        };

        try {
            const response = await axiosPrivate[method](endpoint, submitUserData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success(`Member ${isEditMode ? 'updated' : 'added'} successfully.`);
            router.push('/admin/members');
        } catch (error) {
            console.error('Error submitting member data:', error);
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} member.`);
        }
    };
    return (
        <div className='flex flex-col w-full px-10 pt-12 max-md:pt-20 mb-28'>
            <h1 className="font-semibold text-title pb-10">
            {isEditMode ? 'Edit Member' : 'Add Member'}
            </h1>
            <form onSubmit={handleSubmit}>

            
            {/* <NormalTextField editable value={userdata.username} onChange={(e) =>handleChange("username",e.target.value)} label="Username" placeholder="Username" key='usename' />
            <NormalTextField editable value={userdata.password}onChange={(e) => handleChange('password', e.target.value)} label="Password" placeholder="Password" type='password' key="password" /> */}
            <NormalTextField editable 
             value={userdata.applicantName}
             onChange={(e) => handleChange('applicantName', e.target.value)}
                                    label="Name of the Applicant" placeholder="Name of the Applicant" key="name" />
            <NormalTextField editable 
             value={userdata.address}
             onChange={(e) => handleChange('address', e.target.value)} label="Address" placeholder="Address" type="textarea" key="address" />
            <NormalTextField editable 
             value={userdata.state}
             onChange={(e) => handleChange('state', e.target.value)}
              label="State/Province" placeholder="State" key="state" />
              <div className='flex max-md:flex-col border-t w-full border-gray-300 py-5 justify-between'>
                            <div className='w-[35%] max-md:w-full font-medium text-sm' >
                                <h2>Country</h2>
                            </div>
                            <CountrySelector
                                selected={userdata.country}
                                onSelect={(code) => handleChange('country', code)}
                            />
                        </div>
            <NormalTextField editable 
              value={userdata.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
             label="Telephone" placeholder="Telephone" key="Telephone" type="tel" />
            <NormalTextField editable 
             value={userdata.fax}
             onChange={(e) => handleChange('fax', e.target.value)}  label="Fax" placeholder="Fax" key="fax" />
            <NormalTextField editable 
            value={userdata.email}
            onChange={(e) => handleChange('email', e.target.value)} label="Email" placeholder="Email" key="email" type="email" />
            <NormalTextField editable 
              value={userdata.website}
              onChange={(e) => handleChange('website', e.target.value)} label="Website" placeholder="Website" key="Website" type="url" />
            <NormalTextField editable 
             value={userdata.contactPerson}
             onChange={(e) => handleChange('contactPerson', e.target.value)} label="Contact Person" placeholder="Contact Person" key="person" />
            <NormalTextField editable 
             value={userdata?.business?.nature}
             onChange={(e) => handleChange('business.nature', e.target.value)} label="Nature of business/product line" placeholder="Nature of business" key="Nature of business" />
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
                            value={userdata.business?.name}
                            onChange={(e) => handleChange('business.name', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Address of the business/entity"
                            placeholder="Address here"
                            type="textarea"
                            value={userdata.business?.address}
                            onChange={(e) => handleChange('business.address', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Registration number business/entity"
                            placeholder="Registration number business/entity"
                            value={userdata.business?.regNum}
                            onChange={(e) => handleChange('business.regNum', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Registration date of business/entity"
                            type="date"
                            value={userdata.business?.regDate}
                            onChange={(e) => handleChange('business.regDate', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Date of commencement of business/entity"
                            type="date"
                            value={userdata.business?.commenceDate}
                            onChange={(e) => handleChange('business.commenceDate', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Name of the authorized person representing business/entity"
                            placeholder="Name"
                            value={userdata.business?.authRep}
                            onChange={(e) => handleChange('business.authRep', e.target.value)}
                        />
                        <NormalTextField
                            editable
                            label="Name of person authorized to attend meetings"
                            placeholder="Position"
                            value={userdata.business?.meetAuthRep}
                            onChange={(e) => handleChange('business.meetAuthRep', e.target.value)}
                        />
         
            {/* <div className='flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-full font-medium'>
                    <h2>Attach Company Logo</h2>
                </div>
                <div className="w-6/12 max-md:w-full">
                    <FileUploadField 
                      sizeLimit={1024 * 1024 * 5}
                      typeNames={['JPEG', 'PNG', 'GIF', 'PDF']}
                      fileTypes={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
                      value={userdata.logo}
                      onChange={(file) => handleChange('logo', file)}
                      url={uploadGustImageUrl}
                     />
                </div>
            </div> */}
            <div className='flex max-md:flex-col justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-full font-medium'>
                    <h2>Attach Identity Proof File</h2>
                </div>
                <div className="w-6/12 max-md:w-full">
                <FileUploadField
                        sizeLimit={1024 * 1024 * 5}
                        typeNames={['JPEG', 'PNG', 'GIF', 'PDF']}
                        fileTypes={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
                        value={userdata.idProof}
                        onChange={(file) => handleChange('idProof', file)}
                        url={uploadGustImageUrl}
                    />
                </div>
            </div>
            <div className='flex justify-between border-t w-10/12 max-md:w-full border-gray-3 py-5'>
                <div className='w-[35%] max-md:w-fit font-medium'>
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
                <div>

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
            {isEditMode ? 'Update Member' : 'Add Member'}
                </button>
            </div>
            </form>
        </div>
    )
}

export default Page

