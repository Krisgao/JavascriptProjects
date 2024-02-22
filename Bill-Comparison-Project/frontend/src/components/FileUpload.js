import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
    const [fileA, setFileA] = useState(null);
    const [fileB, setFileB] = useState(null);

    // 处理文件上传
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!fileA) {
            setFileA(file);
        } else if (!fileB) {
            setFileB(file);
        }
    };

    // 处理表单提交
    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileA && fileB) {
            const readerA = new FileReader();
            readerA.onload = () => {
                const csvDataA = readerA.result;

                const readerB = new FileReader();
                readerB.onload = () => {
                    const csvDataB = readerB.result;
                    // 将CSV数据转换为JSON格式
                    const data = {
                        billAData: csvDataA,
                        billBData: csvDataB
                    };

                    // 将JSON数据传递给父组件处理
                    onUpload(data);
                };
                readerB.readAsText(fileB);
            };
            readerA.readAsText(fileA);
        }
    };

    return (
        <div>
            <h2>Upload two CSV files</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileUpload} />
                <input type="file" onChange={handleFileUpload} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;
