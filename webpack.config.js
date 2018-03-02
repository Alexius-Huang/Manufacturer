var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/manufacturer.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'manufacturer.bundle.js',
    libraryTarget: 'var',
    library: 'Manufacturer'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
};
