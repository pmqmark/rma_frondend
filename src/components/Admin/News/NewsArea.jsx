"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './NewsArea.css';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <input className="py-3" placeholder="Loading editor..." disabled />,
});

const TextEditor = ({ value, setValue }) => {
    // Function to calculate the length of plain text by stripping out HTML tags
    const getTextLength = (content) => {
        return content.replace(/<[^>]*>/g, '').length;
    };

    // Handle changes in the editor, including both typing and pasting
    const handleChange = (content) => {
        const plainTextLength = getTextLength(content);

        // Update the value regardless, but apply length restriction based on plain text length
        if (plainTextLength <= 2000) {
            setValue(content);
        } else {
            // If pasted content exceeds the limit, truncate it to fit the limit
            const truncatedContent = content.substring(0, content.lastIndexOf(" ", 2000));
            setValue(truncatedContent);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ],
    };

    return (
        <div className="text-editor w-7/12 max-md:w-full rounded-xl">
            <ReactQuill
                value={value}
                onChange={handleChange}
                theme="snow"
                modules={modules}
                placeholder="Text here..."
            />
            <div className="char-count text-gray-600 font-light mt-2 text-sm">
                {2000 - getTextLength(value)} Characters left
            </div>
        </div>
    );
};

export default TextEditor;
