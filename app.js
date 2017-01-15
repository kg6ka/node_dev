'use strict';

var server = require('./server');
var config = require('./config');
var http = require('http');

http.createServer(isServer).listen(config.server.port);

function isServer(req, res) {
    res.writeHead(200);
    res.end(server('NodeJS'));
}

console.log('Node started on http://' + config.server.host + ':' + config.server.port);