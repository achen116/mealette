module.exports = {
  entry: "./carousel/index.js",
  output: {
    path: __dirname,
    filename: "carousel-bundle.js"
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
