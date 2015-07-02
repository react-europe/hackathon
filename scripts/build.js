import { writeFileSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';

import makeWebpackConfig from './makeWebpackConfig';
import createHTML from '../src/index.html.js';

let publicPath = `./`;

const r = p => resolve(__dirname, '..', ...p);

let config = makeWebpackConfig({
  entry: r`src/index.js`,
  env: 'production',
  output: {
    publicPath,
    path: r`cordova/www`,
    filename: 'bundle.js',
  },
});

webpack(config, (err, stats) => {
  console.log(stats.toString({ colors: true }));
  let html = createHTML(stats);
  writeFileSync(r`cordova/www/index.html`, html);
});
