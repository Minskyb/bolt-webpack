/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./HeadNavBar.html');
var BC = require('../../abstract/component.js');

var HeadNavBar = function(options){
    BC.call(this,options);
}

HeadNavBar.prototype = $.extend({},BC.prototype,{
    constructor : HeadNavBar,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;
    }
});

module.exports = HeadNavBar;
