import React from 'react';
import { UI } from 'touchstonejs';

export default class Footerbar {
  render() {
    return (
      <UI.Footerbar type="default">
        <UI.FooterbarButton showView="list" icon="ion-ios-star-outline" />
        <UI.FooterbarButton showView="search" icon="ion-ios-search" />
      </UI.Footerbar>
    );
  }
}
