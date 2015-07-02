import React from 'react';
import { Navigation, UI, Link } from 'touchstonejs';
import { fetchMangas, getFavorites } from '../services/mangaService';
import PureMixin from 'react-pure-render/mixin';
import Tappable from 'react-tappable';

const formatter = new Intl.DateTimeFormat('en-US');

const Search = React.createClass({
  mixins: [PureMixin],
  propTypes: {
    searchString: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange(event) {
    this.props.onChange(event.target.value);
  },

  reset() {
    this.props.onChange('');
    this.refs.input.getDOMNode().focus();
  },

  render() {
      
    const clearIcon = this.props.searchString.length ? 
      <Tappable onTap={this.reset} className="Headerbar-form-clear ion-close-circled" /> : 
      null
    ;

    return ( 
      <UI.Headerbar type="default" height="36px" className="Headerbar-form Subheader">
        <div className="Headerbar-form-field Headerbar-form-icon ion-ios7-search-strong">
          <input 
            ref="input" 
            value={this.props.searchString} 
            onChange={this.handleChange} 
            className="Headerbar-form-input" 
            placeholder='Search...' />
          {clearIcon}
        </div>
      </UI.Headerbar>
    );
  }
});

const Item = React.createClass({
  mixins: [Navigation, PureMixin],
  render() {
    const { title, image, lastChapterDate, isFavorite, fromFavorite} = this.props;
    let dateFormatted;
    try { 
      dateFormatted = formatter.format(new Date(lastChapterDate * 1000));
    } catch(e) { 
      dateFormatted = null;
    }
    
    return ( 
      <Link 
        to="details" 
        viewTransition="show-from-right" 
        params={{ mangaId: this.props.id, mangaTitle: this.props.title, isFavorite, fromFavorite }}
        className="list-item manga-item is-tappable">
        <div className="item-inner is-tappable" > 
          <img className="manga-item-img" src={image} />
          <div className="manga-item-title">{title}</div>
          <div className="manga-item-date">{dateFormatted}</div>
        </div> 
      </Link>
    );
  }
});

const List = React.createClass({
  mixins: [PureMixin],
  getDefaultProps() {
    return {
      searchString: '',
      mangas: [],
      pageNumber: 1,
      favorites: {}
    };
  },

  render() {

    const { searchString, mangas, pageNumber, favorites, isFavorite } = this.props;
    let filteredMangas = (
      mangas
        .slice()
        .sort((a, b) => b.lastChapterDate - a.lastChapterDate)
        .filter(manga => manga.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
    );
    if (isFavorite) {
      filteredMangas = filteredMangas.filter(manga => favorites[manga.id]);
    }
    const slicedMangas = filteredMangas.slice(0, pageNumber * 20);
    
    if (!slicedMangas.length) {
      return (
        <div className="view-feedback" >
          <div className="view-feedback-text" >{isFavorite ? 'You have no favorite manga!' : 'No match found...' }</div> 
        </div>
      );
    }
    const mangasItems = slicedMangas.map(manga => <Item key={manga.id} {...manga} isFavorite={favorites[manga.id]} fromFavorite={isFavorite} />);
                                         
    const seeMore = filteredMangas.length !== slicedMangas.length && (
      <Tappable onTap={this.props.onSeeMore} className="panel-button manga-list-seemore" component="button">
          See More ...
      </Tappable>
    );
    return (
        <div className="panel mb-0">
          {mangasItems}
          {seeMore}
        </div>
    );
  }
});






const MangaList = React.createClass({

  mixins: [Navigation, PureMixin],

  getDefaultProps() {
    return { isFavorite: false };
  },
  
  getInitialState() {
    return { 
      mangas: [], 
      searchString: '', 
      pageNumber: 1, 
      isFavorite: this.props.isFavorite,
      favorites: getFavorites()
    };
  },
  
  componentWillMount() {
    fetchMangas().then(mangas => this.setState({ mangas: mangas }));
  },

  updateSearch(str) {
    this.setState({ searchString: str, pageNumber: 1 });
  },
  
  onSeeMore() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  },
  
  goToMainList() {
    this.setState({searchString: '', pageNumber: 1, isFavorite: false});
  },
  
  goToFavorite() {
    this.setState({searchString: '', pageNumber: 1, isFavorite: true});
  },

  render() {
    
    const {mangas, pageNumber, isFavorite, searchString, favorites} = this.state;
    
    return ( 
      <UI.View>
        <UI.Headerbar type="default" label={isFavorite ? 'Favorites' : 'Mangas '} />
        {!isFavorite && <Search searchString={ searchString } onChange={ this.updateSearch } /> }
        <UI.ViewContent grow scrollable>
          <List mangas={mangas} favorites={favorites} isFavorite={isFavorite}
            searchString={searchString} pageNumber={pageNumber} onSeeMore={this.onSeeMore} /> 
        </UI.ViewContent> 
        <UI.Footerbar type="default">
          <UI.FooterbarButton icon="ion-ios-list-outline" 
            active={!isFavorite} label="Mangas" onTap={this.goToMainList} />
          <UI.FooterbarButton icon="ion-ios-star" label="Favorites" 
            active={isFavorite} onTap={this.goToFavorite} />
        </UI.Footerbar>
      </UI.View>
    );
  }
});

    
export default MangaList;
