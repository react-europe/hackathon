import { writeFileSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import makeWebpackConfig from './makeWebpackConfig';
import createHTML from '../src/index.html.js';

const PORT = parseInt(process.env.PORT) || 3000;

let publicPath = `http://localhost:${PORT}/`;

const r = p => resolve(__dirname, '..', ...p);

let config = makeWebpackConfig({
  hot: true,
  env: 'development',
  entry: r`src/index.js`,
  output: {
    publicPath,
    path: r`cordova/www`,
    filename: 'bundle.js',
  },
});

let compiler = webpack(config);

compiler.plugin('done', stats => {
  let html = createHTML(stats);
  writeFileSync(r`cordova/www/index.html`, html);
});

let server = new WebpackDevServer(compiler, {
  hot: true,
  stats: {
    colors: true,
  },
});
server.listen(PORT);
