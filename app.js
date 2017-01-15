'use strict';

var server = require('./server');
var config = require('./config');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    "html": "text/html"
};

http.createServer(handleRequest).listen(config.server.port, console.log('Node started on http://%s:%s', config.server.host, config.server.port));

function handleRequest(req, res) {
    var uri = url.parse(req.url).pathname;

    if(uri === '/') uri += 'index.html';

    var filename = path.join(__dirname, '/frontend/', uri);

    fs.access(filename, fs.F_OK, function(err) {
        if(err) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            return res.end();
        }

        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType});
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    });
}
