'use client';

import { useCallback } from 'react';

type EventParams = {
  [key: string]: any;
};

export function useAnalyticsEvent() {
  const trackEvent = useCallback((eventName: string, params?: EventParams) => {
    if (typeof window === 'undefined') return;

    if (window.gtag) {
      window.gtag('event', eventName, params);
      console.log('GA4 Event: ', eventName, params);
    }
  }, []);

  return {
    trackEvent,
  };
}
