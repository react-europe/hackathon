module.exports = function(gulp, $, config) {
  var preLoadedIncludedModules = [[config.contentBase]];

  preLoadedIncludedModules.push(config.projectDependenciesPaths);
  preLoadedIncludedModules = preLoadedIncludedModules.reduce(Function.prototype.apply.bind(Array.prototype.concat)); // flatten the array

  gulp.task('webpack-dev-server', function () {
    if (!(config.entryPoint.indexOf("js") > -1) || config.entryPoint === '') {
      console.log('ERROR: Add entrypoint to package.json');
      return;
    }
    var serverConfig = {
      entry: [
        'webpack-dev-server/client?' + config.publicPath,
        'webpack/hot/only-dev-server',
        config.entryPointRelative
      ],
      output: {
        path: __dirname,
        publicPath: './',
        filename: '[name].js'
      },
      devServer: true,
      hotComponents: true,
      devtool: "eval",
      debug: true,
      plugins: [
        new $.webpack.HotModuleReplacementPlugin(),
        new $.webpack.NoErrorsPlugin()
      ],
      resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules']
      },
      resolveLoader: {
        modulesDirectories: ['node_modules']
      },
      module: {
        preLoaders: [{
          test: [/\.jsx$/, /\.js$/],
          include: preLoadedIncludedModules,
          loaders: ['react-hot', 'babel-loader?optional[]=runtime']
        }],
        loaders: [{
          test: /\.scss$/,
          loader: 'style!css!autoprefixer-loader!sass'
        }, {
          test: /\.jpg$/,
          loader: "file-loader?prefix=assets/images/"
        }, {
          test: /\.png$/,
          loader: "file-loader?prefix=assets/images/"
        }, {
          test: /\.svg$/,
          loader: "file-loader?prefix=assets/images/"
        }, {
          test: /\.ico$/,
          loader: "file-loader?prefix=assets/images/"
        }, {
          test: /\.eot$/,
          loader: "file-loader?prefix=assets/fonts/"
        }, {
          test: /\.ttf$/,
          loader: "file-loader?prefix=assets/fonts/"
        }, {
          test: /\.woff$/,
          loader: "file-loader?prefix=assets/fonts/"
        }, {
          test: /\.json$/,
          loader: "json-loader"
        }]
      }
    };

    // Start a webpack-dev-server
    new $.webpackDevServer($.webpack(serverConfig), {
      contentBase: config.contentBase,
      stats: {
        colors: true
      }
    }).listen(config.serverPort, '0.0.0.0', function (err) {
      if (err) throw new $.gulpUtil.PluginError('webpack-dev-server', err);
      $.gulpUtil.log('[webpack-dev-server]', config.publicPath + '/');
    });

    gulp.start('open');
  });
};
