import * as ActionTypes from 'constants/ActionTypes';

const INITIAL_STATE = {
  quality: '1080p',
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ActionTypes.SET_QUALITY:
    return {
      ...state,
      quality: action.quality,
    };

  default:
    return state;
  }
}