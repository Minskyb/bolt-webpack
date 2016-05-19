/**
 * Created by Punk.Li on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Table.html');
var BC = require('../abstract/component.js');

var Table = function(options){
    BC.call(this,options);
}

Table.prototype = $.extend({},Table.prototype,BC.prototype);

Table.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}

Table.prototype.constructor = Table;

module.exports = Table;