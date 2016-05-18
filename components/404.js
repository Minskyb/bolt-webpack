/**
 * Created by ASUS on 2016/5/18.
 */
var $ = require('jquery');
var template = require('./404.html');
var BC = require('../abstract_class/abstract.component');

var C404 = function(options){
    BC.call(this,options);
}

C404.prototype = $.extend({},C404.prototype,BC.prototype);

C404.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}

C404.prototype.constructor = C404;

module.exports = C404;
