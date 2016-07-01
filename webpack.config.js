/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var commonLib =  new webpack.optimize.CommonsChunkPlugin("commons.js");
var commonLib = new webpack.optimize.CommonsChunkPlugin({
	name:"commons",
	filename:'commons.js',
	minChunks:2,  // 被至少 2 个 chunks 引用才会被提炼出来。
	chunks:["index","loginRegister"]
})

/*
*
* 注意：兼容模式调试时，请关闭热启动
*
* */
module.exports = {
    devtool:'source-map',
    entry:{
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
	    commonLib,
	    new ExtractTextPlugin("[name].css",{
		    allChunks:true
	    })
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
            // {
            //    test:/\.less$/,
            //    loaders:['style','css','less']
            // },
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    },
    devServer:{
        hot:true  // 关闭这里
    }
}