var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/manufacturer.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'manufacturer.bundle.js',
    library: 'Manufacturer',
    libraryExport: 'default',
    libraryTarget: 'commonjs2'
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
