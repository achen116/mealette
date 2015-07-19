module.exports = {
  entry: "./js/carousel/index.js",
  output: {
    path: __dirname,
    filename: "./js/carousel-bundle.js"
  },
  module: {
    loaders: [
    {
      test: /\.jsx$/,
      loader: 'babel'
    }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
