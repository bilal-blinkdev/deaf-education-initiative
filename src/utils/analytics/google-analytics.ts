type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export const sendGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 GA4 Event Sent: ${eventName}`, params);
    }
  } else {
    console.warn('⚠️ GA4 not initialized, event not sent:', eventName);
  }
};
