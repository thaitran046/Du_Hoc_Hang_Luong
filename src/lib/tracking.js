const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'ttclid',
  'msclkid'
];

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const saved = {};

  TRACKING_KEYS.forEach((key) => {
    const value = params.get(key);

    if (value) {
      sessionStorage.setItem(`hl_${key}`, value);
    }

    const stored = sessionStorage.getItem(`hl_${key}`);

    if (stored) {
      saved[key] = stored;
    }
  });

  if (!sessionStorage.getItem('hl_landing_page')) {
    sessionStorage.setItem(
      'hl_landing_page',
      window.location.href
    );
  }

  if (!sessionStorage.getItem('hl_referrer')) {
    sessionStorage.setItem(
      'hl_referrer',
      document.referrer || 'direct'
    );
  }

  return saved;
}

export function getAttribution() {
  const data = {};

  TRACKING_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(`hl_${key}`);

    if (value) {
      data[key] = value;
    }
  });

  data.landing_page =
    sessionStorage.getItem('hl_landing_page') ||
    window.location.href;

  data.referrer =
    sessionStorage.getItem('hl_referrer') ||
    document.referrer ||
    'direct';

  return data;
}

export function track(event, params = {}) {
  const attribution = getAttribution();

  const eventParams = {
    ...attribution,
    ...params
  };

  // GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...eventParams
  });

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, eventParams);
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    if (event === 'generate_lead') {
      window.fbq('track', 'Lead', eventParams);
    }
  }

  // TikTok Pixel
  if (
    window.ttq &&
    typeof window.ttq.track === 'function' &&
    event !== 'page_view'
  ) {
    if (event === 'generate_lead') {
      window.ttq.track(
        'CompleteRegistration',
        eventParams
      );
    } else {
      window.ttq.track(
        event,
        eventParams
      );
    }
  }
}

function loadScript(src, id) {
  if (id && document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = src;

  if (id) {
    script.id = id;
  }

  document.head.appendChild(script);
}

function initMetaPixel(pixelId) {
  if (!pixelId) return;

  if (!window.fbq) {
    const fbq = function () {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };

    window.fbq = fbq;
    window._fbq = fbq;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://connect.facebook.net/en_US/fbevents.js';

    const firstScript =
      document.getElementsByTagName('script')[0];

    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(
        script,
        firstScript
      );
    } else {
      document.head.appendChild(script);
    }
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

function initTikTokPixel(pixelId) {
  if (!pixelId) return;

  (function (w, d, t) {
    w.TiktokAnalyticsObject = t;

    const ttq = (w[t] = w[t] || []);

    ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
      'holdConsent',
      'revokeConsent',
      'grantConsent'
    ];

    ttq.setAndDefer = function (target, method) {
      target[method] = function () {
        target.push(
          [method].concat(
            Array.prototype.slice.call(arguments, 0)
          )
        );
      };
    };

    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(
        ttq,
        ttq.methods[i]
      );
    }

    ttq.load = function (id) {
      const src =
        'https://analytics.tiktok.com/i18n/pixel/events.js';

      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = src;

      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();

      const script =
        d.createElement('script');

      script.type =
        'text/javascript';

      script.async = true;

      script.src =
        `${src}?sdkid=${id}&lib=${t}`;

      const firstScript =
        d.getElementsByTagName('script')[0];

      if (
        firstScript &&
        firstScript.parentNode
      ) {
        firstScript.parentNode.insertBefore(
          script,
          firstScript
        );
      } else {
        d.head.appendChild(script);
      }
    };

    ttq.load(pixelId);
    ttq.page();

  })(window, document, 'ttq');
}

export function initTracking() {
  captureAttribution();

  const env = import.meta.env;

  const gtm =
    env.VITE_GTM_ID;

  const ga4 =
    env.VITE_GA4_ID;

  const meta =
    env.VITE_META_PIXEL_ID;

  const tiktok =
    env.VITE_TIKTOK_PIXEL_ID;

  const ads =
    env.VITE_GOOGLE_ADS_ID;

  // GTM
  if (gtm) {
    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js'
    });

    loadScript(
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`,
      'hl-gtm'
    );
  }

  // GA4 / Google Ads
  if (ga4 || ads) {
    const id =
      ga4 || ads;

    loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`,
      'hl-gtag'
    );

    window.dataLayer =
      window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag(
      'js',
      new Date()
    );

    if (ga4) {
      window.gtag(
        'config',
        ga4
      );
    }

    if (ads) {
      window.gtag(
        'config',
        ads
      );
    }
  }

  // Meta
  initMetaPixel(meta);

  // TikTok
  initTikTokPixel(tiktok);

  // Internal PageView
  track('page_view', {
    page_path:
      window.location.pathname,

    page_title:
      document.title
  });
}s