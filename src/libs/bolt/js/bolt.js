/**
 * Created by Administrator on 2016/3/27.
 * Abox  根据 height/width 系数及实时的 width 设置新的 height。
 */
'use strict';

(function($){

    function Abox(element,ratio){
        this.$element = $(element);
        this.ratio = ratio;
    }

    Abox.prototype.resetHeight = function(){
        this.$element.css("height",this.$element.width()*this.ratio);
    }

    function Plugin(){
        resizeHandler();

       $(window).resize(resizeHandler);

        function resizeHandler(e){
            $('[data-toggle="bt-ratio"]').each(function(){
                var $this = $(this),
                    data = $this.data("bt-ratio"),
                    ratio = parseFloat($this.attr("data-ratio"));
                if(!ratio){
                    console.error("data-ratio 系数未设置\n"+ratio);
                    return;
                }
                if(!data)
                    $this.data("bt-ratio",(data = new Abox(this,ratio)));

                data.resetHeight();
            });
        }
    }

    $.fn.Abox = Plugin;

})(jQuery);
/**
 * Created by ASUS on 2016/5/31.
 */
(function($){

    var defaultOptions = {
        CIRCLE_TIME:1000
    }

    var CircleList = function(element,options){

        this.options = defaultOptions;
        this._setOptions();


        this.$element = $(element);
        this.$list = this.$element.find(".bt-circle-list");
        this.$element.css({
            height:this.$list.height() +"px"
        })
        this.itemHeight = this.$list.height()/(this.$list.find(".item").length-this.$list.find(".item.hide").length);

        this.interval && this.pause();
        this._circle();

        this.$element.on("mouseenter",function(e){
            this.interval && this.pause();
        }.bind(this));
        this.$element.on("mouseleave",function(e){
            this._circle();
        }.bind(this));
    }

    CircleList.prototype._setOptions = function(options){
        this.options = $.extend({},this.options,options);
    }

    CircleList.prototype._getCss = function(node,attribute){

        var origin = node.css(attribute).match(/(\S+)px/);
        if(origin)
            return parseFloat(origin[1]);
        return 0;
    }

    CircleList.prototype._circle = function(){
        this.interval = true;
        var originTop = this._getCss(this.$list,"top");
        // 处理暂停后，重新启动因为 top ！= 0 所带来的速度改变情况
        var circleTime = this.options.CIRCLE_TIME*(originTop+this.itemHeight)/this.itemHeight;

        var $next = this.$list.find(".item.hide").first().removeClass("hide");
        this.$list.animate({
            top:-this.itemHeight+"px"
        },circleTime,'linear',function(){
            this.$list.find(".item").first().appendTo(this.$list).addClass("hide");
            this.$list.css({
                top:0
            });
            this._circle();
        }.bind(this))
    }

    CircleList.prototype.pause = function(){
        this.interval = false;
        this.$list.stop();
    }

    CircleList.prototype.addItem = function(data){

        var fragment = document.createDocumentFragment()
            ,newNode = null;

        data.forEach(function(item){
            newNode = document.createElement("li");
            newNode.appendChild(document.createTextNode(item));
            fragment.appendChild(newNode)
        })

        this.$list[0].appendChild(fragment);
    }

    function Plugin(options){
        this.each(function(){
            var $this = $(this);
            var data = $(this).data("bt-circle-list");
            if(!data){
                $this.data("bt-circle-list",(data = new CircleList(this,options)));
            }
        });
    }

    $.fn.CircleList = Plugin;
    //$.fn.CircleList.default = defaultOptions;

})(jQuery)
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
/**
 * Created by Administrator on 2016/4/9.
 */
