/**
 * Main component.
 *
 * @author Rob Gietema
 * @licstart  The following is the entire license notice for the JavaScript
 *            code in this page.
 *
 * Copyright (C) 2015 Rob Gietema
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 * @version 0.0.1
 */

import React from 'react';
import router from './router';

import './assets/sass/normalize.scss';

router.run(Handler => {
  React.render(<Handler />, document.getElementById('app'));
});
