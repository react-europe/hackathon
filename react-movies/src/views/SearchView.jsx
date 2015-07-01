import React, { Component } from 'react';
import { UI } from 'touchstonejs';
import { debounce } from 'lodash';
import cx from 'classnames';
import Tappable from 'react-tappable';
import { connect } from 'redux/react';

import { updateSearchQuery, resetSearchQuery, fetchMovies } from 'actions/moviesActions';

import Footerbar from 'components/Footerbar';
import MovieList from 'components/MovieList';

import './View.less';
import './SearchView.less';

@connect(state => ({
  movies: state.movies,
  settings: state.settings,
}))
export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searching: false,
      results: null,
    };

    this._fetchMovies = debounce(this._fetchMovies.bind(this), 500);
    this._handleChange = this._handleChange.bind(this);
    this._fetchNextPage = this._fetchNextPage.bind(this);
    this._reset = this._reset.bind(this);
  }

  _fetchMovies(params) {
    let { dispatch } = this.props;
    dispatch(fetchMovies(params));
  }

  _handleChange(e) {
    let { dispatch, settings } = this.props;
    let newQuery = e.target.value;
    if (newQuery === '') {
      dispatch(resetSearchQuery());
    } else {
      dispatch(updateSearchQuery(e.target.value));
      this._fetchMovies({
        query: e.target.value,
        page: 1,
        quality: settings.quality,
      });
    }
  }

  _reset() {
    let { dispatch } = this.props;
    dispatch(resetSearchQuery());
  }

  _fetchNextPage() {
    let { dispatch, movies, settings } = this.props;

    this._fetchMovies({
      query: movies.searchQuery,
      page: movies.currentPage + 1,
      quality: settings.quality,
    });
  }

  render() {
    let { movies, dispatch } = this.props;

    return (
      <UI.View>
        <UI.Headerbar
          type="default"
          label="Search Movies"
        />
        <UI.Headerbar
          type="default"
          className="Headerbar-form Subheader"
        >
          <div className="Headerbar-form-field Headerbar-form-icon ion-ios7-search-strong">
            <input
              value={movies.searchQuery}
              onChange={this._handleChange}
              className="Headerbar-form-input"
              placeholder='Search movies...'
            />
            {movies.searchQuery.length > 0 &&
              <Tappable
                onTap={this._reset}
                className="Headerbar-form-clear ion-close-circled"
              />
            }
          </div>
        </UI.Headerbar>
        <UI.ViewContent
          grow
          scrollable
          className="View-viewContent"
        >
          {
            movies.loadingPage === 1 ?
              <div className="loading-spinner SearchView-spinner">
                <div
                  className="loading-spinner-indicator SearchView-spinnerIndicator"
                />
              </div> :
            movies.results ?
              movies.results.length > 0 ?
                <div className="View-scroller">
                  <div className="panel panel--first">
                    <MovieList
                      movies={movies.results}
                      goBackTo="search"
                    />
                  </div>
                  {movies.totalPages !== movies.currentPage ?
                    <UI.LoadingButton
                      onTap={this._fetchNextPage}
                      loading={movies.loadingPage > 1}
                      className="panel-button primary"
                      label="Load more"
                    /> :
                    <UI.LoadingButton
                      className="panel-button disabled"
                      label="No more results"
                    />
                  }
                </div> :
                <div className="View-centeredText">
                  No result
                </div> :
              <div className="View-centeredText">
                Enter a search query
              </div>
          }
        </UI.ViewContent>
        <Footerbar />
      </UI.View>
    );
  }
}

