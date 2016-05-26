/**
 * Created by ASUS on 2016/5/19.
 */



var self = {}

var _userInfo = {}

self.prototype.getUserName = function(){

    return _userInfo.username
}

self.prototype.identity = function(){

    return _userInfo.identity;
}

module.exports = self;