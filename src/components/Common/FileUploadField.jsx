'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { CiCircleRemove } from "react-icons/ci";
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { UploadImage } from '@/utils/UploadImage';

const FileUploadField = ({
    fileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif'],
    sizeLimit = 20 * 1024 * 1024,
    typeNames = ['PDF', 'DOC', 'DOCX', 'JPEG', 'PNG'],
    value,
    onChange,
    url
}) => {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(
        value instanceof File ? URL.createObjectURL(value) : null
      );
      
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (value instanceof File) {
          const objectUrl = URL.createObjectURL(value);
          setPreview(objectUrl);
      
          return () => URL.revokeObjectURL(objectUrl); // Cleanup URL
        } else {
          setPreview(null);
        }
      }, [value]);
      
    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        handleFile(selectedFile);
    };

    const handleFile = async (file) => {

        if (file) {
            if (!fileTypes.includes(file.type)) {
                alert('Invalid file type. Please upload a valid document or image.');
                return;
            }

            if (file.size > sizeLimit) {
                alert(`File size exceeds ${sizeLimit / (1024 * 1024)}MB limit. Please choose a smaller file.`);
                return;
            }

            if (onChange) onChange(file);
            // const ImageData = await UploadImage(file, url, axiosPrivate);
            // console.log(ImageData?.data)
            setPreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
        } else {
            if (onChange) onChange(null);
            setPreview(null);
        }
    };

    const handleRemoveFile = () => {
        if (onChange) onChange(null);
        setPreview(null);
    };

    const inputRef = useRef()

    const handleUploadClick = () => {
        inputRef?.current?.click()
    };

    return (
        <div
            className={`flex flex-col items-center justify-center w-full p-0 border-2 border-gray-300 rounded-lg cursor-pointer 
            ${dragging ? 'border-blue-500' : ''}
          `}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {value ? (
                    <>
                        {preview ? (
                            <img src={preview} alt="Preview" className="max-w-full h-auto mb-2" />
                        ) : (
                            <p>{value.name}</p>
                        )}
                        <button
                            className="mt-2 text-xs text-black-500 hover:text-black-600 focus:outline-none"
                            onClick={handleRemoveFile}
                        >
                            <CiCircleRemove size={23} className="inline-block mr-1" />
                        </button>
                    </>
                ) : (
                    <>
                        <div className='p-[8px] bg-[#f9f9f9] rounded-full mb-3'>
                            <div className='p-[10px] rounded-full bg-[#f2f5f6]'>
                                <FiUploadCloud size={24} strokeWidth={1} className="text-black" />
                            </div>
                        </div>
                        <p className="mb-2 text-sm text-gray-800 font-light">
                            <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Files ({typeNames.join(', ')}, max {sizeLimit / (1024 * 1024)}MB)
                        </p>
                    </>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept={fileTypes.join(',')}
            />
        </div>
    );
};

export default FileUploadField;
