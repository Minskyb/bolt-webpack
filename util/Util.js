/**
 * Created by ASUS on 2016/5/20.
 */

var $ = require('jquery');

$.extend({
    BT:{
        interatorTemplate:function(options){
            requirejs(['underscore',options.template],function(_,template){

                var $wrapper = $(options.index);

                var data = "object" == typeof options.data ? options.data : JSON.parse(options.data);
                var $element = $(_.template(template)(data));

                $element.insertBefore($wrapper);
                $wrapper.remove();

            });
        }
    }
})

module.exports = obj;