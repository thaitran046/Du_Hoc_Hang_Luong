import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function useUtm() {
  const [utm, setUtm] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
    fbclid: '',
    landing_page: '',
    referrer: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || '',
      landing_page: window.location.href,
      referrer: document.referrer || '',
    });
  }, []);

  return utm;
}
