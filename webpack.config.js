const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: ['./src/index.jsx'],

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /(\.js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  }

}
