/**
 * Created by Punk.Li on 2016/5/15.
 */

var $ = require('jquery');
var m404 = require('../modules/404');

var BRouter = function(options){

    this.initProperty();
    if(options)
        this.setOptions(options);
}

BRouter.prototype.initProperty = function(){
    // 默认路由模块载入口
    this.$routerEntry = $('.js-router-entry');

    this.currentModuleId = null;
    this.currentModule = undefined;

    // 预载入组件声明
    this.views = [];

    this.components = [];

    // 路由表
    this.routers = [];
    this.modules = [];
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

    //this.currentModuleId = this.getModuleId();
    //this.currentModule = this.getNewModule(this.currentModuleId,this.routers);
    //this.modules[this.currentModuleId] = this.currentModule;
    this.hashChanged();

    var self = this;
    $(window).bind("hashchange",function(e){
        self.hashChanged();
    });
}

BRouter.prototype.initComponents = function(){

    var self = this;
    this.views.map(function(view){
        self.components.push(new view.controller(options));
    })
}

BRouter.prototype.hashChanged = function(){

    var moduleId = this.getModuleId();

    if(this.currentModuleId && moduleId == this.currentModuleId){
        this.currentModule.refresh();
    }
    else if(this.modules && this.modules[moduleId]){

        this.currentModule.delete();
        this.currentModuleId = moduleId;
        this.currentModule = this.modules[moduleId];
        this.currentModule.render(true);

    }
    else{
        if(this.currentModule)
            this.currentModule.delete();

        this.moduleId = moduleId;
        this.currentModule = this.getNewModule(moduleId,this.routers);
        if(this.currentModule)
            this.modules[this.currentModuleId] = this.currentModule;
    }
}


BRouter.prototype.getModuleId = function(){

    var hash = window.location.hash
        , regArr = hash.match(/^\#\/(\w+)?|\s/);

    if(hash == '' && this.defaultRouter){
        return this.defaultRouter;
    }

    if(regArr && regArr[1])
        return  regArr[1];

    return '404';
}

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
    console.error("未找到 %s 模块",moduleId);
    return null;
}


module.exports = BRouter;