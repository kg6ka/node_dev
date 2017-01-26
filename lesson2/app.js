let express = require('express');
let path = require('path');
let fs = require('fs');
let url = require('url');
let config = require('./config');

let apiVersion = require('./package').version;

let app = express();

app.set('port', config.server.port);

app.listen(app.get('port'), console.log('Server started on http://%s:%s', config.server.host, config.server.port));

app.get('/', function (req, res) {
    res.send(`<html><body><h1>Server run with http API! Version ${apiVersion}</h1></body></html>`)
});

app.get('/api/:apiVersion/*', function (req, res) {
    let filePath = req.path; //+ req.method.toLowerCase();
    filePath = filePath.replace('/' + apiVersion, '');
    filePath = filePath.replace('api', 'server');
    filePath = path.join(__dirname, filePath);
    let response = [];

    fs.readdir(filePath, function(err, files) {
        // res.type('json');
        if(err) {
            throw new Error(err.code);
            // return res.json({ success: false, path: filePath, error })
        }
        files.map(item => {
            return path.join(filePath, item);
        }).filter(file => {
            return fs.statSync(file).isDirectory();
        }).forEach(folderPath => {
            let fpath = path.join(folderPath, `${req.method.toLowerCase()}.json`);
            console.log('folderPath', fpath);
            fs.readFile(fpath, function(err, data) {
                if (err) throw err;
                response.push(JSON.parse(data.toString()));
                res.json(response);
                res.end(response)
            })
        });
        console.log(files);
        // res.end(`success`);
    });

});