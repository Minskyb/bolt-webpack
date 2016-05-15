/**
 * Created by Punk.Li on 2016/5/15.
 */

var HelloWorld = require('../components/HelloWorld');

$(document).ready(function(){

    console.log("in module hello world!");
    var helloWorld = new HelloWorld({
        $wrapper:$("#main")
    });
});