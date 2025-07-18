'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Container from '@/components/layout/Container';
import StepBar from '@/components/elements/StepBar';
import DonationDetails from '@/components/sections/DonationDetails';
import UserDetails from '@/components/sections/UserDetails';
import PaymentDetails from '@/components/sections/PaymentDetails';
import Button from '@/components/elements/Button';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import HandDrawnSmily from '@/graphics/HandDrawnSmily';
import ArrowLeft from '@/graphics/ArrowLeft';
import { PROJECTS } from '@/app/constants';
import styles from './styles.module.scss';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const NUMBER_OF_STEPS = 3;

export default function Donation() {
  const [step, setStep] = useState(1);
  const [donationDetails, setDonationDetails] = useState({
    projectType: '',
    supportType: 'Give Once',
    otherAmount: 0,
    donationType: 'Zakat',
    donationFixedAmount: '1',
  });
  const [userDetails, setUserDetails] = useState({});
  const totalAmount =
    donationDetails.otherAmount > 0
      ? donationDetails.otherAmount
      : donationDetails.donationFixedAmount;
  const [paymentDetails, setPaymentDetails] = useState({
    amount: totalAmount,
  });
  const [donationDetailsValid, setDonationDetailsValid] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState<boolean>(false);

  const appearance = {
    theme: 'stripe' as const,
    rules: {
      '.Label': { fontSize: '0.75rem' },
      '.Input:focus': {
        border: '1px solid rgba(18, 17, 39, 0.12)',
        boxShadow: '0 0 0 4px rgba(65, 78, 211, 0.3)',
      },
      '.Error': { fontSize: '0.75rem' },
    },
    variables: {
      colorPrimary: '#3399ff',
      colorBackground: '#ffffff',
      colorText: 'rgba(18, 17, 39, 0.12)',
      colorDanger: '#df1b41',
      fontFamily: 'Ubuntu, system-ui, sans-serif',
      fontSizeBase: '16px',
      fontLineHeight: '1.5rem',
      spacingUnit: '5px',
      borderRadius: '6px',
    },
  };
  const [project, setProject] = useState(PROJECTS[0]);

  const handleStepChange = () => {
    console.log(donationDetailsValid);

    if (donationDetailsValid) {
      setStep((prev) => {
        let step = prev;

        if (step >= NUMBER_OF_STEPS) step = NUMBER_OF_STEPS;
        else step = prev + 1;

        return step;
      });
    }
  };

  useEffect(() => {}, [donationDetails]);
  return (
    <section className={styles.donation}>
      <Container>
        <StepBar
          numOfSteps={NUMBER_OF_STEPS}
          step={step}
          successMessage={paymentSucceeded ? 'All Done! 🎉' : ''}
        />
        {!paymentSucceeded && (
          <div className={styles.flex}>
            <div className={styles.flexCol}>
              <DonationDetails
                project={project}
                setProject={setProject}
                projects={PROJECTS}
                handleClick={handleStepChange}
                step={step}
                donationDetails={donationDetails}
                setDonationDetails={setDonationDetails}
                setIsValid={setDonationDetailsValid}
              />
              <UserDetails
                project={project}
                setProject={setProject}
                projects={PROJECTS}
                handleClick={handleStepChange}
                step={step}
                setUserDetails={setUserDetails}
              />
              <Elements
                stripe={stripePromise}
                options={{
                  mode: 'payment',
                  amount: Number(paymentDetails.amount) * 100,
                  currency: 'usd',
                  appearance: appearance,
                }}
              >
                <PaymentDetails
                  project={project}
                  setProject={setProject}
                  projects={PROJECTS}
                  handleClick={handleStepChange}
                  step={step}
                  amount={Number(paymentDetails.amount)}
                  setPaymentDetails={setPaymentDetails}
                  setPaymentSucceeded={setPaymentSucceeded}
                />
              </Elements>
            </div>
            <div className={styles.flexCol}>
              <div className={styles.donationCart}>
                <h2 className={styles.donationCardHeading}>Your Donation </h2>
                <div className={styles.flex}>
                  <div className={styles.projectName}>
                    <h3>{project.name}</h3>
                    <p>
                      {project.amountOptions
                        .filter((opt) => opt.amount == totalAmount.toString())
                        .map((opt, index) => (
                          <span key={index}>
                            {opt.symbol} {opt.amount}
                            {opt?.period &&
                            opt.period.includes('month') &&
                            opt.period.includes('year')
                              ? '/' + opt.period
                              : opt.period && opt.period.includes('')
                                ? ' - ' + opt.period
                                : null}
                          </span>
                        ))}
                      {paymentDetails.amount === 0 && paymentDetails.amount}{' '}
                    </p>
                  </div>
                  <div className={styles.donationType}>
                    <h3>Support Type</h3>
                    <p>{donationDetails.supportType}</p>
                  </div>
                  <div className={styles.donationType}>
                    <h3>Donation Type</h3>
                    <p>{donationDetails.donationType}</p>
                  </div>
                  <div className={styles.total}>
                    <h3>Total</h3>
                    <p>
                      {project.amountOptions[0].symbol} {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {paymentSucceeded && (
          <div className={styles.success}>
            <h2 className={styles.success__heading}>
              <HandDrawnSmily />
              <span>Thank You for Your Support!</span>
              <HandDrawnTwinkle />
            </h2>
            <p className={styles.success__description}>
              Thank you for supporting Deaf Education Initiative’s cause with your generous
              donation! You’re helping make dreams come true and changing lives for the better.
            </p>
            <Button
              size="large"
              width="auto"
              link={{ href: '/' }}
              icons={{ trailing: true, type: <ArrowLeft /> }}
            >
              Home
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
