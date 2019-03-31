const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
    './src/assets/scss/app.scss'
  ],
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Or array of paths
              resources: [
                './src/assets/scss/modules/_vars.scss'
              ]
            },
          }]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './img/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './img/[name].[ext]'
          }
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/app.min.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/img',
        to: './img'
      },
      {
        from: './src/assets/fonts',
        to: './fonts'
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  resolve: {
    alias: {
      atoms: path.resolve(__dirname, './src/ui/atoms'),
      molecules: path.resolve(__dirname, './src/ui/molecules'),
      organisms: path.resolve(__dirname, './src/ui/organisms'),
      templates: path.resolve(__dirname, './src/ui/templates'),
      features: path.resolve(__dirname, './src/features'),
      utils: path.resolve(__dirname, './src/utils'),
      data: path.resolve(__dirname, './src/data'),
      HOC: path.resolve(__dirname, './src/HOC'),
      hooks: path.resolve(__dirname, './src/hooks'),
      context: path.resolve(__dirname, './src/context'),
    }
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    overlay: true
  }
};
