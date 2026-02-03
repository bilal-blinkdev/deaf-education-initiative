declare global {
  interface Window {
    fbq: any;
  }
}

export type MetaStandardEvent =
  | 'PageView'
  | 'Lead'
  | 'Donate'
  | 'Purchase'
  | 'CompleteRegistration'
  | 'BeginCheckout'
  | 'AddPaymentInfo'
  | 'ViewContent'
  | 'Contact'
  | 'Schedule';

/**
 * Sends a Standard Event to Meta Pixel
 * @example sendMetaEvent('Purchase', { value: 10.00, currency: 'USD' });
 */
export const sendMetaEvent = (
  eventName: MetaStandardEvent | string,
  params?: Record<string, any>,
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔵 Meta Pixel Event: ${eventName}`, params);
    }
  } else {
    // Optional: Silent fail or warn if debug mode needed
    // console.warn('⚠️ Meta Pixel not initialized, event not sent:', eventName);
  }
};

/**
 * Sends a Custom Event to Meta Pixel (for non-standard actions)
 * @example sendMetaCustomEvent('ClickedHeroButton', { category: 'Heroes' });
 */
export const sendMetaCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔵 Meta Custom Event: ${eventName}`, params);
    }
  }
};
