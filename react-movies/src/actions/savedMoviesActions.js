import * as ActionTypes from 'constants/ActionTypes';

export function addSavedMovie(movie) {
  return {
    type: ActionTypes.ADD_SAVED_MOVIE,
    movie,
  };
}

export function removeSavedMovie(movie) {
  return {
    type: ActionTypes.REMOVE_SAVED_MOVIE,
    movie,
  };
}
