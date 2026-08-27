const TRACKING_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','ttclid','msclkid'];

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const saved = {};
  TRACKING_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) sessionStorage.setItem(`hl_${key}`, value);
    const stored = sessionStorage.getItem(`hl_${key}`);
    if (stored) saved[key] = stored;
  });
  if (!sessionStorage.getItem('hl_landing_page')) sessionStorage.setItem('hl_landing_page', window.location.href);
  if (!sessionStorage.getItem('hl_referrer')) sessionStorage.setItem('hl_referrer', document.referrer || 'direct');
  return saved;
}

export function getAttribution() {
  const data = {};
  TRACKING_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(`hl_${key}`);
    if (value) data[key] = value;
  });
  data.landing_page = sessionStorage.getItem('hl_landing_page') || window.location.href;
  data.referrer = sessionStorage.getItem('hl_referrer') || document.referrer || 'direct';
  return data;
}

export function track(event, params = {}) {
  const payload = { event, ...getAttribution(), ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (typeof window.fbq === 'function') {
    const fbEvent = event === 'generate_lead' ? 'Lead' : event === 'page_view' ? 'PageView' : null;
    if (fbEvent) window.fbq('track', fbEvent, params);
  }
  if (window.ttq?.track && event !== 'page_view') window.ttq.track(event, params);
}

function loadScript(src, id) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  if (id) script.id = id;
  document.head.appendChild(script);
}

export function initTracking() {
  captureAttribution();
  const env = import.meta.env;
  const gtm = env.VITE_GTM_ID;
  const ga4 = env.VITE_GA4_ID;
  const meta = env.VITE_META_PIXEL_ID;
  const tiktok = env.VITE_TIKTOK_PIXEL_ID;
  const ads = env.VITE_GOOGLE_ADS_ID;

  if (gtm) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`, 'hl-gtm');
  }
  if (ga4 || ads) {
    const id = ga4 || ads;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`, 'hl-gtag');
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    if (ga4) window.gtag('config', ga4);
    if (ads) window.gtag('config', ads);
  }
  if (meta) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', meta);
  }
  if (tiktok) {
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=n;ttq._t=ttq._t||{};ttq._t[e]=+new Date;var o=d.createElement('script');o.type='text/javascript';o.async=!0;o.src=n+'?sdkid='+e+'&lib='+t;var a=d.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};ttq.load(tiktok);ttq.page()}(window,document,'ttq');
  }
  track('page_view', { page_path: window.location.pathname, page_title: document.title });
}
