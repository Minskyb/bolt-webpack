
'use strict';

(function($){

    var options = {
        MIN_COUNT:6
    };

	var RollList = function(element,options){

        this._setOptions(options);
        this.$element = $(element);
        this.$list = $(".bt-roll-list",this.$element);
        this.$items = $(".item.active",this.$list);

	    this.$element.css({
            height: this.$list.height()+"px",
            width: this.$list.width()+"px"
        });

        this.hideNumber = $(".item",this.$list).length - this.$items.length;
    }

    RollList.prototype.addItem = function(data){

        var fragment,item;
        data.forEach(function(item){
            item = document.createElement("li");
            item.appendChild(document.createTextNode("item"));
            item.addClass("item");
            fragment.appendChild("item");
        })

        this.$list.appendChild(fragment);
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

    $.fn.RollList.default = options;

})(jQuery);