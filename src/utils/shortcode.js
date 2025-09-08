const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateShortcode(length = 6) {
  let shortcode = '';
  for (let i = 0; i < length; i++) {
    shortcode += BASE62[Math.floor(Math.random() * BASE62.length)];
  }
  return shortcode;
}

export function generateUniqueShortcode(length = 6) {
  const data = JSON.parse(localStorage.getItem('urlShortenerData') || '{}');
  let shortcode;
  do {
    shortcode = generateShortcode(length);
  } while (data[shortcode]);
  return shortcode;
}
