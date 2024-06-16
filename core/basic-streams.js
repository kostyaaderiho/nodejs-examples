const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        request.pipe(response);
    } else {
        response.end('Send me a POST request\n');
    }
});

server.listen(8000);
