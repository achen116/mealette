module.exports = {
  entry: "./js/enable_location.jsx",
  output: {
    path: __dirname,
    filename: "./js/bundle.js"
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
