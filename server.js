/**
 * Created by Punk.Li on 2016/5/16.
 */
var express = require('express');
var path = require('path');

var app = express();
var port = 8080;

app.use(express.static(path.join(__dirname, './dist'), { maxAge: expireTime }));

app.listen(port,function(error){
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});