import { debounce } from 'lodash';

import { searchMovie, getOMDBMovie } from 'db';
import * as ActionTypes from 'constants/ActionTypes';

const FETCH_MOVIES_TIMEOUT = 500;

export function fetchMovies({ query, page, quality }) {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_MOVIES,
      query,
      page,
    });

    searchMovie(query, { page }).then(response => {
      dispatch({
        type: ActionTypes.FETCH_MOVIES_SUCCESS,
        query,
        response,
      });

      response.results.forEach(movie => {
        dispatch({
          type: ActionTypes.FETCH_MOVIE_DVD_RELEASE,
          movie,
        });

        getOMDBMovie(movie.title)
          .then(result => {
            dispatch({
              type: ActionTypes.FETCH_MOVIE_DVD_RELEASE_SUCCESS,
              movie,
              release: result.DVD,
            });
          })
          .catch(error => {
            dispatch({
              type: ActionTypes.FETCH_MOVIE_DVD_RELEASE_FAILURE,
              movie,
              error,
            });
          });
      });
    });
  };
}

export function updateSearchQuery(newQuery) {
  return {
    type: ActionTypes.UPDATE_SEARCH_QUERY,
    query: newQuery,
  };
}

export function resetSearchQuery(newQuery) {
  return {
    type: ActionTypes.RESET_SEARCH_QUERY,
  };
}
