// src/components/analytics/MetaPixel.tsx
'use client';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

type MetaPixelProps = {
  pixelId: string;
  name?: string;
  debugMode?: boolean;
};

export default function MetaPixel({ pixelId, name, debugMode = false }: MetaPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Track pageviews on route change
  useEffect(() => {
    if (!scriptLoaded) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.fbq) {
        // Send pageview for this specific pixel
        window.fbq('trackSingle', pixelId, 'PageView');

        if (debugMode) {
          console.log(`📊 Meta Pixel PageView:`, {
            property: name || pixelId,
            pixel_id: pixelId,
            url,
            title: document.title,
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, pixelId, name, debugMode, scriptLoaded]);

  return (
    <>
      {/* Load Meta Pixel script */}
      <Script
        id={`meta-pixel-base-${pixelId}`}
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
          if (debugMode) {
            console.log(`🟢 Meta Pixel Script Loaded: ${name || pixelId}`);
          }
        }}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />

      {/* Initialize Meta Pixel */}
      <Script
        id={`meta-pixel-init-${pixelId}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // fbq('consent', 'revoke');
            fbq('init', '${pixelId}');
            fbq('trackSingle', '${pixelId}', 'PageView');
            ${debugMode ? `console.log('✅ Meta Pixel Initialized: ${name || pixelId}');` : ''}
          `,
        }}
      />
    </>
  );
}
