var path = require('path');
var webpack = require('webpack');

console.log("Using webpack.dev.config.js");

var config = {

  // Gives you sourcemaps without slowing down rebundling
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION__: 'false',
    }),
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
        /*loader: 'style!css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]sass?outputStyle=expanded&sourceMap'*/
        loaders: ['style', 'css', 'sass']
      }]

  }
};

module.exports = config;
