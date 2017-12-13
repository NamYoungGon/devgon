module.exports = {
  // define entry point
  entry: './app.js',

  // define output point
  output: {
    // path: __dirname + '/dist',
    path: __dirname,
    filename: 'web.js'
  },
  target: 'node'
}