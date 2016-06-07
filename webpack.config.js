/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
*
* 注意：兼容模式调试时，请关闭热启动
*
* */
module.exports = {
    devtool:'source-map',
    entry:{
        hot: 'webpack/hot/only-dev-server', // 关闭这里
        index:path.join(__dirname,'./src/entry/index'),
        loginRegister:path.join(__dirname,'./src/entry/loginRegister')
    },
    output:{
        path:'dist',
        filename:'[name].js',
        publicPath:'/static/'
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 关闭这里
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css")
    ],
    externals:{
        "jquery":"jQuery"
    },
    module:{
        loaders:[
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test:/\.less$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!'+
                    'less?sourceMap'
                )
            },
            //{
            //    test:/\.less$/,
            //    loaders:['style','css','less']
            //},
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    },
    devServer:{
        hot:true // 关闭这里
    }
}