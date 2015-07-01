import React, { addons } from 'react/addons';
import { createApp, UI } from 'touchstonejs';
import { createStore } from 'redux';
import { Provider } from 'redux/react';

import moviesReducer from 'reducers/moviesReducer';
import savedMoviesReducer from 'reducers/savedMoviesReducer';
import settingsReducer from 'reducers/settingsReducer';

import 'styles.less';

import ListView from 'views/ListView';
import SearchView from 'views/SearchView';
import DetailsView from 'views/DetailsView';

const store = createStore({
  movies: moviesReducer,
  savedMovies: savedMoviesReducer,
  settings: settingsReducer,
});

export default React.createClass({
  displayName: 'App',

  mixins: [createApp({
    list: ListView,
    search: SearchView,
    details: DetailsView,
  })],

  getInitialState() {
    return {
      currentView: 'list',
    };
  },

  render() {
    return (
      <Provider store={store}>
        {() =>
          <div
            className={__CORDOVA__ && 'is-native-app'}
          >
            <addons.CSSTransitionGroup
              transitionName={this.state.viewTransition.name}
              transitionEnter={this.state.viewTransition.in}
              transitionLeave={this.state.viewTransition.out}
              component="div"
            >
              {this.getCurrentView()}
            </addons.CSSTransitionGroup>
          </div>
        }
      </Provider>
    );
  },
});
