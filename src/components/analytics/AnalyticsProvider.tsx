// src/components/analytics/AnalyticsProvider.tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { AnalyticsPlatform } from '@/payload-types';
import GoogleAnalytics from './GoogleAnalytics';
// import GoogleTagManager from './platforms/GoogleTagManager';
// import MetaPixel from './platforms/MetaPixel';
// import LinkedInInsight from './platforms/LinkedInInsight';

interface AnalyticsProviderProps {
  platforms: AnalyticsPlatform[];
  debugMode?: boolean;
}

export default function AnalyticsProvider({
  platforms,
  debugMode = false,
}: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Group platforms by type
  const gaInstances = platforms.filter((p) => p.platform === 'google-analytics' && p.gaTrackingId);
  const gtmInstances = platforms.filter((p) => p.platform === 'google-tag-manager' && p.gtmId);
  const metaPixelInstances = platforms.filter((p) => p.platform === 'meta-pixel' && p.metaPixelId);
  const linkedinInstances = platforms.filter(
    (p) => p.platform === 'linkedin-insight' && p.linkedinPartnerId,
  );

  useEffect(() => {
    if (debugMode) {
      console.log('Analytics platforms loaded:', {
        ga4: gaInstances.length,
        gtm: gtmInstances.length,
        metaPixel: metaPixelInstances.length,
        linkedin: linkedinInstances.length,
      });
    }
  }, [
    platforms,
    debugMode,
    gaInstances.length,
    gtmInstances.length,
    metaPixelInstances.length,
    linkedinInstances.length,
  ]);

  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log(gaInstances);

    if (debugMode) {
      console.log('Page view:', url);
    }

    // Track page views for all GA4 instances
    if (typeof window !== 'undefined' && window.gtag) {
      gaInstances.forEach((platform) => {
        window.gtag('config', platform.gaTrackingId, {
          page_path: url,
        });
        if (debugMode) {
          console.log(`GA4 page view tracked: ${platform.name} (${platform.gaTrackingId})`);
        }
      });
    }

    // Track page views for all Meta Pixel instances
    // if (typeof window !== 'undefined' && window.fbq) {
    //   metaPixelInstances.forEach((platform) => {
    //     window.fbq('trackSingle', platform.metaPixelId, 'PageView');
    //     if (debugMode) {
    //       console.log(`Meta Pixel page view tracked: ${platform.name} (${platform.metaPixelId})`);
    //     }
    //   });
    // }
  }, [pathname, searchParams, gaInstances, metaPixelInstances, debugMode]);

  return (
    <>
      {gaInstances.map((platform) => (
        <GoogleAnalytics
          key={platform.id}
          gaMeasurementId={platform.gaTrackingId!}
          debugMode={platform.gaDebugMode!}
        />
      ))}

      {/* Render all Google Tag Manager instances */}
      {/* {gtmInstances.map((platform) => (
        <GoogleTagManager
          key={platform.id}
          gtmId={platform.gtmId!}
          name={platform.name}
          debugMode={debugMode}
        />
      ))} */}

      {/* Render all Meta Pixel instances */}
      {/* {metaPixelInstances.map((platform) => (
        <MetaPixel
          key={platform.id}
          pixelId={platform.metaPixelId!}
          name={platform.name}
          debugMode={debugMode}
        />
      ))} */}

      {/* Render all LinkedIn instances */}
      {/* {linkedinInstances.map((platform) => (
        <LinkedInInsight
          key={platform.id}
          partnerId={platform.linkedinPartnerId!}
          name={platform.name}
          debugMode={debugMode}
        />
      ))} */}
    </>
  );
}
