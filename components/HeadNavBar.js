/**
 * Created by ASUS on 2016/5/18.
 */

require('../less/hGroup.less');
require('../less/common.less');

var $ = require('jquery');
var template = require('./HeadNavBar.html');
var BC = require('../abstract_class/abstract.component');

var HeadNavBar = function(options){
    BC.call(this,options);
}

HeadNavBar.prototype = $.extend({},HeadNavBar.prototype,BC.prototype);

HeadNavBar.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}

HeadNavBar.prototype.constructor = HeadNavBar;

module.exports = HeadNavBar;
