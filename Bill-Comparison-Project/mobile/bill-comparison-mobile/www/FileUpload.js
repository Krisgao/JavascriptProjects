// frontend/src/components/FileUpload.js

import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    // 处理文件上传
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    // 处理表单提交
    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                onUpload(csvData);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h2>Upload a CSV file</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileUpload} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;
