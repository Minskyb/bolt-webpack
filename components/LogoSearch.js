/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./LogoSearch.html');
var BC = require('../abstract_class/abstract.component');

require('../less/common.less');
require('../less/hGroup.less');
require('../less/logoSearch.less');

var LogoSearch = function(options){
    BC.call(this,options);
}

LogoSearch.prototype = $.extend({},LogoSearch.prototype,BC.prototype);

LogoSearch.prototype.constructor = LogoSearch;

LogoSearch.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}

module.exports = LogoSearch;