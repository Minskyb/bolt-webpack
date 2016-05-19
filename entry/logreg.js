/**
 * Created by ASUS on 2016/5/19.
 */

require('es5-shim');
require('es5-shim/es5-sham');

var $ = require('jquery');
var BRouter = require('../abstract/router.js');

var Login = require('../components/Login');
var Register = require('../components/Register');
var Footer = require('../components/Footer');

require('../less/common.less');
require('../less/logReg.less');

$(document).ready(function(){

    var options = {
        defaultRouter:'login',
        routers:[
            {
                componentId:'login',
                componentClass:Login
            },
            {
                componentId:'register',
                componentClass:Register
            }
        ],
        views:[
            {
                componentClass:Footer,
                options:{
                    $wrapper:$('.footer')
                }
            }
        ]
    }

    var logReg = new BRouter(options);
    logReg.init();
});