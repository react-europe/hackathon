
import React from 'react';
import Touchstone from 'touchstonejs';

import './styles.less';

import MangaList from './views/MangaList';
import MangaDetailsView from './views/MangaDetailsView';
import Reader from './views/Reader';

let views = {
  home: MangaList,
  details: MangaDetailsView,
  reader: Reader
};

export default React.createClass({
  displayName: 'App',

  mixins: [Touchstone.createApp(views)],

  getInitialState() {
    return {
      currentView: 'home',
    };
  },

  render() {
    return <div>{this.getCurrentView()}</div>;
  },
});
