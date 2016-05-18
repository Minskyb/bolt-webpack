/**
 * Created by Punk.Li on 2016/5/15.
 */

var $ = require('jquery');
var template = require('./HelloWorld.html');
var BC = require('../abstract_class/abstract.component');

var HelloWorld = function(options){
    BC.call(this,options);
}

HelloWorld.prototype = $.extend({},HelloWorld.prototype,BC.prototype);

HelloWorld.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
    this.data = {
        name:'Punk.Li Good'
    }
    this.animation_duration = 500;
}

HelloWorld.prototype.constructor = HelloWorld;

module.exports = HelloWorld;
