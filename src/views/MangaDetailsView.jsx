
import React from 'react';
import { Link, Navigation, UI } from 'touchstonejs';
import PureMixin from 'react-pure-render/mixin';
import { fetchChapters, addFavorite, removeFavorite } from '../services/mangaService';




const formatter = new Intl.DateTimeFormat('en-US');

const Item = React.createClass({
  mixins: [Navigation, PureMixin],
  
  render() {
    const { order, date, title, mangaId, mangaTitle, isFavorite, fromFavorite } = this.props;
    let dateFormatted;
    const chapterTitle = order + (title ? ' -' + title : '');
    try { 
      dateFormatted = formatter.format(new Date(date * 1000));
    } catch(e) { 
      dateFormatted = null;
    }
    
    return ( 
      <Link 
        to="reader" 
        viewTransition="show-from-right" 
        params={{ chapterId: this.props.id, chapterTitle, mangaId, mangaTitle, isFavorite, fromFavorite }}
        className="list-item manga-item is-tappable">
          <div className="item-inner">
            <div className="item-content">
              <div className="item-title chapter-item-title">{chapterTitle}</div>
            </div>
            <UI.ItemNote type="default" label={dateFormatted} icon="ion-chevron-right" />
          </div>
      </Link>
    );
  }
});

const MangaDetailsView = React.createClass({

  mixins: [Navigation, PureMixin],
  
  componentWillMount() {
    fetchChapters(this.props.mangaId).then(chapters => this.setState({chapters}));
  },
  
  getInitialState() {
    return { chapters: [], isFavorite: this.props.isFavorite };
  },
  
  toggleFavorite() {
    if (this.state.isFavorite) {
      removeFavorite(this.props.mangaId);
      this.setState({ isFavorite: false });
    } else {
      addFavorite(this.props.mangaId);
      this.setState({ isFavorite: true });
    }
  },


  render() {
    const { mangaTitle, mangaId, fromFavorite } = this.props;
    const { chapters, isFavorite } = this.state;
    const chaptersItems = (
      chapters
        .slice()
        .sort((a, b) => b.order - a.order)
        .map(chapter => <Item key={chapter.id} {...chapter} mangaId={mangaId} mangaTitle={mangaTitle} isFavorite={isFavorite} 
             fromFavorite={fromFavorite} /> )
    );
    return ( 
      <UI.View>
        <UI.Headerbar type="default" label={mangaTitle} > 
          <UI.HeaderbarButton 
              showView="home" viewTransition="reveal-from-right" label="Back" 
              icon="ion-chevron-left"
              viewProps={{ isFavorite: fromFavorite }} />
          <UI.HeaderbarButton position="right" icon="ion-ios-star" className={isFavorite ? '' : 'inactive' } onTap={this.toggleFavorite}/>
        </UI.Headerbar>
        <UI.ViewContent grow scrollable>
         <div className="panel mb-0">
          {chaptersItems}
        </div>
        </UI.ViewContent> 
      </UI.View>
    );
  }
});
    
export default MangaDetailsView;
