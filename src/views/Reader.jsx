
import React from 'react';
import { Navigation, UI } from 'touchstonejs';
import { fetchChapter } from '../services/mangaService';
import PureMixin from 'react-pure-render/mixin';



const Reader = React.createClass({

  mixins: [Navigation, PureMixin],
  
  componentWillMount() {
    fetchChapter(this.props.chapterId).then(images => this.setState({images}));
  },
  
  getInitialState() {
    return { images: [] };
  },

  render() {
    const { chapterTitle, mangaId, mangaTitle, isFavorite, fromFavorite } = this.props;
    const { images } = this.state;
    const imagesItems = (
      images
        .slice()
        .sort((a, b) => a.order - b.order)
        .map(({url, order}) => <img className="reader-img" key={order} src={url} /> )
    );
    return ( 
      <UI.View>
        <UI.Headerbar type="default" label={chapterTitle} > 
          <UI.HeaderbarButton showView="details" viewProps={{ mangaId, mangaTitle, isFavorite, fromFavorite }}
              viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
        </UI.Headerbar>
        <UI.ViewContent grow scrollable>
          {imagesItems}
        </UI.ViewContent> 
      </UI.View>
    );
  }
});
    
export default Reader;
