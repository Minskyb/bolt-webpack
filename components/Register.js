/**
 * Created by ASUS on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Register.html');
var BC = require('../abstract/component.js');

var Register = function(options){
    BC.call(this,options);
}

Register.prototype = $.extend({},Register.prototype,BC.prototype);

Register.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}

Register.prototype.constructor = Register;

module.exports = Register;