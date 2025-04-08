// We can't use imports in content scripts directly, so cleaner.js must be loaded globally
const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ref'];

function cleanURL(url) {
  try {
    const parsedUrl = new URL(url);
    TRACKING_PARAMS.forEach(param => parsedUrl.searchParams.delete(param));
    return parsedUrl.href;
  } catch (e) {
    return url;
  }
}

const cleaned = cleanURL(window.location.href);
if (cleaned !== window.location.href) {
  history.replaceState(null, '', cleaned);
}
