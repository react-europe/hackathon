module.exports = function(gulp, $, config) {
  var preLoadedIncludedModules = [[config.contentBase]];

  preLoadedIncludedModules.push(config.projectDependenciesPaths);

  preLoadedIncludedModules = preLoadedIncludedModules.reduce(Function.prototype.apply.bind(Array.prototype.concat)); // flatten the array

  if (!(config.entryPoint.indexOf("js") > -1) || config.entryPoint === '') {
    console.log('ERROR: Add entrypoint to package.json');
    return;
  }
  var webpackConfig = {
    entry: {
      main: config.entryPoint
      // fetch: config.baseDir + '/node_modules/vl_core/whatwg-fetch/fetch.js'
    },
    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    output: {
      path: config.output,
      filename: '[name].js'
    },
    module: {
      preLoaders: [{
        test: [/\.jsx$/, /\.js$/],
        include: preLoadedIncludedModules,
        loaders: ['babel-loader?optional[]=runtime']
      }],
      loaders: [{
        test: /\.scss$/,
        include: preLoadedIncludedModules,
        loader: $.extractTextWebpackPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
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
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules']
    },
    resolveLoader: {
      modulesDirectories: ['node_modules']
    },

    plugins: [
      new $.webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
      new $.webpack.optimize.DedupePlugin(),
      new $.webpack.optimize.UglifyJsPlugin(),
      new $.extractTextWebpackPlugin('[name].css')
    ]
  };

  gulp.task('webpack:prod', function (callback) {

    // run webpack
    $.webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new $.gulpUtil.PluginError('webpack:prod', err);
      }
      $.gulpUtil.log('[webpack:prod]', stats.toString({
        colors: true
      }));
      callback();
    });
  });
};
