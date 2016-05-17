/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');


module.exports = {
    devtool:'source-map',
    entry:path.join(__dirname,'modules/index'),
    output:{
        path:'dist',
        filename:'bundle.js',
        publicPath:'/static/'
    },
    plugins: process.env.NODE_ENV == 'development'?[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module:{
        loaders:[
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    }
}