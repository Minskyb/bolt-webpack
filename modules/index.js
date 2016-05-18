/**
 * Created by ASUS on 2016/5/17.
 */
require('es5-shim');
require('es5-shim/es5-sham');
var $ = require('jquery');
var HelloWorld = require('../components/HelloWorld');
var BRouter = require('../abstract_class/abstract.router');

$(document).ready(function(){

    console.log("fuck you fuck me");

    var options = {
        defaultRouter:'sayHello',
        routers:[
            {
                moduleId:'sayHello',
                moduleClass:HelloWorld
            }
        ]
    }
    var index = new BRouter(options);
    index.init();
});