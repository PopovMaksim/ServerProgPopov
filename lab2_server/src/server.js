const http = require('http');
const env = require('./config/env')
const logger = require('./utils/logger'); 
const fs = require('fs'); 
const path = require('path'); 
const { PUBLIC_DIR } = require('./config/env'); 
const { getContentType } = require('./utils/contentType'); 



const server = http.createServer((req, res) => {
    const TIME = new Date();

    let filePath; 
    if (req.url === '/') { 
        filePath = path.join(PUBLIC_DIR, 'index.html'); 
    } else if (req.url === '/about') { 
        filePath = path.join(PUBLIC_DIR, 'about.html'); 
    } else { 
        // спробувати віддати інший файл із public (наприклад, /styles.css чи /script.js) 
        filePath = path.join(PUBLIC_DIR, req.url); 
    } 

    fs.readFile(filePath, (err, content) => { 
        if (err) { 
            res.statusCode = 404; 
            res.setHeader('Content-Type', 'text/plain; charset=utf-8'); 
            res.end('Not found'); 
            return; 
        } 
        res.statusCode = 200; 
        res.setHeader('Content-Type', getContentType(filePath)); 
        res.end(content); 
    }); 

    res.on('finish', () => { 
        logger.log(req.method, req.url, res.statusCode, TIME); 
    }); 
});
    
server.listen(env.PORT, () => { console.log(`Server is running on ${env.PORT}`); });