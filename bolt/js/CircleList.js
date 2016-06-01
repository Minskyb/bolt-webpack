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