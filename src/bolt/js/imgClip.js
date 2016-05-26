/**
 * Created by ASUS on 2016/3/29.
 *
 * 图片剪切插件
 *            $(".bt-imgclip").ImgClip({
 *              width:100,
 *              height:100,
 *              top:100,
 *              left:100,
 *              img:"images/20160329111037.png"
 *          });
 */

'use strict';

(function($){
    function ImgClip(element,setting){

        this.$element = $(element);

        this.loadComponent();
        this.initProperty(setting);
        this.addEvent();
    }

    ImgClip.defaults = {
         width:100   // 被选区的初始宽度，
        ,height:100  // 被选区的初始高度，
        ,handle:true   // 选择区域大小是否可变
        ,top:0
        ,left:0
    }

    ImgClip.prototype.initProperty = function(setting){
        this.setting = $.extend(true,ImgClip.defaults,setting ? setting : {});

        // 考虑 image.onload 事件兼容刷新处理，IE浏览器二次刷新好像不会触发 onload 事件。
        this.$origin.attr("src",this.setting.img);
        $(".bt-imgclip-chosen-img").attr("src",this.setting.img);

        // 设置大小
        this.$mask.width(this.setting.width);
        this.$mask.height(this.setting.height);

        // 设置位置
        this.setPosition(this.setting.top,this.setting.left);

        this.width = this.$mask.width();
        this.height = this.$mask.height();
        this.top = this.$mask[0].offsetTop;
        this.left = this.$mask[0].offsetLeft;

    }

    ImgClip.prototype.loadComponent = function(){

        var mask = '<div class="bt-imgclip-mask"><div class="bt-imgclip-chosen"><img class="bt-imgclip-chosen-img"><div class="bt-chosen-border top"></div><div class="bt-chosen-border bottom"></div><div class="bt-chosen-border left"></div><div class="bt-chosen-border right"></div></div><div class="bt-imgclip-handle"><div class="bt-handle-border top"></div><div class="bt-handle-border bottom"></div><div class="bt-handle-border left"></div><div class="bt-handle-border right"></div><div class="bt-handle-box top-center"></div><div class="bt-handle-box top-left"></div><div class="bt-handle-box top-right"></div><div class="bt-handle-box bottom-center"></div><div class="bt-handle-box bottom-left"></div><div class="bt-handle-box bottom-right"></div><div class="bt-handle-box left-middle"></div><div class="bt-handle-box right-middle"></div></div></div>'

        var origin = '<img class="bt-imgclip-origin">';

        this.$mask =$(mask);
        this.$origin = $(origin);

        this.$chosenImg = $(".bt-imgclip-chosen-img",this.$mask);

        this.$element.append(this.$mask);
        this.$element.append(this.$origin);

    }

    ImgClip.prototype.addEvent =function(){

        this.$mask.on("mousedown",$.proxy(this.startMove,this));
    }

    ImgClip.prototype.startMove = function(e){

        e.stopPropagation();
        e.preventDefault();

        this.clientX = e.clientX;
        this.clientY = e.clientY;

        var handleType = this.getHandleType(e.target.classList.toString());

        $(document).on("mousemove",{type:handleType}, $.proxy(this.handleMoving,this));
        $(document).one("mouseup",{type:handleType},$.proxy(this.handleMoveEnd,this));
    }

    ImgClip.prototype.setPosition = function(top,left){

        this.$mask.css({
            "top":top+"px",
            "left":left+"px"
        });
        this.$chosenImg.css({
            "top":-top+"px",
            "left":-left+"px"
        });
    }

    ImgClip.prototype.handleMoving = function(e){

        e.stopPropagation();
        e.preventDefault();

        var dX = e.clientX - this.clientX;
        var dY = e.clientY - this.clientY;

        console.log("dX,dY:("+dX+","+dY+")");

        switch(e.data.type){
            case 0:
                this.changeChosenPosition(dX,dY);
                break;
            case 1:
                this.changeBoxSize('Y',dY,-1);
                break;
            case 2:
                this.changeBoxSize('Y',dY,1);
                break;
            case 3:
                this.changeBoxSize('X',dX,-1);
                break;
            case 4:
                this.changeBoxSize('X',dX,1);
                break;
        }
    }

    ImgClip.prototype.handleMoveEnd = function(e){

        this.width = this.$mask.width();
        this.height = this.$mask.height();
        this.top = this.$mask[0].offsetTop;
        this.left = this.$mask[0].offsetLeft;

        $(document).off("mousemove",$.proxy(this.handleMoving,this));
    }

    ImgClip.prototype.changeChosenPosition = function(dX,dY){

        var originTop = this.top || 0;
        var originLeft = this.left || 0;

        console.log("top,left:"+(originTop+dY)+","+(originLeft+dX));
       if(this.isMoveOut(dX,dY,false) || originTop+dY<0 || originLeft+dX<0 ) return;

        this.setPosition(originTop+dY,originLeft+dX);
    }

    ImgClip.prototype.changeBoxSize = function(direction,distance,pn){

        console.log("width,height:("+this.width+","+this.height+")");

        if(direction == 'X'){
            var dY = distance * this.height / this.width;

            // 超出边界
            if(this.isMoveOut(distance*pn,dY*pn, pn<0 ? true:false)) return;

            this.$mask.width(this.width+distance*pn);
            this.$mask.height(this.height+dY*pn);

            if(pn<0){
                this.changeChosenPosition(distance,dY);
            }
        }
        else if(direction == 'Y'){
            var dX = distance * this.width / this.height;

            // 超出边界
            if(this.isMoveOut(dX*pn,distance*pn, pn<0 ? true:false)) return;

            this.$mask.width(this.width+dX*pn);
            this.$mask.height(this.height+distance*pn);

            if(pn<0){
                this.changeChosenPosition(dX,distance);
            }
        }
    }

    ImgClip.prototype.isMoveOut = function(dX,dY,ismoving){

        var width = dX + this.width + this.left;
        var height = dY + this.height + this.top;

        console.log("width,height:"+width+","+height);


        if(width > this.$chosenImg.width() || width <0 || height > this.$chosenImg.height() || height <0){
            return true;
        }
        else if(ismoving){

            var top = this.top - dY;
            var left = this.left - dX;

            console.log("top,left:"+top+","+left);

            if(top<0 || left <0){
                return true;
            }
        }
        return false;
    }

    ImgClip.prototype.getHandleType = function(classStr){

        if(/bt-imgclip-chosen-img/.test(classStr)){
            console.log("chosen 移动");
            return 0;
        }
        else if(/bt-handle-(border|box)\stop/.test(classStr)){
            console.log("border 上移");
            return 1;
        }
        else if(/bt-handle-(border|box)\sbottom/.test(classStr)){
            console.log("border 下移");
            return 2;
        }
        else if(/bt-handle-(border|box)\sleft/.test(classStr)){
            console.log("border 左移");
            return 3;
        }
        else if(/bt-handle-(border|box)\sright/.test(classStr)){
            console.log("border 右移");
            return 4;
        }
    }

    function Plugin(setting){

        return this.each(function(){
            var $this = $(this);
            var data = $this.data("bt.imgClip");

            if(!data)
            $this.data("bt.imgClip",(data = new ImgClip(this,setting)));
            else
            data.addEvent();
        });
    }

    $.fn.ImgClip = Plugin;

})(jQuery);