import { Suspense } from 'react';
import { Ubuntu } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import CookieConsent from '@/components/modals/CookieConsent';
import './globals.scss';

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXX" />
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
