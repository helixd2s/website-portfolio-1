// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')

console.log(__dirname);

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {  //If emitting file, the file path is
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {  //If emitting file, the file path is
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.pug$/, use: [ { loader: "simple-pug-loader", options: { pretty: true, }, }, ], },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require.resolve("sass"),
              sassOptions: {
                indentWidth: 2,
                includePaths: ["styles/lib"],
              },
            },
          },
        ],
      },
    ],
  },
  entry: './source/scripts/main.js',
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, './') + "/",
    filename: 'scripts/main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.pug',
      filename: 'index.html',
      minify: false
    }),
    new HtmlWebpackPugPlugin({
      adjustIndent: true
    })
  ]
};
