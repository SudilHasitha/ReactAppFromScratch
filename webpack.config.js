const path = require('path');
const webpack = require('webpack');

module.exports ={
    // define entry point
    entry: './src/index.js',
    mode:'development',
    // transform es6 to regular js
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:/(node_modules)/,
                loader:'babel-loader',
                options: { presets:["@babel/env"]}
            },
            // allow to import css
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            }
        ]
    },
    // add resolve property
    resolve: { extensions:['*','.js','.jsx'] },
    // define output files
    output: {
        path: path.resolve(__dirname,'dist/'),
        publicPath:'/dist/',
        filename:'bundle.js'
    },
    // allow view the react application in the dev environment
    devServer: {
        contentBase:path.join(__dirname,'public/'),
        port:3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly:true 
    },
    plugins:[new webpack.HotModuleReplacementPlugin()]
};