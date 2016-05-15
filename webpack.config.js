/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool:'cheap-module-eval-source-map',
    entry:path.join(__dirname,'modules/HelloWorld'),
    output:{
        path:'dist',
        filename:'bundle.js',
        publicPath:'/static/'
    },
    module:{
        loaders:[
            {
                text:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    }
}