// frontend/src/App.js

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ComparisonResult from './components/ComparisonResult';

const App = () => {
    const [results, setResults] = useState([]);

    // 处理文件上传并获取比较结果
    const handleFileUpload = async (csvData) => {
        try {
            const response = await fetch('/api/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ csvData })
            });
            const data = await response.json();
            setResults(data);
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
