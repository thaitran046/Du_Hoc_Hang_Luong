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


/*
|--------------------------------------------------------------------------
| Attribution
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| TikTok Event Mapping
|--------------------------------------------------------------------------
|
| Event nội bộ:
|
| form_step_1
| select_event_location
| submit_form
| generate_lead
| thank_you_view
|
| TikTok conversion chính:
|
| generate_lead -> CompleteRegistration
|
*/

function getTikTokEvent(event) {
  const map = {
    generate_lead: 'CompleteRegistration'
  };

  return map[event] || event;
}


/*
|--------------------------------------------------------------------------
| Main Tracking Function
|--------------------------------------------------------------------------
*/

export function track(event, params = {}) {
  const attribution = getAttribution();

  const eventParams = {
    ...attribution,
    ...params
  };


  /*
  |--------------------------------------------------------------------------
  | Google Tag Manager
  |--------------------------------------------------------------------------
  */

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event,
    ...eventParams
  });


  /*
  |--------------------------------------------------------------------------
  | Google Analytics 4
  |--------------------------------------------------------------------------
  */

  if (typeof window.gtag === 'function') {
    window.gtag(
      'event',
      event,
      eventParams
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Meta Pixel
  |--------------------------------------------------------------------------
  |
  | Chỉ generate_lead được tính là Lead.
  |
  | Không map submit_form thành Lead để tránh đếm trùng.
  |
  */

  if (typeof window.fbq === 'function') {
    if (event === 'generate_lead') {
      window.fbq(
        'track',
        'Lead',
        eventParams
      );
    }
  }


  /*
  |--------------------------------------------------------------------------
  | TikTok Pixel
  |--------------------------------------------------------------------------
  |
  | generate_lead -> CompleteRegistration
  |
  | Các event còn lại vẫn là custom event.
  |
  */

  if (
    window.ttq &&
    typeof window.ttq.track === 'function' &&
    event !== 'page_view'
  ) {
    const tiktokEvent =
      getTikTokEvent(event);

    window.ttq.track(
      tiktokEvent,
      eventParams
    );
  }
}


/*
|--------------------------------------------------------------------------
| Script Loader
|--------------------------------------------------------------------------
*/

function loadScript(src, id) {
  if (
    id &&
    document.getElementById(id)
  ) {
    return;
  }

  const script =
    document.createElement('script');

  script.async = true;
  script.src = src;

  if (id) {
    script.id = id;
  }

  document.head.appendChild(script);
}


/*
|--------------------------------------------------------------------------
| Initialize Tracking
|--------------------------------------------------------------------------
*/

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


  /*
  |--------------------------------------------------------------------------
  | Google Tag Manager
  |--------------------------------------------------------------------------
  */

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


  /*
  |--------------------------------------------------------------------------
  | GA4 / Google Ads
  |--------------------------------------------------------------------------
  */

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


  /*
  |--------------------------------------------------------------------------
  | Meta Pixel
  |--------------------------------------------------------------------------
  */

  if (meta) {
    !function(f,b,e,v,n,t,s) {

      if (f.fbq) return;

      n = f.fbq = function() {

        n.callMethod
          ? n.callMethod.apply(
              n,
              arguments
            )
          : n.queue.push(
              arguments
            );
      };

      if (!f._fbq) {
        f._fbq = n;
      }

      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];

      t =
        b.createElement(e);

      t.async = true;
      t.src = v;

      s =
        b.getElementsByTagName(e)[0];

      s.parentNode.insertBefore(
        t,
        s
      );

    }(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    window.fbq(
      'init',
      meta
    );

    /*
     * Meta PageView
     */
    window.fbq(
      'track',
      'PageView'
    );
  }


  /*
  |--------------------------------------------------------------------------
  | TikTok Pixel
  |--------------------------------------------------------------------------
  */

  if (tiktok) {
    !function(w,d,t) {

      w.TiktokAnalyticsObject = t;

      var ttq =
        w[t] =
        w[t] || [];

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

      ttq.setAndDefer =
        function(t,e) {

          t[e] =
            function() {

              t.push(
                [e].concat(
                  Array.prototype.slice.call(
                    arguments,
                    0
                  )
                )
              );
            };
        };

      for (
        var i = 0;
        i < ttq.methods.length;
        i++
      ) {
        ttq.setAndDefer(
          ttq,
          ttq.methods[i]
        );
      }


      ttq.load =
        function(e) {

          var n =
            'https://analytics.tiktok.com/i18n/pixel/events.js';

          ttq._i =
            ttq._i || {};

          ttq._i[e] = [];

          ttq._i[e]._u =
            n;

          ttq._t =
            ttq._t || {};

          ttq._t[e] =
            +new Date;

          var o =
            d.createElement(
              'script'
            );

          o.type =
            'text/javascript';

          o.async = true;

          o.src =
            n +
            '?sdkid=' +
            e +
            '&lib=' +
            t;

          var a =
            d.getElementsByTagName(
              'script'
            )[0];

          a.parentNode.insertBefore(
            o,
            a
          );
        };


      /*
       * Load TikTok Pixel
       */

      ttq.load(
        tiktok
      );


      /*
       * TikTok PageView
       */

      ttq.page();

    }(
      window,
      document,
      'ttq'
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Internal Page View
  |--------------------------------------------------------------------------
  */

  track(
    'page_view',
    {
      page_path:
        window.location.pathname,

      page_title:
        document.title
    }
  );
}