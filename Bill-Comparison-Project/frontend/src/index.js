// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 使用 createRoot 替换 ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染你的应用程序
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);