(function($,w){

    function Layer(element){
        this.$element = element;
        this._init();
    }

    Layer.prototype._init = function(){
        this._saveOriginPosition();
        this._addEvent();
    }

    Layer.prototype._saveOriginPosition = function(){

        this.$element.each(function(){
            var $this = $(this);
            var data = $this.data("data-layer-origin-position-y");
            if(!data) $this.data("data-layer-origin-position-y",parseFloat($this.css("background-position-y"),10));
        });
    }

    Layer.prototype._addEvent = function(){
        $(w).bind("load",this._scrollHandler.bind(this));
        $(w).bind("scroll",this._scrollHandler.bind(this));
        $(w).bind("resize",this._scrollHandler.bind(this));
    }

    Layer.prototype._scrollHandler = function(e){

        var scrollTop = $(w).scrollTop();
        var wHeight = $(w).height();

        this.$element.each(function(i){

            var $this = $(this)
                ,offset = $this.offset();
            if(offset.top+$this.height() > scrollTop && scrollTop+wHeight > offset.top){

                var ratio = parseFloat($this.attr("data-layer-position-ratio"),10);
                var origin = $this.data("data-layer-origin-position-y");
                $this.css("background-position-y",origin+(scrollTop+wHeight-offset.top)*ratio);
                console.log(i+":--->"+(origin+(scrollTop+wHeight-offset.top)*ratio));
            }
        });
    }

    Layer.prototype.setTarget = function(element){
        this.$element = element;
        this._saveOriginPosition();
    }

    Layer.prototype.dispose = function(){

        this.$element.data("bt-layer",null);
        this.$element = null;

        $(w).unbind("load",this._scrollHandler.bind(this));
        $(w).unbind("scroll",this._scrollHandler.bind(this));
        $(w).unbind("resize",this._scrollHandler.bind(this));
    }

    function Plugin(){
        var data;
        this.each(function(){
            var $this = $(this);
            data = $this.data("bt-layer");
        });
        if(!data) this.data("bt-layer",(data = new Layer(this)));
        else data.setTarget(this);
    }

    $.fn.layer = Plugin;

})(jQuery,window)
/**
 * Created by ASUS on 2016/3/25.
 * LimitWords
 */
'use strict';

(function($){
    function LimitWords(element,setting){

        this.setting = $.extend(LimitWords.defaults,setting);

        this.$element = $(element);
        this.addEvent();
    }

    LimitWords.defaults = {
        limitLength:200
    }

    LimitWords.prototype.addEvent = function(){

        this.$element.on("keyup", $.proxy(this.chargeWordsNumber,this));

        // 当 textarea 失去焦点时，移除 keyup 事件监听
        var self = this;
        this.$element.one("focusout",function(){
            //self.$element.off("keyup","**");  // 这种方法无法解除 keyup 事件监听
            self.$element.off("keyup",$.proxy(self.chargeWordsNumber,self));
        })
    }

    LimitWords.prototype.chargeWordsNumber = function(e){

        var originValue = this.$element.val(), i=0,len=originValue.length,codeLength=0;
        for(;i<len;i++){

            codeLength += originValue.charCodeAt(i)>255 ? 2:1;

            if(codeLength>this.setting.limitLength){
                codeLength -= originValue.charCodeAt(i)>255 ? 2:1;
                this.$element.next(".bt-input-add>.js-number").text(codeLength);
                return this.$element.val(originValue.slice(0,i));
            }
        }
        return this.$element.next(".bt-input-add").children(".js-number").text(codeLength);
    }

    function Plugin(setting){
        return this.each(function(){
            var $this = $(this);
            var data = $this.data("limit-words");
            if(!data)
            $this.data("limit-words",(data = new LimitWords(this,setting)));
            else
                data.addEvent();
        });
    }

    $.fn.LimitWords = Plugin;

    // 自动执行，可以省略让用户手动添加，因为当插件逐渐变多，会导致自动添加的监听事件过多
    // 从而产生不必要的内存浪费。
    $(document).ready(function(){
        $(document).on("click",'[data-toggle="limit-words"]',function(e){
            var $target = $(e.target);
            var limitLength = parseInt($target.attr("data-limit"));
            Plugin.call($target,{limitLength:limitLength});
        });
    });
})(jQuery);
/**
 * Created by ASUS on 2015/12/24.
 */
