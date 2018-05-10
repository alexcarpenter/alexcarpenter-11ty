const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')


module.exports = {
  input: 'src/assets/scripts/app.js',
  plugins: [
    resolve({
      browser: true,
      jsnext: true,
      main: true
    }),
    commonjs(),
    uglify()
  ],
  output: {
    file: 'www/assets/scripts/app.js',
    format: 'iife',
    sourcemap: false,
    name: 'app'
  }
}
