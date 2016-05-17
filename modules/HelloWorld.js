/**
 * Created by Punk.Li on 2016/5/15.
 */

require('es5-shim');
require('es5-shim/es5-sham');
var $ = require('jquery');
var HelloWorld = require('../components/HelloWorld');

$(document).ready(function(){

    console.log("in module hello world! Punk.Li");
    var helloWorld = new HelloWorld({
        $wrapper:$("#main")
    });
});