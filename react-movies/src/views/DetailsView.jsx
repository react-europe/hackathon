import React from 'react';
import { UI } from 'touchstonejs';
import { connect } from 'redux/react';

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
        <UI.ViewContent grow scrollable className="DetailsView-content">
          <div className="DetailsView-left">
            <img src={getImageUrl(movie.poster_path)} />
          </div>
          <div className="DetailsView-right">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </UI.ViewContent>
        <Footerbar />
      </UI.View>
    );
  }
}