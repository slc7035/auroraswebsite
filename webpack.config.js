var path = require('path');
var webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: ['./public/js/components/Main.jsx','./public/stylesheets/reset.scss'],
  output: {
    path: __dirname + '/public/build',
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ["env", {
              "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
              }
            }], 
            'react', 
            'stage-0'
          ]
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=lib/fonts/Lavanderia/[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap'
      }
    ]
  },
  // plugins: [new BundleAnalyzerPlugin()]
};
