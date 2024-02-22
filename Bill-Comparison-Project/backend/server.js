// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST 路由，用于比较两份账单数据
app.post('/api/compare', (req, res) => {
    console.log(req.body); 
    // 从请求体中获取两份账单数据
    const { csvDataA, csvDataB } = req.body;

    // 解析两份账单数据
    const billAEntries = parseCSVData(csvDataA);
    const billBEntries = parseCSVData(csvDataB);

    // 比较两份账单数据
    const comparisonResults = compareBillEntries(billAEntries, billBEntries);

    // 将比较结果发送回客户端
    res.json(comparisonResults);
});

// 解析 CSV 数据的函数
function parseCSVData(csvData) {
    const entries = [];
    const lines = csvData.split(/\r?\n/); // 使用正则表达式匹配可能存在的回车符（\r\n）
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const [trackingNumber, totalAmount] = line.split(',');
            if (trackingNumber && totalAmount) {
                entries.push({ TrackingNumber: trackingNumber.trim(), TotalAmount: parseFloat(totalAmount.trim()) });
            }
        }
    }
    return entries;
}


// 比较两份账单数据的函数
function compareBillEntries(billAEntries, billBEntries) {
    const results = [];

    // 遍历账单A中的每个条目
    billAEntries.forEach(entryA => {
        const matchingEntriesB = billBEntries.filter(entryB => entryB.TrackingNumber === entryA.TrackingNumber);

        // 如果在账单B中找到匹配的条目
        if (matchingEntriesB.length > 0) {
            // 检查是否存在不同的金额
            matchingEntriesB.forEach(entryB => {
                if (entryB.TotalAmount !== entryA.TotalAmount) {
                    results.push({
                        TrackingNumber: entryA.TrackingNumber,
                        AmountInBillA: entryA.TotalAmount,
                        AmountInBillB: entryB.TotalAmount
                    });
                }
            });
        } else {
            // 如果在账单B中找不到匹配的条目，将在账单A中的金额列出来
            results.push({
                TrackingNumber: entryA.TrackingNumber,
                AmountInBillA: entryA.TotalAmount,
                AmountInBillB: null // 表示在账单B中未找到匹配的条目
            });
        }
    });

    // 检查是否有在账单B中存在但在账单A中不存在的条目
    billBEntries.forEach(entryB => {
        const matchingEntriesA = billAEntries.find(entryA => entryA.TrackingNumber === entryB.TrackingNumber);
        if (!matchingEntriesA) {
            results.push({
                TrackingNumber: entryB.TrackingNumber,
                AmountInBillA: null, // 表示在账单A中未找到匹配的条目
                AmountInBillB: entryB.TotalAmount
            });
        }
    });

    return results;
}

// 启动 Express 服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
