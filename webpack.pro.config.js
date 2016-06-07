/**
 * Created by ASUS on 2016/5/18.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    //devtool:'source-map',
    entry:{
        index:path.join(__dirname,'./src/entry/index'),
        loginRegister:path.join(__dirname,'./src/entry/loginRegister')
    },
    output:{
        path:'dist/static',
        filename:'[name].js',
        publicPath:'/static/'
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name].css"),
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
                loader: ExtractTextPlugin.extract(['css','less'])
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
    }
}