/**
 * Created by ASUS on 2016/5/18.
 */
var webpack = require('webpack');
var path = require('path');


module.exports = {
    //devtool:'source-map',
    entry:{
        index:path.join(__dirname,'./src/entry/index'),
        log_reg:path.join(__dirname,'./src/entry/logReg')
    },
    output:{
        path:'dist/static',
        filename:'[name].js',
        publicPath:'/static/'
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
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
    }
}