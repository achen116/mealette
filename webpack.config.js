module.exports = {
  entry: "./js/components/Grid.jsx",
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
