const API_ENDPOINT = 'http://www.mangaeden.com/api/';

function createUrl(endpoint, params) {
  let url = API_ENDPOINT + endpoint;
  if (params) {
    url += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&'); 
  }
  return url;
}
function mapManga({im, t, i, a, s, c, ld, h}) {
  return {
    image: 'https://cdn.mangaeden.com/mangasimg/' + im, 
    title: t, 
    id: i, 
    alias: a, 
    status: s, 
    category: c, 
    lastChapterDate: ld, 
    hits: h 
  };
}


export function fetchMangas() {
  return fetch(createUrl('list/0/'))
    .then(response => response.json())
    .then(({manga}) => manga.map(mapManga));
}

export function fetchChapters(mangaId) {
  return fetch(createUrl(`manga/${mangaId}/`))
    .then(response => response.json())
    .then(({chapters}) => chapters.map(
      ([order, date, title, id]) => ({order, date, title, id}))
    );
}

export function fetchChapter(chapterId) {
  return fetch(createUrl(`chapter/${chapterId}/`))
    .then(response => response.json())
    .then(({images}) => images.map(
      ([order, url]) => ({order, url: 'https://cdn.mangaeden.com/mangasimg/' + url }))
    );
}

  
export function getFavorites() {
  const json = localStorage.getItem('manga-reader-favorite');
  return (json && JSON.parse(json)) || {};
}

export function addFavorite(mangaId) {
  const favorites = getFavorites();
  favorites[mangaId] = true;
  return localStorage.setItem('manga-reader-favorite', JSON.stringify(favorites));
}
  
export function removeFavorite(mangaId) {
  const favorites = getFavorites();
  delete favorites[mangaId];
  return localStorage.setItem('manga-reader-favorite', JSON.stringify(favorites));
}
