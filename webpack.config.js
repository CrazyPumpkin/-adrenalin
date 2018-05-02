var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),

    HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),

    svgoConfig = JSON.stringify({
        plugins: [
            {
                removeTitle: true
            }, {
                convertColors: {
                    shorthex: false
                }
            }, {
                convertPathData: false
            }
        ]
    });

module.exports = {

  entry: "./src/js",
  output: {
    path: __dirname + '/dist/',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    // preLoaders: [
    //     { test: /\.js?$/, loader: 'eslint', exclude: /node_modules/ }
    // ],
    loaders: [
      {
        exclude: 'node_modules',
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
          test: /\.(css|sass|scss)$/,
          loader: ExtractTextPlugin.extract('css-loader!sass-loader', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        loader: 'file-loader?name=/img/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader!json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules', './src/js'],
    alias: {
      app: '/src/js',
      Components: './src/js/components'
    },
    root: [
      path.resolve('./src/js/components'),
    ]
  },
  // eslint: {
  //     failOnWarning: false,
  //     failOnError: false
  // },
  postcss: [
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-assets'),
    require('postcss-color-function'),
    require('postcss-short-position'),
    require('postcss-short-size'),
    require('postcss-short-spacing'),
    require('postcss-short-text'),
    require('postcss-zindex'),
    require('postcss-fixes'),
    require('postcss-sorting'),
    require('autoprefixer'),
    require('stylefmt')
  ],
  plugins: [
  	HtmlWebpackPluginConfig,
    new ExtractTextPlugin("bundle.css", { allChunks: true })
  ]
};
