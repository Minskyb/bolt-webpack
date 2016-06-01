/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var BC = require('../../abstract/component.js');
var template = require('./Slider.html');

var Slider = function(options){

    BC.call(this,options);
}

Slider.prototype = $.extend(Slider.prototype,BC.prototype);

Slider.prototype.constructor = Slider;

Slider.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

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

    BC.prototype.render.call(this);

    $(".bt-slider").Slider({});
}

module.exports = Slider;