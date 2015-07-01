import React from 'react';
import Tappable from 'react-tappable';
import { UI, Link } from 'touchstonejs';
import moment from 'moment';

import { getImageUrl } from 'utils';

import './MovieList.less';

const LEFT_MOUSE_BUTTON = 0;

const MovieListItem = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  render() {
    let { movie, goBackTo } = this.props;
    let { active } = this.state;

    return (
      <Link
        className="MovieListItem list-item is-tappable"
        to="details"
        viewTransition="show-from-right"
        params={{ movie, goBackTo }}
        component="div"
      >
        <div
          className="MovieListItem-poster"
          style={{
            backgroundImage: `url(${getImageUrl(movie.poster_path)})`,
          }}
        >
          <div className="MovieListItem-availabilityIndicator">
            {
              movie.isLoadingDVDRelease ?
                <div className="MovieListItem-availabilityLoading loading-button-icon" /> :
              movie.hasDVDReleaseError ?
                <div className="MovieListItem-availabilityError ion-ios-close" /> :
              movie.dvdRelease ?
                (
                  new Date(movie.dvdRelease) < new Date() ?
                    <div className="MovieListItem-availabilityOk ion-ios-checkmark" /> :
                    <div className="MovieListItem-availabilityNotOk ion-ios-clock" />
                ) :
                null
            }
          </div>
        </div>
        <div className="MovieListItem-details">
          <div className="MovieListItem-title">
            {movie.title}
          </div>
          <div className="MovieListItem-theaterRelease">
            Theater release: {moment(movie.release_date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
          </div>
          <div className="MovieListItem-releaseDate">
            DVD release: {
              movie.dvdRelease === 'N/A' ?
                'N/A' :
                moment(movie.dvdRelease, 'DD MMM YYYY').format('MMMM Do YYYY')
            }
          </div>
        </div>
      </Link>
    );
  },
});

export default React.createClass({
  render() {
    let { movies, goBackTo, onLoadMore } = this.props;
    return (
      <div className="MovieList">
        {movies.map((movie, movieIdx) =>
          <MovieListItem
            key={movieIdx} // Not using id since the API sometimes returns duplicates
            goBackTo={goBackTo}
            movie={movie}
          />
        )}
      </div>
    );
  },
});