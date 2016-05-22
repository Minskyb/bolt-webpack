/**
 * Created by Administrator on 2016/3/13.
 */
'use strict';

//(function(callback){
//    "function" == typeof define && define.amd ? define(['jquery'],callback) : "object" == typeof exprots ? module.exports = callback : callback(jQuery);
//})
(function($){

    var Slider = function(element,setting){

        this.setting = $.extend(true,Slider.defaults,setting);

        this.$element = $(element);
        this.$content = $(".bt-content",this.$element);
        this.$page = $(".bt-page",this.$element);

        this.height = this.$element[0].clientHeight; // Slider 控件高度
        this.width = this.$element[0].clientWidth; // Slider 控件宽度
        this.num = this.$page.length; // page 数量

        this.index = 0;  // 当前展示 page 原始序号


       var browser = window.navigator.userAgent.match(/MSIE\s(\d)/)
       if(browser && parseInt(browser[1])<9 ){
            this.setting.ANIMATION = false;
       }

    };

    Slider.defaults = {
        TRANSITION_DURATION:300,
        NAV:true,
        ANIMATION:true,
        AUTO_PLAY:true,
        AUTO_PLAY_TIME:3000
    }



    function Plugin(setting){

        this.each(function(){

            var $this = $(this);
            var data = $this.data("bt.slider");
            if(!data){
                $this.data("bt.slider",(data = new Slider(this,setting)));
            }
        });

    }

    $.fn.Slider = Plugin;
})(jQuery);