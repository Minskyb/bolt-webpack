/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');

console.log(process.env.NODE_ENV);

module.exports = {
    /*正式环境不配置此项*/
    //devtool:'cheap-module-eval-source-map',
    entry:path.join(__dirname,'modules/HelloWorld'),
    output:{
        path:'dist',
        filename:'bundle.js',
        publicPath:'/static/'
    },
    plugins:process.env.NODE_ENV == 'development' ? [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ]:[
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