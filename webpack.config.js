var webpack = require('webpack');
module.exports = {
    entry: './demo/complier.js',
    //入口文件输出配置
    output: './demo/bundle.js',
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};