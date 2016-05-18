/**
 * Created by Punk.Li on 2016/5/15.
 */

var $ = require('jquery');
var c404 = require('../components/404');

var BRouter = function(options){

    this.initProperty();
    if(options)
        this.setOptions(options);
}

BRouter.prototype.initProperty = function(){
    // 默认路由模块载入口
    this.$routerEntry = $('.js-router-entry');

    // 预载入组件声明
    this.views = [];
    // 通过预载入绑定的组件实例集
    this.components = [];

    // 当前路由展示的组件ID
    this.currentComponentId = null;
    // 当前路由展示的组件实例
    this.currentComponent = undefined;

    // 路由表
    this.routers = [];
    // 由路由载入的组件实例集
    this.routerComponents = {};

    // 默认路由
    this.defaultRouter = null;
}

BRouter.prototype.setOptions = function(options){

    $.extend(this,options);
}

BRouter.prototype.init = function(){

    this.initComponents();
    if(!this.routers){
        console.error("路由信息不能为空！")
        return;
    }

    this.hashChanged();

    var self = this;
    $(window).bind("hashchange",function(e){
        self.hashChanged();
    });
}

BRouter.prototype.initComponents = function(){

    var self = this;
    this.views.map(function(view){
        self.components.push(new view.componentClass(view.options));
    })
}

BRouter.prototype.hashChanged = function(){

    var componentId = this.getModuleId();

    if(this.currentComponentId && componentId == this.currentComponentId){
        this.currentComponent.refresh();
    }
    else if(this.routerComponents && this.routerComponents[componentId]){

        this.currentComponent.delete(function(){
            this.currentComponentId = componentId;
            this.currentComponent = this.routerComponents[componentId];
            this.currentComponent.render(true);
        }.bind(this));
    }
    else{

        if(this.currentComponent){
            this.currentComponent.delete(function(){

                this.currentComponent = this.getNewModule(componentId,this.routers);
                this.currentComponentId = this.currentComponent instanceof  c404 ? '404':componentId;
                this.routerComponents[this.currentComponentId] = this.currentComponent;
            }.bind(this));
        }
        else{
            this.currentComponent = this.getNewModule(componentId,this.routers);
            this.currentComponentId = this.currentComponent instanceof  c404 ? '404':componentId;
            this.routerComponents[this.currentComponentId] = this.currentComponent;
        }
    }
}


BRouter.prototype.getModuleId = function(){

    var hash = window.location.hash
        , regArr = hash.match(/^\#\/(\w+)?|\s/);


    if(regArr && regArr[1])
        return  regArr[1];

    return this.defaultRouter ? this.defaultRouter : '404';
}

/*
*  这里放回一个 c404 会导致这样的情况出现：
*  当多次访问错误跳转时，this.routerComponents 的冗余会越来越大
* */
BRouter.prototype.getNewModule = function(moduleId,routers){

    var self = this;
    for(var i = 0,len = routers.length,router = null; i < len;i++){

        router = routers[i];

        if(router.moduleId == moduleId){
            return new router.moduleClass({
                $wrapper:self.$routerEntry
            })
        }
    }
    return  new c404({
        $wrapper:self.$routerEntry
    });
}


module.exports = BRouter;