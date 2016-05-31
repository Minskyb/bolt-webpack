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
        //this.interval = setInterval(this._circle.bind(this),this.options.CIRCLE_TIME);
    }

    CircleList.prototype._setOptions = function(options){
        this.options = $.extend({},this.options,options);
    }

    CircleList.prototype._circle = function(){

        var $next = this.$list.find(".item.hide").first().removeClass("hide");
        this.$list.animate({
            top:-this.itemHeight+"px"
        },this.options.CIRCLE_TIME,'linear',function(){
            this.$list.find(".item").first().appendTo(this.$list).addClass("hide");
            this.$list.css({
                top:0
            });
        }.bind(this))
    }

    CircleList.prototype.pause = function(){
        clearInterval(this.interval);
        this.interval = null;
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
    $.fn.CircleList.default = defaultOptions;

})(jQuery)