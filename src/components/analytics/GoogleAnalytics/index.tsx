'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    const url = pathname + searchParams.toString();

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gaMeasurementId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaMeasurementId]);

  // Script is added to the head of the document. To Begin, consent is denied.
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
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
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                    debug_mode: ${debugMode}
                });
                `,
        }}
      />
    </>
  );
}
