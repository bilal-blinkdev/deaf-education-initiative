import React from 'react';
import Banner from '@/components/blocks/Banner';
import ChildrenSmiling from '@/assets/children-smiling.webp';
import Container from '@/components/layout/Container';
import Heading from '@/components/elements/Heading';
import styles from './page.module.scss';
import Paragraph from '@/components/elements/Paragraph';

export default function PrivacyPolicy() {
  return (
    <>
      <Banner src={ChildrenSmiling} alt="Children Smiling" />
      <section className={styles.privacyPolicy}>
        <Container>
          <Heading level={1}>Privacy Policy</Heading>
          <Heading level={2}>Deaf Education Initiative (DEI)</Heading>
          <Paragraph>Last updated: 23 December, 2025</Paragraph>
          <Paragraph>
            Deaf Education Initiative (“DEI”, “we”, “us”, or “our”) is committed to protecting your
            privacy and personal data. This Privacy Policy explains how we collect, use, store, and
            protect your personal information when you visit our website, interact with us, or
            support our work.
          </Paragraph>
          <Paragraph>
            We comply with the UK General Data Protection Regulation (UK GDPR), the Data Protection
            Act 2018, and applicable EU GDPR principles where relevant.
          </Paragraph>
          <div className={styles.policies}>
            <div className={styles.policy}>
              <Heading level={2}>1. Who We Are</Heading>
              <Paragraph>
                Deaf Education Initiative is a UK-registered charity (Charity Number: 1209822)
                working to empower underserved deaf children and youth in Pakistan through
                education, skills training, parent and teacher development, and job placements via
                the Deaf Reach Program.
              </Paragraph>
              <Heading level={3}>Data Controller:</Heading>
              <Paragraph>
                Deaf Education Initiative
                <br />
                Email: <a href="mailto:info@deiuk.org">info@deiuk.org</a>
                <br />
                Website: <a href="https://deiuk.org">deiuk.org</a>
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>2. Our Commitment to Privacy</Heading>
              <Paragraph>
                You trust us with your information, and we take that responsibility seriously. We
                only collect personal data that is necessary, use it transparently, and protect it
                using appropriate technical and organizational safeguards.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>3. What Personal Data We Collect</Heading>
              <Paragraph>
                Depending on how you interact with us, we may collect the following information:
              </Paragraph>
              <ol>
                <li>
                  Information You Provide Directly
                  <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number (if provided)</li>
                    <li>Donation or enquiry details</li>
                    <li>Any information you submit through contact or donation forms</li>
                  </ul>
                </li>
                <li>
                  Automatically Collected Information
                  <ul>
                    When you visit our website, we may collect:
                    <li>IP address (anonymised where possible)</li>
                    <li>Browser type and device information</li>
                    <li>Pages visited and interaction data</li>
                    <li>Approximate location (city/country level)</li>
                  </ul>
                </li>
              </ol>
              <Paragraph>
                This data is collected through cookies and similar technologies (see Section 7).
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>4. Legal Basis for Processing Your Data</Heading>
              <Paragraph>
                Under UK GDPR, we process personal data on the following legal bases:
              </Paragraph>
              <ul>
                <li>
                  <strong>Consent</strong> – where you have explicitly agreed (e.g., cookie consent,
                  newsletter sign-ups)
                </li>
                <li>
                  <strong>Legitimate Interests</strong> – to operate, improve, and promote our
                  charitable activities in a respectful and non-intrusive way
                </li>
                <li>
                  <strong>Legal Obligation</strong> – where required by law (e.g., financial or
                  regulatory records)
                </li>
                <li>
                  <strong>Contractual Necessity</strong> – where processing is required to complete
                  a donation or respond to a request
                </li>
              </ul>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>5. How We Use Your Information</Heading>
              <Paragraph>We use your data to:</Paragraph>
              <ul>
                <li>Respond to enquiries and communications</li>
                <li>Process donations and support our charitable objectives</li>
                <li>Improve our website and user experience</li>
                <li>Measure the effectiveness of campaigns and outreach</li>
                <li>Meet legal, regulatory, and reporting requirements</li>
              </ul>
              <Paragraph>
                We <strong>do not sell</strong> or rent your personal data to third parties.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>6. Sharing Your Data</Heading>
              <Paragraph>We may share your data only with:</Paragraph>
              <ul>
                <li>Trusted service providers (e.g., website analytics, donation processors)</li>
                <li>Regulatory or legal authorities when legally required</li>
              </ul>
              <Paragraph>
                All third parties are required to handle your data securely and lawfully.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>7. Cookies & Tracking Technologies</Heading>
              <Heading level={3}>Cookie Consent</Heading>
              <Paragraph>
                Our website uses a cookie consent banner that allows you to accept or reject
                non-essential cookies in line with GDPR requirements.
              </Paragraph>
              <Heading level={3}>Google Analytics 4 (GA4)</Heading>
              <Paragraph>
                We use Google Analytics 4 to understand how visitors use our website so we can
                improve performance and content.
              </Paragraph>
              <ul>
                <li>IP anonymisation and privacy-focused settings are applied where possible</li>
                <li>Data is used only for aggregated analytics purposes</li>
              </ul>
              <Paragraph>You can opt out by:</Paragraph>
              <ul>
                <li>Rejecting analytics cookies via the consent banner</li>
                <li>Using Google’s opt-out tools</li>
                <li>Adjusting your browser settings</li>
              </ul>

              <Heading level={3}>Meta (Facebook) Pixel</Heading>
              <Paragraph>We use the Meta Pixel to:</Paragraph>
              <ul>
                <li>Measure the effectiveness of our campaigns</li>
                <li>Understand user interactions after consent is given</li>
              </ul>
              <Paragraph>
                The Meta Pixel is <strong>only activated after you provide consent</strong> via our
                cookie banner.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>8. Managing Your Cookie Preferences</Heading>
              <Paragraph>You can control your cookie preferences in the following ways:</Paragraph>
              <ul>
                <li>
                  When you first visit our website, you can{' '}
                  <strong>accept or decline non-essential cookies</strong>
                  using our cookie consent banner.
                </li>
                <li>
                  If you previously accepted cookies and later wish to withdraw your consent, you
                  may do so by <strong>clearing or deleting cookies from your browser</strong>,
                  which will reset your cookie preferences and cause the consent banner to reappear
                  on your next visit.
                </li>
                <li>
                  You can also manage or block cookies at any time through your{' '}
                  <strong>browser settings</strong>.
                </li>
              </ul>
              <Paragraph>
                Please note that disabling or blocking cookies may affect the functionality and
                performance of certain parts of our website.{' '}
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>9. Data Retention</Heading>
              <Paragraph>We retain personal data only for as long as necessary: </Paragraph>
              <ul>
                <li>To fulfil the purpose it was collected for</li>
                <li>To meet legal, regulatory, or accounting obligations</li>
              </ul>
              <Paragraph>
                When data is no longer required, it is securely deleted or anonymised.{' '}
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>10 .Your Rights Under GDPR</Heading>
              <Paragraph>You have the right to:</Paragraph>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to processing</li>
                <li>Withdraw consent at any time</li>
                <li>Request data portability</li>
              </ul>
              <Paragraph>
                To exercise your rights, contact us at:
                <br />
                Email: <a href="mailto:info@deiuk.org">info@deiuk.org</a>
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>11. Children’s Privacy</Heading>
              <Paragraph>
                Our website is not directed at children under 13, and we do not knowingly collect
                personal data from children without appropriate consent.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>12. Changes to This Privacy Policy</Heading>
              <Paragraph>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated revision date.
              </Paragraph>
            </div>
            <div className={styles.policy}>
              <Heading level={2}>13. Contact Us</Heading>
              <Paragraph>
                If you have questions about this Privacy Policy or how we handle your data, please
                contact:
                <br />
                Email: <a href="mailto:info@deiuk.org">info@deiuk.org</a>
                <br />
                Website: <a href="https://deiuk.org">deiuk.org</a>
              </Paragraph>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
