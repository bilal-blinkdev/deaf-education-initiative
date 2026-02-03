'use client';

import { useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@/utils/analytics/google-analytics';
import { sendMetaEvent } from '@/utils/analytics/meta-pixel';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import ArrowLeft from '@/graphics/ArrowLeft';
import styles from './page.module.scss';

// 1. ISOLATED COMPONENT: This component is the only one allowed to use useSearchParams
function ThankYouLogic() {
  const searchParams = useSearchParams();
  const eventFired = useRef(false);

  useEffect(() => {
    if (eventFired.current) return;

    const amount = parseFloat(searchParams.get('amount') || '0');
    // FIX: currency is a string (e.g., 'GBP'), DO NOT use parseFloat here
    const currency = searchParams.get('currency') || 'GBP';

    const transactionId = searchParams.get('transactionId') || `0000000`;
    const projectId = searchParams.get('projectId') || `0000000`;
    const projectName = searchParams.get('projectName') || `none`;
    const projectCategory = searchParams.get('projectCategory') || `none`;
    const projectCategory2 = searchParams.get('projectCategory2') || `none`;
    const price = parseFloat(searchParams.get('price') || '0');

    if (amount > 0) {
      sendGAEvent('purchase', {
        transaction_id: transactionId,
        value: amount,
        currency,
        items: [
          {
            item_id: projectId,
            item_name: projectName,
            item_category: projectCategory,
            item_category2: projectCategory2,
            price: price || amount,
            quantity: 1,
          },
        ],
      });
      sendMetaEvent('Purchase', {
        value: amount,
        currency,
        content_ids: [projectId],
        content_name: projectName,
        content_category: projectCategory,
        content_type: 'product',
        num_items: 1,
        order_id: transactionId,
        project_subcategory: projectCategory2,
      });

      eventFired.current = true;
    }
  }, [searchParams]);

  return null; // This component doesn't render anything visible, just logic
}

// 2. MAIN COMPONENT: Pure layout, wraps the logic in Suspense
export default function ThankYou() {
  return (
    <section className={styles.donationSuccess}>
      <Container>
        {/* Suspense Boundary protects the search params logic */}
        <Suspense fallback={null}>
          <ThankYouLogic />
        </Suspense>

        <div className={styles.success}>
          <div className={styles.success__header}>
            <video className={styles.success__video} autoPlay muted loop playsInline>
              <source src="/media/videos/donation-thankyou.mp4" type="video/mp4" />
              <source src="/media/videos/donation-thankyou.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.success__body}>
            <h2 className={styles.success__heading}>
              <span>Thank You For Your Donation</span>
            </h2>
            <p className={styles.success__description}>
              We have sent you an email with the donation information
            </p>
            <Button
              size="large"
              width="maxContent"
              link={{ href: '/' }}
              icons={{ trailing: true, type: <ArrowLeft /> }}
            >
              Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
