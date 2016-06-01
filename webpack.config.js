/**
 * Created by Punk.Li on 2016/5/14.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool:'source-map',
    entry:{
        hot: 'webpack/hot/only-dev-server',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
            //{
            //    test:/\.less$/,
            //    loader: ExtractTextPlugin.extract(
            //        // activate source maps via loader query
            //        'css?sourceMap!' +
            //        'less?sourceMap'
            //    )
            //},
            {
                test:/\.less$/,
                loaders:['style','css','less']
            },
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    },
    devServer:{
        hot:true
    }
}