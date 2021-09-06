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
    path: path.resolve(__dirname, 'public'),
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
