var path = require('path');

module.exports = {
  entry: './src/web/js/app.jsx',
  output: {
    path: path.resolve(__dirname, 'src', 'web', 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true
  }
};
