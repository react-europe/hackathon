import { resolve } from 'path';

import webpack from 'webpack';
import ReactStylePlugin from 'react-style-webpack-plugin';

export default function makeWebpackConfig(opts) {
  let __DEV__ = opts.env !== 'production';

  return {
    devtool: 'inline-eval-source-map',
    entry: (opts.hot ? [
      `webpack-dev-server/client?${opts.output.publicPath}`,
      'webpack/hot/only-dev-server',
    ] : []).concat(opts.entry),
    output: opts.output,
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        react: resolve(__dirname, '../node_modules/react'),
      },
      root: [resolve(__dirname, '../src')],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: (
            (opts.hot ? 'react-hot!' : '') +
            'babel?stage=0'
          ),
          include: resolve(__dirname, '../src'),
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'file',
        },
        {
          test: /\.(ttf|eot|woff|svg)($|\?)/,
          loader: 'file',
        },
        {
          test: /\.less$/,
          loader: 'style!css!autoprefixer!less',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(opts.env),
        },
        __DEV__: JSON.stringify(__DEV__),
        __CORDOVA__: "typeof cordova !== 'undefined'",
      }),
      ...(opts.hot ? [new webpack.HotModuleReplacementPlugin()] : []),
      ...(__DEV__ ? [] : [new webpack.optimize.UglifyJsPlugin()]),
      ...(opts.plugins || []),
    ],
  };
}
