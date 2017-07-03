import webpack from "webpack";
import path from "path";

export default {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' ]
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    vendor: [
      'inert-polyfill'
    ],
    app: './javascripts/app'
  },
  output: {
    path: path.join(__dirname, "dist/assets/js"),
    publicPath: "./dist/assets/js/",
    filename: "[name].js"
  }
}
