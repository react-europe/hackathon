export function getImageUrl(path, size = 185) {
  return path ? `https://image.tmdb.org/t/p/w${size}${path}` : null;
}