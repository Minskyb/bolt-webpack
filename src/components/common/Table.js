/**
 * Created by Punk.Li on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Table.html');
var BC = require('../../abstract/component.js');
var TableRow = require('./TableRow');

window.BT = {
    TableRow:TableRow
};

var Table = function(options){
    BC.call(this,options);
}

Table.prototype = $.extend({},Table.prototype,BC.prototype);

Table.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;

    this.data ={
        tableData:{
            colType:["","","link"],
            data:[
                ["品种","牌号","厂家"],
                ["PVC","SG-5","新疆中泰"],
                ["PVC","SG-5","新疆中泰"]
            ]
        }
    }
}

Table.prototype.constructor = Table;

module.exports = Table;