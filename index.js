const http = require('http');
const { parse } = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;
let users = [
    {
        name: 'Kirill'
    },
    {
        name: 'Ruslan'
    },

]
const server = http.createServer((req, res) => {
    if(req.url === '/users') {
        switch(req.method) {
            case 'GET':
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(JSON.stringify(users))
                break;
            case 'POST':
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                let bodyPost = '';
                req.on('data', chunk => {
                    bodyPost += chunk.toString();
                });
                req.on('end', () => {
                    const params = parse(bodyPost);
                    users.push(params);
                    res.end('Good!');
                });
                break;
            case 'PUT':
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                let bodyPut = '';
                req.on('data', chunk => {
                    bodyPut += chunk.toString();
                });
                req.on('end', () => {
                    const params = parse(bodyPut);
                    users = params;
                    res.end('Nice!');
                });
                break;
        }
    } else {

        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})