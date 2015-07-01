export function getImageUrl(path) {
  return path ? `https://image.tmdb.org/t/p/w185${path}` : null;
}