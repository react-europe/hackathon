/**
 * Routes.
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
import Router from 'react-router';
const { Route, DefaultRoute } = Router;
import GameApp from './components/GameApp/GameApp';

const routes = (
  <Route name="app" path="/">
    <DefaultRoute handler={GameApp} />
  </Route>
);

export default routes;
