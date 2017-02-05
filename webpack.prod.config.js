var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

console.log("Using webpack.prod.config.js");

var config = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __PRODUCTION__: 'true',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        //i18n LOADER
        test: /\.json$/i,
        loader: 'file-loader?name=i18n/[name].[ext]'
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /(\.scss)|(\.css)$/,
        loaders: ['style', 'css', 'sass']
      }]

  }
};

module.exports = config;