'use strict';
(function($){

    var Modal = function(element,setting){

        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find(".bt-modal-dialog");
        this.$backdrop           = null;
        this.isShown             = null;
        //this.ignoreBackdropClick = false;

    }

    Modal.TRANSITION_DURATION = 300;

    Modal.defualts = {};

    /*
    * _relatedTarget was the trigger object
    * */
    Modal.prototype.show = function(_relatedTarget){
        var self = this;

        var e = $.Event('show.bt.modal',{relatedTarget:_relatedTarget});
        this.$element.trigger(e);

        if(this.isShown) return;
        this.isShown = true;

        var scrollBarWidth = this.measureScrollbar();
        //屏蔽 body 的滚动条，并且在需要的时候给 modal 添加滚动条
        this.$body.addClass('bt-modal-open');
        this.hideScrollbar(scrollBarWidth);



        /* 点击 × 符号 */
        //this.$element.on('click.dismiss.bt.modal','[data-dismiss="modal"]', $.proxy(this.hide,this));

        //this.$dialog.on('mousedown.dismiss.bt.modal',function(){
        //    self.$element.one('mouseup.dismiss.bt.modal',function(e){
        //       self.ignoreBackdropClick = true;
        //    });
        //});


        this.backdrop(function(){});
    }

    Modal.prototype.hide = function(_relatedTarget){

        this.$element
            .removeClass('in')
            .off('.dismiss.bt.modal')
        this.$backdrop
            .removeClass('in')
            .off('dismiss.bt.modal');
        this.isShown = false;
        this.$element.hide();
        this.$body.removeClass('bt-modal-open');
        this.resetScrollbar();
        this.removeBackdrop();
    }


    Modal.prototype.toggle = function(_relatedTarget){
        this.isShown ? this.hide(_relatedTarget) : this.show(_relatedTarget);
    }

    Modal.prototype.backdrop = function(callback){

        var self = this;

        if(!this.isShown) return;
        this.$backdrop = $(document.createElement('div'));
        this.$backdrop.addClass('bt-modal-backdrop fade')
            .appendTo(this.$body);


        this.$element.on('click.dismiss.bt.modal',function(e){
           if($(e.target).is(self.$element[0]) ) self.hide();
        });
        /*兼容IE8 浏览器，通过上面的方法 IE8只能监听到 content 内部的点击事件，而无法监听到 content 以外的事件*/
        this.$backdrop.on("click",function(e){
            self.hide();
        });

        this.$backdrop.addClass('in');
        this.$element.show(0).addClass('in');
    }

    Modal.prototype.removeBackdrop = function(){
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null;
        //this.ignoreBackdropClick = false;
    }

    Modal.prototype.hideScrollbar = function(scrollBarWidth){

        this.originBodyPaddingRight = parseInt((this.$body.css('padding-right') || 0),10);
        this.$body.css('padding-right',this.originBodyPaddingRight+scrollBarWidth);
    }

    Modal.prototype.resetScrollbar = function(){

        this.$body.css('padding-right',this.originBodyPaddingRight);
    }

    Modal.prototype.measureScrollbar = function(){

        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'bt-modal-measure-scrollbar';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);

        return scrollbarWidth;

    }

    function Plugin(setting,_relatedTarget){

        return this.each(function(){
            var $this = $(this);
            var data = $this.data("bt.modal");
            if(!data) $this.data("bt.modal",(data=new Modal(this,setting)));

            // execute the specified function
            if(typeof setting == 'string') data[setting](_relatedTarget);
            else if(setting.show)
                data.show(_relatedTarget);
        });
    }

    $.fn.modal = Plugin;

    // MODAL   AUTO-INITd
    // 为了兼容 Bolt 框架，顶层事件监听，我们采用 $(document.body) 而非 $(document)
    // 是因为：采用 $(document) 监听的事件无法再 Bolt 框架中多模块之间共用。
    $(document.body).on('click.bt.modal.auto-init','[data-toggle="modal"]',function(e){

        var $this   = $(this)
        var href    = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7

        var option = $target.data('bt.modal') ? 'toggle': $.extend({show:true},$target.data(),$this.data());// $target.data() 返回 $target 元素上所有通过 data 保存的数据

        if ($this.is('a')) e.preventDefault();

        Plugin.call($target, option, this);
    });

})(jQuery);

'use strict';

(function($){

    var defaultOptions = {
        ROLL_TIME:600 // 在有数据情况下，多少毫秒滚动一次
    };

	var RollList = function(element,options){

        this.options = defaultOptions;
        this._setOptions(options);
        this.$element = $(element);
        this.$list = $(".bt-roll-list",this.$element);
        this.$items = $(".item.active",this.$list);

        this.$element.css({
            height:this.$list.height()+"px"
        })

        this.hideNumber = this.$list.find(".item").length - this.$items.length;

        this.interval && clearInterval(this.interval);
        this.interval = setInterval(this._roll.bind(this),this.options.ROLL_TIME);
    }

    /*
    * fadeIn 一个新item ，
    * 并在动画结束后，删除一个老item
    * */
    RollList.prototype._roll = function(){

        if( 0 >= this.hideNumber ){
            clearInterval(this.interval);
            this.interval = null;
            return;
        }

        var $activeItem = this.$list.find(".item.active");

        var $next = $(this.$list.find(".item")[--this.hideNumber]);
        $next.slideDown("slow",function(){
            $next.addClass("active");
            this.$list.find(".item.active").last().remove();
        }.bind(this));
    }

    /*
    * 借用 fragment 一次性添加多个 item
    * 当无循环任务时，启动循环任务
    * */
    RollList.prototype.addItem = function(data){

        var fragment = document.createDocumentFragment()
            ,$fragment = $(fragment)
            ,newNode;
        data.forEach(function(item){
            newNode = document.createElement("li");
            newNode.appendChild(document.createTextNode(item));
            newNode.className = "item";
            $fragment.prepend(newNode);
        })

        this.$list.prepend(fragment);

        this.hideNumber += data.length;
        this.interval || (this.hideNumber>0) && (this._roll(),this.interval = setInterval(this._roll.bind(this),this.options.ROLL_TIME))
    }

    RollList.prototype._setOptions = function(options){

        this.options = $.extend({},this.options,options);
    }

	function Plugin(options){
        this.each(function(){
           var $this = $(this);
            var data = $(this).data("bt-roll-list");
            if(!data){
                $this.data("bt-roll-list",(data = new RollList(this,options)));
            }
        });
	}

	$.fn.RollList = Plugin;

    //$.fn.RollList.default = defaultOptions;

})(jQuery);
/**
 * Created by Administrator on 2016/3/13.
 */
