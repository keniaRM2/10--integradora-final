const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Otras configuraciones de webpack existentes

  resolve: {
    fallback: {
      util: require.resolve('util/'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      fs: false, // Puedes desactivar fs si no es necesario
      'browserify-fs': require.resolve('browserify-fs'),
      'pg-hstore': require.resolve('pg-hstore'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream'),
      querystring: require.resolve('querystring'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify'),
      https: require.resolve('https-browserify'),
    },
  },

  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // Indica que la compilación es para el entorno de Node.js
  externals: [nodeExternals()],
};