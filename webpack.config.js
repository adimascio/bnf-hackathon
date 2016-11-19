var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/', //inline mode for
                                                        //webpack-dev-server
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/js/main.js'
  ],
  devServer: { 
    historyApiFallback: true,
  }, 
  module: {
    loaders: [
      //{ test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
      { 
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //loaders: ['react-hot', 'babel']
        loader: ['babel'],
        query: {
          'presets': ['react', 'es2015'],
          'plugins': ['transform-object-rest-spread'], //, 'import-asserts']
        }
      }
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "theme/_config.scss";',
    includePaths: [path.resolve(__dirname, './src')]
  },
  
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new TransferWebpackPlugin([
        { from: 'img', to: 'img' }
    ], path.join(__dirname, 'src'))
  ],
  resolve: {
    extensions: ['', '.scss', '.js'],
    alias: {
      'sparql-connect': '/Users/jb/Documents/noknot/modernstats/sparql-connect/'
    }
  },
  output: {
    path: __dirname + '/dist',
    filename: './js/bundle.js'
  }
}