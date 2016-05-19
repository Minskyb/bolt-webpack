/**
 * Created by ASUS on 2016/5/17.
 */
require('es5-shim');
require('es5-shim/es5-sham');

var $ = require('jquery');
var BRouter = require('../abstract/router.js');

var HelloWorld = require('../components/HelloWorld');
var Slider = require('../components/Slider');
var HeadNavBar = require('../components/HeadNavBar');
var LogoSearch = require('../components/LogoSearch');

$(document).ready(function(){

    var options = {
        defaultRouter:'sayHello',
        routers:[
            {
                componentId:'sayHello',
                componentClass:HelloWorld
            }
        ],
        views:[
            {
                componentClass:Slider,
                options:{
                    $wrapper:$(".js-c-slider")
                }
            },
            {
                componentClass:HeadNavBar,
                options:{
                    $wrapper:$(".js-c-head-nav-bar")
                }
            },
            {
                componentClass:LogoSearch,
                options:{
                    $wrapper:$(".js-c-logo-search")
                }
            }
        ]
    }
    var index = new BRouter(options);
    index.init();
});