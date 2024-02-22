// frontend/src/components/ComparisonResult.js

import React from 'react';

const ComparisonResult = ({ results }) => {
    return (
        <div>
            <h2>Comparison Result</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComparisonResult;
