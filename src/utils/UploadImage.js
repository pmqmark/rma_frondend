
export const UploadImage = async (data, url, axiosPrivate) => {
    
    const formData = new FormData();
    formData.append("file", data);
    
    return await axiosPrivate.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};