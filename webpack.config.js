let path = require('path');

module.exports = {
  entry: {
    app: ['./src/public/js/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/public/dist'),
  },
  watch: true,
}
