const fs = require('fs'); 
const path = require('path'); 
const { LOG_PATH } = require('../config/env'); 

const dir = path.dirname(LOG_PATH); 
if (!fs.existsSync(dir)) { 
    fs.mkdirSync(dir, { recursive: true }); 
} 

function log(method, url, statusCode, starttime) { 
    const endtime = new Date();
    
    // 1. Створюємо об'єкт з даними
    const logEntry = {
        timestamp: endtime.toISOString(),
        method: method,
        url: url,
        statusCode: statusCode,
        durationMs: endtime - starttime
    };

    // 2. Перетворюємо в JSON-рядок
    const line = JSON.stringify(logEntry) + '\n';

    console.log(`[LOG]: ${method} ${url} ${statusCode}`);

    // 3. Записуємо у файл
    fs.appendFile(LOG_PATH, line, (err) => { 
        if (err) { 
            console.error('Error writing log:', err); 
        } 
    }); 
} 

module.exports = { log };