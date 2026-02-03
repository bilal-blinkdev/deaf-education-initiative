'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: any;
  }
}

type GoogleAnalyticsProps = {
  gaMeasurementId: string;
  name?: string;
  debugMode: boolean;
};

export default function GoogleAnalytics({
  gaMeasurementId,
  name,
  debugMode = false,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Track pageviews on route change
  useEffect(() => {
    if (!scriptLoaded) return;

    const url = pathname + searchParams.toString();

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Send explicit pageview event
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: url,
          send_to: gaMeasurementId,
        });

        if (debugMode) {
          console.log(`📊 GA4 page_view:`, {
            property: name || gaMeasurementId,
            measurement_id: gaMeasurementId,
            url,
            title: document.title,
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, gaMeasurementId, name, debugMode, scriptLoaded]);

  // Script is added to the head of the document. To Begin, consent is denied.
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        onLoad={() => {
          setScriptLoaded(true);
          if (debugMode) {
            console.log(`🟢 GA4 Script Loaded: ${name || gaMeasurementId}`);
          }
        }}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'granted'
                });
                
                gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                    page_title: document.title,
                    debug_mode: ${debugMode},
                    send_page_view: true
                });

                ${debugMode ? `console.log('✅ GA4 Initialized: ${name || gaMeasurementId}');` : ''}
                `,
        }}
      />
    </>
  );
}