'use strict';

(function($){

    var Slider = function(element,setting){

        this.options = $.extend({},Slider.defaults,setting);

        this.$element = $(element);
        this.$content = $(".bt-slider-content",this.$element);
        this.$items = $(".bt-slider-item",this.$content);
        this.$navs = $(".bt-slider-nav",this.$element).children();

        this.index = 0;  // 当前展示 page 原始序号
        this.len = this.$items.length;
        this.sliding = false;

        this.interval = this.autoPlay();

        var reg = window.navigator.userAgent.match(/MSIE\s(\d)/);
        if(reg){
            this.isIE = true;
            this.ieV = reg[1];
        }

        if(this.isIE && this.ieV <9){
            this.$navs.css({
                "background-color":"white"
            });
            console.log("yes");
        }

        this.$navs.on("click",function(e){

            this.$items.finish();

            var index = $(e.target).data("slide-to");
            if(index <this.index)
                return this.slide('prev',$(this.$items.get(index)));
            else if(index > this.index)
                return this.slide('next',$(this.$items.get(index)));
        }.bind(this));

        this.$element.on("mouseenter",function(e){
            this.interval && clearInterval(this.interval);
        }.bind(this));

        this.$element.on("mouseleave",function(e){
            this.interval = this.autoPlay();
        }.bind(this));
    };

    Slider.defaults = {
        interval:3000
    }

    Slider.prototype.autoPlay = function(){

        this.interval && clearInterval(this.interval);

        return setInterval(this.next.bind(this),this.options.interval);
    }

    Slider.prototype.next = function(){

       if(this.sliding) return
        return this.slide("next");
    }

    Slider.prototype.right = function(){

        if(this.sliding) return
        return this.slide("prev");
    }

    Slider.prototype.slide = function(type,node){

        var $active =  $(".bt-slider-item.active",this.$content)
            ,$next = null
            ,direction = type == 'next' ? 'left' : "right";


        $next = node || this.getNextNode(type,$active);

        if(!$next.length){
            console.error("slider 获取下一页内容失败！")
            return;
        }

        this.sliding = true;

        $next.addClass(type);
        $next[0].offsetWidth; // 因为前后紧跟着设置了两个状态，浏览器为了节约性能会默认最后一个状态，从而导致渐变失败，所以这里调用 offsetWidth 隔开两个状态，从而达到强制设置的效果。
        $active.addClass(direction);
        $next.addClass(direction);

        this._switchActiveState($active,$next,type,direction);

    }


    Slider.prototype._switchActiveState = function($active,$next,type,direction){

        if(!this.isIE || this.ieV>=9){
            var num=0;
            var interval = setInterval(function(){
                    num++;
                if(!$active.is(":animated") &&  num %2==0){
                    clearInterval(interval);
                    $active.removeClass(['active',direction].join(" "));
                    $next.removeClass([type,direction].join(" "))
                        .addClass("active");
                    this.index = this.getNodeIndex($next);
                    this.$navs.removeClass("active");
                    $(this.$navs.get(this.index)).addClass("active");
                    this.sliding = false;
                }
            }.bind(this),300);
        }
        else{
            $active.removeClass(['active',direction].join(" "));
            $next.removeClass([type,direction].join(" "))
                .addClass("active");
            this.index = this.getNodeIndex($next);
            this.$navs.removeClass("active");
            $(this.$navs.get(this.index)).addClass("active");
            this.sliding = false;
        }

    }

    Slider.prototype.getNodeIndex = function($next){

        this.$items = $next.parent().children('.bt-slider-item');
        return this.$items.index($next);
    }

    Slider.prototype.getNextNode = function(type,$active){

        var $next = type == 'next' ? $active.next() : $active.prev();

        if(!$next.length && this.index == this.len-1){
            $next = $(this.$items[0]);
        }
        else if(!$next.length && this.index == 0){
            $next = $(this.$items[this.len-1]);
        }

        return $next;
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