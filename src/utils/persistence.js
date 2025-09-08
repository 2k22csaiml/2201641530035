export function loadData() {
  return JSON.parse(localStorage.getItem('urlShortenerData') || '{}');
}

export function saveData(data) {
  localStorage.setItem('urlShortenerData', JSON.stringify(data));
}

export function addUrl(shortcode, originalUrl, validityMinutes = 30) {
  const data = loadData();
  const createdAt = new Date().toISOString();
  const expiryAt = new Date(Date.now() + validityMinutes * 60 * 1000).toISOString();
  data[shortcode] = {
    shortcode,
    originalUrl,
    createdAt,
    expiryAt,
    clicks: 0,
    clickDetails: []
  };
  saveData(data);
}

export function getUrl(shortcode) {
  const data = loadData();
  return data[shortcode];
}

export function incrementClicks(shortcode, clickDetail) {
  const data = loadData();
  if (data[shortcode]) {
    data[shortcode].clicks += 1;
    data[shortcode].clickDetails.push(clickDetail);
    saveData(data);
  }
}

export function getAllUrls() {
  const data = loadData();
  return Object.values(data);
}
