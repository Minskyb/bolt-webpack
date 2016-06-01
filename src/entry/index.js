/**
 * Created by ASUS on 2016/5/17.
 */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

var $ = require('jquery');
var App = require('../abstract/app.js');

var Slider = require('../components/home/Slider');
var HeadNavBar = require('../components/home/HeadNavBar');
var LogoSearch = require('../components/home/LogoSearch');
var Table = require('../components/common/Table');

require('../less/common.less');

$(document).ready(function(){

    var options = {
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
    var index = new App(options);
    index.init();
});