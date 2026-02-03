// src/components/analytics/AnalyticsProvider.tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { AnalyticsPlatform } from '@/payload-types';
import GoogleAnalytics from './GoogleAnalytics';
import MetaPixel from './MetaPixel';
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
  // Group platforms by type
  const gaInstances = platforms.filter(
    (p) => p.platform === 'google-analytics' && p.gaTrackingId && p.enabled,
  );
  const gtmInstances = platforms.filter(
    (p) => p.platform === 'google-tag-manager' && p.gtmId && p.enabled,
  );
  const metaPixelInstances = platforms.filter(
    (p) => p.platform === 'meta-pixel' && p.metaPixelId && p.enabled,
  );
  const linkedinInstances = platforms.filter(
    (p) => p.platform === 'linkedin-insight' && p.linkedinPartnerId && p.enabled,
  );

  useEffect(() => {
    if (debugMode) {
      console.log('Analytics platforms loaded:', {
        total: platforms.length,
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

  return (
    <>
      {gaInstances.map((platform) => (
        <GoogleAnalytics
          key={platform.id}
          gaMeasurementId={platform.gaTrackingId!}
          name={platform.name}
          debugMode={platform.gaDebugMode || debugMode}
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
      {metaPixelInstances.map((platform) => (
        <MetaPixel
          key={platform.id}
          pixelId={platform.metaPixelId!}
          name={platform.name}
          debugMode={debugMode}
        />
      ))}

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
