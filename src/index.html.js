import React from 'react';

export default function createHTML(stats) {
  stats = stats.toJson();
  let main = stats.assetsByChunkName.main;
  return (
    '<!DOCTYPE html>' +
    React.renderToString(
      <html>
        <head>
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <title>Manga Reader</title>
        </head>
        <body>
          <div id="container" />
          <script type="text/javascript" src="cordova.js" />
          <script
            type="text/javascript"
            src={stats.publicPath + (Array.isArray(main) ? main[0] : main)}
          />
        </body>
      </html>
    )
  );
}
