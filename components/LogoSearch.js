/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./LogoSearch.html');
var BC = require('../abstract_class/abstract.component');

require('../less/common.less');
require('../less/hGroup.less');
require('../less/logoSearch.less');


var LogoSearch = function(options){
    BC.call(this,options);
}

LogoSearch.prototype = $.extend({},LogoSearch.prototype,BC.prototype);

LogoSearch.prototype.constructor = LogoSearch;

LogoSearch.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;

    this.events = [
        {
            eventTarget:'.js-search',
            type:'click',
            callback:this._searchHandler.bind(this)
        }
    ];

    this.searchType = "sale";
}

LogoSearch.prototype._searchHandler = function(e){

    var classList = e.target.classList;
    if(classList.contains('search-type')){
        this._changeSearchType(e);
    }
    else if(classList.contains('search-button')){
        this._searchClicked();
    }
}

LogoSearch.prototype._changeSearchType = function(e){

    var $collection = $('.search-type',this.$element),
        $target = $(e.target);

    $collection.removeClass("active");
    $target.addClass("active");

    this.searchType = $target.data("search-type");

}

LogoSearch.prototype._searchClicked = function(){

    var searchKeyWords = "";
    searchKeyWords = $(".search-input",this.$element).val();

    console.log("search key words:" + searchKeyWords);
}

module.exports = LogoSearch;