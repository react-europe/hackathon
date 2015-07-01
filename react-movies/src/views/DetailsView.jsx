import React from 'react';
import { UI } from 'touchstonejs';
import { connect } from 'redux/react';
import moment from 'moment';

import { getImageUrl } from 'utils';
import { addSavedMovie, removeSavedMovie } from 'actions/savedMoviesActions';
import Footerbar from 'components/Footerbar';

import './DetailsView.less';

@connect(state => ({
  savedMovies: state.savedMovies,
}))
export default class DetailsView {
  render() {
    let { movie, savedMovies, dispatch, goBackTo } = this.props;

    let isSaved = savedMovies.saved.some(otherMovie => otherMovie.id === movie.id);

    return (
      <UI.View>
        <UI.Headerbar type="default" label={movie.title}>
          <UI.HeaderbarButton
            showView={goBackTo}
            viewTransition="reveal-from-right"
            icon="ion-chevron-left"
            label="Back"
          />
          <UI.HeaderbarButton
            className="right"
            icon={isSaved ? 'ion-ios-star' : 'ion-ios-star-outline'}
            label={isSaved ? 'Saved' : 'Save'}
            onTap={() => dispatch(isSaved ? removeSavedMovie(movie) : addSavedMovie(movie))}
          />
        </UI.Headerbar>
        <UI.ViewContent grow scrollable className="DetailsView-content ">
          <div
            className="DetailsView-cover"
            style={{ backgroundImage: `url(${getImageUrl(movie.poster_path, 1280)})` }}
          >
            <div className="DetailsView-details">
              <div className="DetailsView-title">
                <h3>{movie.title}</h3>
                <div className="DetailsView-availabilityIndicator">
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
              <p>{movie.overview}</p>
              <div className="DetailsView-releases">
                <div className="DetailsView-theaterRelease">
                  Theater release: {moment(movie.release_date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
                </div>
                <div className="DetailsView-dvdRelease">
                  DVD release: {
                    movie.dvdRelease === 'N/A' ?
                      'N/A' :
                      moment(movie.dvdRelease, 'DD MMM YYYY').format('MMMM Do YYYY')
                  }
                </div>
              </div>
            </div>
          </div>
        </UI.ViewContent>
        <Footerbar />
      </UI.View>
    );
  }
}