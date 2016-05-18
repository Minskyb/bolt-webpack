/*
 * Created by Punk.Li on 2016/5/14.
 * this.animation_duration (后面简称 duration )动画执行时间
 * 当 duration <=0 时不执行动画
 * 当 duration > 0 时
 * ---------   进入  ---------------
 * 在组件被添加进入 DOM 之前添加 template_enter 类；
 * 然后经过 duration 毫秒后，添加 template_enter_active 类
 * ---------   卸载  ---------------
 * 在组件被卸载之前，添加 template_leave 类
 * 然后经过 duration 毫秒后，添加 template_leave_active 类
 * 每 0.5 秒检查一次组件上的动画是否执行完成，
 * 如果完成则把组件从 DOM 中移除。
 *
 *     this.events =[
 *     {
 *          eventTarget:'.target', // 如果是字符串，则当做 this.$element 的 selector.
 *          type:'click',
 *          callback:'func'
 *      }
 *     ];
 * */


var _ = require('underscore');
var $ = require('jquery');

var BView = function(options){

    this.initProperty();
    this.setOptions(options);
    this.initData();
}

/* 基本属性初始化 */
BView.prototype.initProperty = function(){

    this.$wrapper = undefined;
    this.template = null;
    this.element = undefined;
    this.$element = undefined;
    this.state = 'init';
    this.data = null;
    this.id = _.uniqueId('template_ui_');
    this.events = [];
    this.animation_duration = 0;
}

BView.prototype.setOptions = function(options){

    $.extend(this,options);

    if(_.isString(this.$wrapper) && /^\.|\#/.test(this.$wrapper)){
        this.$wrapper = $(this.$wrapper);
    }
}

BView.prototype.initData = function(){

    this.create();
}

BView.prototype.create = function(){

    if(!this.$wrapper){
        console.error("$wrapper 错误！");
    }

    if(!this.template){
        return ;
    }

    this.element = this.parse();
    if(!this.element){
        console.error('template 解析失败！请检查 template 格式或数据是否已初始化！');
        return;
    }
    this.$element = $(this.element);
    this.$element.addClass(this.id);
    this.render();
    this.addEvent();
}

BView.prototype.parse = function(data){

    if(_.isString(this.template)){
        this.template = _.template(this.template);
    }

    if(!data)
        return this.template(this.data);
    return this.template(data);
}

BView.prototype.addEvent = function(){

    this.removeEvent();

    var self = this;
    this.events.map(function(item,i){
        self.$element.delegate(item.eventTarget,item.type,item.callback);
    });
}

BView.prototype.removeEvent = function(){

    var self = this;
    self.$element.undelegate();
}

BView.prototype.render = function(reload){

    this.$wrapper.empty();
    // 载入动画控制
    if(this.animation_duration > 0){

        this.$element.addClass('template_enter');

        var self = this;
        setTimeout(function(){
            self.$element.addClass('template_enter_active');
        },this.animation_duration);
    };

    this.$wrapper.append(this.$element);
    this.state = reload ? 'reloaded' : 'complete';
}

BView.prototype.delete = function(callback){

    if(this.animation_duration > 0){

        this.$element.addClass('template_leave');

        var self = this;
        setTimeout(function(){
            self.$element.addClass('template_leave_active');
        },this.animation_duration);

        var setInter = setInterval(function(){
            if(!self.$element.is(":animated")){
                clearInterval(setInter);
                setInter = null;
                self.$wrapper.empty();
                self.state = 'waiting';
                callback();
            }
            console.log("载出动画循环检查中...");
        },this.animation_duration)
    }
    else{
        this.$wrapper.empty();
        this.state = 'waiting';
        callback();
    }


}

BView.prototype.refresh = function(){

}

module.exports = BView;