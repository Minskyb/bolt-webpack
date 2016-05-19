/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var BV = require('../abstract/view.js');
var template = require('./Slider.html');

var Slider = function(options){

    BV.call(this,options);
}

Slider.prototype = $.extend(Slider.prototype,BV.prototype);

Slider.prototype.constructor = Slider;

Slider.prototype.initProperty = function(){

    BV.prototype.initProperty.call(this);

    this.template  = template;
    this.data = {
        sliders:[
            {
                img:'./images/avd.jpg',
                url:'http://www.baidu.com/'
            },
            {
                img:'./images/blog.jpg',
                url:'http://www.aiqiyi.com/'
            },
            {
                img:'./images/fisrtbg.jpg',
                url:'http://www.uicare.cn/'
            }
        ]
    }
}

Slider.prototype.render = function(){

    BV.prototype.render.call(this);

    $(".pk-slider").Slider({});
}

module.exports = Slider;