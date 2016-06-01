
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