/**
 * Created by Punk.Li on 2016/5/14.
 */

var $ = require('jquery');
var BV = require('./abstract.view');

var BComponent = function(options){
    BV.call(this,options);
}

BComponent.prototype = $.extend(BComponent.prototype,BV.prototype);

BComponent.prototype.constructor = BComponent;

BComponent.prototype.initProperty = function(){

    BV.prototype.initProperty.call(this);

    // 申明需要载入的组件集合
    this.views = [
        //{
        //    componentClass:'', // 组件。
        //    options:{
        //        $wrapper:'target'
        //    }
        //}
    ]

    // 已初始化的组件合集
    this.components = [];
};

BComponent.prototype.render = function(){

    BV.prototype.render.call(this);

    this.initComponents();
}

BComponent.prototype.initComponents = function(){

    var self = this;
    this.views.map(function(view){
        self.components.push(new view.componentClass(view.options));
    })
}

module.exports = BComponent;