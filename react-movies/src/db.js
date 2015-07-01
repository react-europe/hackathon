import qs from 'querystring';

import request from 'superagent';

import { API_KEY } from './config';

const TMDB_API_URL = 'https://api.themoviedb.org/3/';
const OMDB_API_URL = 'http://www.omdbapi.com/';

function get(apiUrl, path, params) {
  return new Promise((resolve, reject) => {
    request(`${apiUrl}${path}?${qs.stringify(params)}`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
}

function tmdbGet(path, params) {
  return get(TMDB_API_URL, path, { api_key: API_KEY, ...params });
}

function omdbGet(path, params) {
  return get(OMDB_API_URL, path, params);
}

export function searchMovie(query, { page = 1 } = {}) {
  return tmdbGet('search/movie', { query, page });
}

export function getOMDBMovie(query) {
  return omdbGet('', { t: query, r: 'json', tomatoes: true });
}