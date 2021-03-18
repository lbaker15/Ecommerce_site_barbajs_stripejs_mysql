const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
//https://sgom.es/posts/2018-01-18-multiple-routes-webpack/
module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve("assert/"),
      stream: require.resolve('stream-browserify'),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer/"),
      fs: require.resolve('fs.realpath/'),
      child_process: false,
      fsevents: false
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    contentBasePublicPath: '/app',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  entry: {
    main: './src/js/index.js',
    about: './src/js/about.js',
    signin: './src/js/signin.js',
    admin: './src/js/admin.js',
    cart: './src/js/cart.js',
    checkoutVerify: './src/js/checkoutVerify.js',
    barbaFunc: './src/js/barbaFunc.js',
    contact: './src/js/contact.js',
    load: './src/js/load.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/index.html'), // template file
      filename: 'index.html', // output file
      chunks: ['load', 'barbaFunc', 'main']
    }),
    new HtmlWebpackPlugin({
        title: 'webpack Boilerplate2',
        template: path.resolve(__dirname, './src/about.html'), // template file
        filename: 'about.html', // output file
        chunks: ['load', 'barbaFunc', 'about']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate3',
      template: path.resolve(__dirname, './src/signin.html'), // template file
      filename: 'signin.html', // output file
      chunks: ['load',  'signin', 'barbaFunc']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate4',
      template: path.resolve(__dirname, './src/admin.html'), // template file
      filename: 'admin.html', // output file
      chunks: ['load', 'admin', 'barbaFunc']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate5',
      template: path.resolve(__dirname, './src/cart.html'), // template file
      filename: 'cart.html', // output file
      chunks: ['load', 'cart', 'barbaFunc']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate6',
      template: path.resolve(__dirname, './src/checkoutVerify.html'), // template file
      filename: 'checkoutVerify.html', // output file
      chunks: ['load', 'checkoutVerify', 'barbaFunc']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate7',
      template: path.resolve(__dirname, './src/contact.html'), // template file
      filename: 'contact.html', // output file
      chunks: ['load', 'contact', 'barbaFunc']
    }),
    new CleanWebpackPlugin(),
    
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jpg|jpeg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'imagesNew',
          name: '[name].[ext]'
        },
      },
    ],
  },
};