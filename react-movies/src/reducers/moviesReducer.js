import * as ActionTypes from 'constants/ActionTypes';

const INITIAL_STATE = {
  searchQuery: '',
  loadingPage: null,
  currentPage: null,
  totalPages: null,
  results: null,
};

const RESULTS_PER_PAGE = 20;

export default function moviesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ActionTypes.FETCH_MOVIES:
    return {
      ...state,
      loadingPage: action.page,
    };

  case ActionTypes.FETCH_MOVIES_SUCCESS:
    if (action.query !== state.searchQuery) {
      // Results aren't relevant to the current query
      return state;
    }

    // Insert results in their right place
    let results = state.results ? state.results.slice() : [];
    results.splice(
      (action.response.page - 1) * RESULTS_PER_PAGE,
      RESULTS_PER_PAGE,
      ...action.response.results
    );

    return {
      ...state,
      results,
      currentPage: action.response.page,
      totalPages: action.response.total_pages,
      loadingPage: null,
    };

  case ActionTypes.FETCH_MOVIE_DVD_RELEASE:
    return {
      ...state,
      results: state.results.map(result => {
        if (result.id !== action.movie.id) {
          return result;
        }
        return {
          ...result,
          dvdRelease: null,
          isLoadingDVDRelease: true,
        };
      }),
    };

  case ActionTypes.FETCH_MOVIE_DVD_RELEASE_SUCCESS:
    return {
      ...state,
      results: state.results.map(result => {
        if (result.id !== action.movie.id) {
          return result;
        }
        return {
          ...result,
          dvdRelease: action.release,
          isLoadingDVDRelease: false,
        };
      }),
    };

  case ActionTypes.FETCH_MOVIE_DVD_RELEASE_FAILURE:
    return {
      ...state,
      results: state.results.map(result => {
        if (result.id !== action.movie.id) {
          return result;
        }
        return {
          ...result,
          isLoadingDVDRelease: false,
          hasDVDReleaseError: true,
        };
      }),
    };

  case ActionTypes.UPDATE_SEARCH_QUERY:
    return {
      ...state,
      searchQuery: action.query,
      results: null,
      currentPage: null,
      totalPages: null,
      loadingPage: 1,
    };

  case ActionTypes.RESET_SEARCH_QUERY:
    return INITIAL_STATE;

  default:
    return state;
  }
}