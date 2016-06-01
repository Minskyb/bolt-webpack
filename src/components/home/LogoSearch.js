/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./LogoSearch.html');
var BC = require('../../abstract/component.js');

require('../../less/logoSearch.less');


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

    var $target = $(e.target);

    if($target.hasClass('search-type')){
        this._changeSearchType(e);
    }
    else if($target.hasClass('search-button')){
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

    window.location.href = "#/search?type="+window.btoa(encodeURI(this.searchType))+"&key="+window.btoa(encodeURI(searchKeyWords))
}

module.exports = LogoSearch;