const http = require('http');

// server is just an EventEmitter with .on, .emit, .once, etc. methods
const server = http.createServer((request, response) => {
    // --------------------------------------------------------------------------------------------------------
    // request - Request
    // --------------------------------------------------------------------------------------------------------
    // - Is an instance of http.IncomingMessage
    // - Is a ReadableStream
    // - Is an EventEmitter and behaves like one when an error happens.
    // ----------------------------------------------------
    // 'method' - is always regular HTTP method (GET, POST, etc.)
    // 'url' - is the full URL without the server, protocol or port. For example, if the server is running on localhost:3002 and the URL is
    // 'headers' - is an object with all the headers sent by the client
    const { headers, url, method } = request;

    // *** request.body parsing
    // ----------------------------------------------------
    // 1. http module
    // - Does not provide a way to parse the body of the request
    // - To parse the body of the request, you need to listen for the 'data' event and 'end' event
    //
    // Example:
    // let body = [];
    // req.on('data', (chunk) => {
    //     body.push(chunk);
    // }).on('end', () => {
    //     body = Buffer.concat(body).toString();
    //     res.writeHead(200);
    //     res.end('Hello world');
    // });

    // 2. Express
    // - Express provides a built-in middleware express.json() to parse the body of the request
    // - It parses the body of the request with Content-Type: application/json
    // - It is available through req.body
    // - To use it, you need to install express
    //
    // Example:
    // const express = require('express');
    // const app = express();
    // app.use(express.json());
    // app.post('/', (req, res) => {
    //     res.json(req.body);
    // });

    // --------------------------------------------------------------------------------------------------------
    // response - Response
    // --------------------------------------------------------------------------------------------------------
    // - Is an instance of http.ServerResponse
    // - Is a WritableStream
    // ----------------------------------------------------

    // *** response - setting values
    // ----------------------------------------------------
    // response.statusCode = 200 - sets status code (default is 200)
    // response.setHeader('Content-Type', 'application/json') - sets header
    // response.writeHead(200, { 'Content-Type': 'application/json' }); - sets status code and headers

    response.write('<!DOCTYPE html>');
    response.write('<html>');
    response.write('<body>');
    response.write('<h1>Hello, World!</h1>');
    response.write('</body>');
    response.write('</html>');
    response.end();
});

// This is just shorthand for server.on('request', callback)
server.listen(8000);
