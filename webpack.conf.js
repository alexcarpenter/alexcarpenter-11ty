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

  plugins: [ ],

  context: path.join(__dirname, "src"),
  entry: {
    app: './javascripts/app'
  },
  output: {
    path: path.join(__dirname, "dist/assets/js"),
    publicPath: "./dist/assets/js/",
    filename: "[name].js"
  }
}
