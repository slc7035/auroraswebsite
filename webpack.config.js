var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: ['./public/javascripts/components/Main.jsx','./public/stylesheets/reset.scss'],
  output: {
    path: __dirname + '/public/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/lib/fonts/[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap'
      }
    ]
  },
  // plugins: [new BundleAnalyzerPlugin()]
};
