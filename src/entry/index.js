/**
 * Created by ASUS on 2016/5/17.
 */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

var $ = require('jquery');
var BRouter = require('../abstract/router.js');

var HelloWorld = require('../components/HelloWorld');
var Slider = require('../components/Slider');
var HeadNavBar = require('../components/HeadNavBar');
var LogoSearch = require('../components/LogoSearch');
var Table = require('../components/Table');

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
                    wrapper:".js-c-slider"
                }
            },
            {
                componentClass:Table,
                options:{
                    wrapper:".js-c-table"
                }
            },
            {
                componentClass:HeadNavBar,
                options:{
                    wrapper:".js-c-head-nav-bar"
                }
            },
            {
                componentClass:LogoSearch,
                options:{
                    wrapper:".js-c-logo-search"
                }
            }
        ]
    }
    var index = new BRouter(options);
    index.init();
});