import * as ActionTypes from 'constants/ActionTypes';

const INITIAL_STATE = {
  saved: [],
};

export default function savedMoviesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ActionTypes.ADD_SAVED_MOVIE:
    return {
      ...state,
      saved: state.saved.concat([action.movie]),
    };

  case ActionTypes.REMOVE_SAVED_MOVIE:
    return {
      ...state,
      saved: state.saved.filter(movie => movie.id !== action.movie.id),
    };

  default:
    return state;
  }
}