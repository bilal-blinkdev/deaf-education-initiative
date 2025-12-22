'use client';

import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/app/lib/storage-helper';
import styles from './styles.module.scss';
import Button from '@/components/elements/Button';

// CookieBanner component that displays a banner for cookie consent.
export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    console.log('Cookie Consent retrieved from storage: ', storedCookieConsent);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage and Google Analytics consent status when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage('cookie_consent', cookieConsent);
    }

    const newValue = cookieConsent ? 'granted' : 'denied';

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null;
  }

  return (
    <div className={`${styles.cookieModal} ${cookieConsent == null ? 'visible' : 'hidden'}`}>
      <div className={styles.cookieModal__inner}>
        <div className={styles.cookieModal__content}>
          <div className={styles.cookieModal__text}>
            <p>This site uses cookies:</p>
          </div>
          <div className={styles.cookieModal__buttons}>
            <Button onClick={() => setCookieConsent(false)}>Decline</Button>
            <Button onClick={() => setCookieConsent(true)}>Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
