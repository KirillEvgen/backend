const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { getHelloMessage } = require('./modules/hello-modules');

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const queryKeys = Object.keys(query);

    
    if (queryKeys.length === 0) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Hello, World!');
        return;
    }

    
    if ('hello' in query) {
        const name = query.hello;
        
        
        if (!name || name.trim() === '') {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('Enter a name');
            return;
        }
        
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(getHelloMessage(name));
        return;
    }

    
    if ('users' in query) {
        const usersFilePath = path.join(__dirname, 'data', 'users.json');
        
        fs.readFile(usersFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('');
                return;
            }
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(data);
        });
        return;
    }

    
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('');
});

server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен на http://${HOST}:${PORT}`);
});
