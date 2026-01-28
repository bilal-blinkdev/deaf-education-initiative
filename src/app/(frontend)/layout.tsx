import { Suspense } from 'react';
import { Ubuntu } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CookieConsent from '@/components/modals/CookieConsent';
import './globals.scss';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import { AnalyticsPlatform } from '@/payload-types';
import { fetchPayload } from '../lib/payload/fetchPayload';

export const metadata = {
  description: 'Deaf Education Initiative',
  title: 'Deaf Education Initiative',
};

const ubuntu = Ubuntu({
  style: 'normal',
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
  subsets: ['latin'],
  display: 'swap',
});
const ubuntuSans = localFont({
  src: '../../../public/fonts/UbuntuSans-VariableFont_wdth,wght.ttf',
  variable: '--font-ubuntu-sans',
});

async function fetchAnalyticsPlatforms(): Promise<AnalyticsPlatform[]> {
  return fetchPayload<AnalyticsPlatform>('/api/analytics-platforms');
}
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const analyticsPlatforms = await fetchAnalyticsPlatforms();

  return (
    <html lang="en">
      <Suspense fallback={null}>
        <AnalyticsProvider platforms={analyticsPlatforms} debugMode={true} />
      </Suspense>
      <body className={`${ubuntu.variable} ${ubuntuSans.variable}`}>
        <Header />
        <main>{children}</main>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
