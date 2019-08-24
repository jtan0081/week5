var http = require('http');
var fs = require('fs');
var fileName = 'index.html';
var url = require('url');
const {
    parse
} = require('querystring');
http.createServer(function (request, response) {

    var url = request.url;
    var method = request.method;
    // var q = url.parse(url, true).query; 
    // var pathName = url.parse(url, true).pathname;
    if (url === '/') {
        fileName = 'index.html';
        fs.readFile(fileName, function (error, content) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(content, 'utf-8');
        });
    }
    else if (url==="/check" && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            let items = parse(body);
            // console.log(items);
            if (items.username == 'admin' && items.password == 'pass') {
                fileName = 'mainpage.html';
                fs.readFile(fileName, function (error, content) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.end(content, 'utf-8');
                });

            } else {
                fileName = 'accessdenied.html';
                fs.readFile(fileName, function (error, content) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.end(content, 'utf-8');
                });
            }

        });
    }
    // case '/mainpage':
    //     fileName = 'mainpage.html';
    //     break;

    // default:
    //     fileName = 'accessdenied.html';
    //     break;

    // fs.readFile(fileName, function (error, content) {
    //     response.writeHead(200, {
    //         'Content-Type': 'text/html'
    //     });
    //     response.end(content, 'utf-8');
    // });

}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');