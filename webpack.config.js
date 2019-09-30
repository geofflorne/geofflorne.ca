var path = require('path');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js'
  }
};
