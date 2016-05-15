/**
 * Created by Punk.Li on 2016/5/15.
 */

var $ = require('jquery');

var BRouter = function(options){

    this.initProperty();
    if(options)
        this.setOptions(options);
}

BRouter.prototype.initProperty = function(){
    // 默认路由模块载入口
    this.$routerEntry = $('.js-router-entry');

    this.moduleId = null;
    this.module = undefined;

    // 预载入组件声明
    this.views = [];

    this.components = [];

    // 路由表
    this.routers = [];
}

BRouter.prototype.setOptions = function(options){

    $.extend = (this,options);
}

BRouter.prototype.init = function(){

    this.initComponents();
    if(!this.routers){
        console.error("路由信息不能为空！")
        return;
    }

    //var self = this;
    //$(window).bind("hashchange",function(e){
    //    self.hashChanged();
    //});
}

BRouter.prototype.initComponents = function(){

    var self = this;
    this.views.map(function(view){
        self.components.push(new view.controller(options));
    })
}

BRouter.prototype.hashChanged = function(){

}

BRouter.prototype.loadModule = function(url,callback){

    var self = this;
    requirejs([url],function(view){
        callback && callback.call(this,view);
    })
}

BRouter.prototype.getModuleId = function(){

    var moduleId = '';
    var someResult = this.routers.some(function(router){
        return router.moduleId == moduleId ? true : false;
    })

    return  someResult ? moduleId : '404';
}


module.exports = BRouter;