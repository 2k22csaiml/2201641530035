export function validateUrl(url) {
  const urlRegex = /^https?:\/\/.+/;
  return urlRegex.test(url);
}

export function validateValidityMinutes(minutes) {
  if (minutes === '' || minutes === null || minutes === undefined) return true;
  const num = parseInt(minutes, 10);
  return !isNaN(num) && num > 0;
}

export function validateShortcode(shortcode) {
  if (!shortcode) return true;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(shortcode)) return false;
  const data = JSON.parse(localStorage.getItem('urlShortenerData') || '{}');
  return !data[shortcode];
}
