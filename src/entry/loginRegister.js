/**
 * Created by ASUS on 2016/5/19.
 */

require('es5-shim');
require('es5-shim/es5-sham');

var $ = require('jquery');
var App = require('../abstract/app.js');

var Login = require('../components/loginRegister/Login');
var Register = require('../components/loginRegister/Register');
var Footer = require('../components/common/Footer');

require('../less/common.less');
require('../less/loginRegister.less');

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
                    wrapper:'.footer'
                }
            }
        ]
    }

    var logReg = new App(options);
    logReg.init();
});