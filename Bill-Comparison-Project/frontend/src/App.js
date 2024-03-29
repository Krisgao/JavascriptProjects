// frontend/src/App.js

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ComparisonResult from './components/ComparisonResult';

const App = () => {
    const [results, setResults] = useState([]);

    // 处理文件上传并获取比较结果
    const handleFileUpload = async (data) => {
        try {
            console.log(data);
            const response = await fetch('http://localhost:5000/api/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const responseData = await response.json();
            setResults(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Bill Comparison Tool</h1>
            <FileUpload onUpload={handleFileUpload} />
            <ComparisonResult results={results} />
        </div>
    );
};

export default App;
