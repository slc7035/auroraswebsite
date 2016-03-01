var path = require('path');
var webpack = require('webpack');

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
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap'
      }
    ]
  },
};
