const failPlugin = require('webpack-fail-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/dist`
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  devServer: {
    inline: true
  },
  plugins: [
    failPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env['NODE_ENV'])
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs'
    })
  ]
};
