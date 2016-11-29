module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: `/dist/`
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  devServer: {
    inline: true
  }
};
