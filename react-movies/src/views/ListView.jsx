import React from 'react';
import { UI } from 'touchstonejs';
import { connect } from 'redux/react';

import Footerbar from 'components/Footerbar';
import MovieList from 'components/MovieList';

import './View.less';

@connect(state => ({
  savedMovies: state.savedMovies,
}))
export default class ListView {
  render() {
    let { savedMovies } = this.props;
    return (
      <UI.View>
        <UI.Headerbar type="default" label="Saved Movies"/>
        <UI.ViewContent grow scrollable className="View-viewContent">
          <div className="View-scroller">
            {savedMovies.saved.length > 0 ?
              <div className="panel panel--first">
                <MovieList movies={savedMovies.saved} goBackTo="list" />
              </div> :
              <div className="View-centeredText">
                No Saved Movies
              </div>
            }
          </div>
        </UI.ViewContent>
        <Footerbar />
      </UI.View>
    );
  }
}