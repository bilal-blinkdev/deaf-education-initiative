'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import Container from '@/components/layout/Container';
import StepBar from '@/components/elements/StepBar';
import DonationDetailsBox from '@/components/sections/DonationDetails';
import UserDetailsBox from '@/components/sections/UserDetails';
import PaymentDetailsBox from '@/components/sections/PaymentDetails';
import Button from '@/components/elements/Button';
import HandDrawnTwinkle from '@/graphics/HandDrawnTwinkle';
import HandDrawnSmily from '@/graphics/HandDrawnSmily';
import ArrowLeft from '@/graphics/ArrowLeft';
import { PROJECTS_TEST as PROJECTS } from '@/app/constants';
import Heading from '@/components/elements/Heading';
import styles from './styles.module.scss';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const NUMBER_OF_STEPS = 3;

export default function Donation({ donationDetailsFormData }: any) {
  const [step, setStep] = useState(1);

  const [donationDetails, setDonationDetails] = useState(
    donationDetailsFormData?.donationFixedAmount > 0 || donationDetailsFormData?.otherAmount > 0
      ? donationDetailsFormData
      : {
          projectType: PROJECTS[0].name,
          supportType: 'Give Once',
          otherAmount: 0,
          donationType: 'Zakat',
          donationFixedAmount: '1',
        },
  );
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    comments: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    amount:
      Number(donationDetails.otherAmount) > 0
        ? Number(donationDetails.otherAmount)
        : Number(donationDetails.donationFixedAmount) > 0
          ? Number(donationDetails.donationFixedAmount)
          : 1,
  });
  const [paymentSucceeded, setPaymentSucceeded] = useState<boolean>(false);

  const [clientSecret, setClientSecret] = useState('');
  // const [elementsOptions, setElementsOptions] = useState<StripeElementsOptions>({});

  const [project, setProject] = useState(PROJECTS[0]);
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

  const handleStepChange = (jumpToStep: number = 0) => {
    setStep((prev) => {
      let step = prev;

      if (step >= NUMBER_OF_STEPS) step = NUMBER_OF_STEPS;
      else step = prev + 1;

      return step;
    });
  };
  const handleStepBack = () => {
    setStep(() => {
      if (step >= 2) return step - 1;
      else return step;
    });
  };
  const handleEmail = async () => {
    if (userDetails && donationDetails && paymentDetails) {
      const emailData = {
        ...userDetails,
        ...donationDetails,
        amount: paymentDetails.amount,
      };

      const response = await fetch('api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userDetails.email,
          data: emailData,
        }),
      });

      if (response.status == 200) {
      }
    }

    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: userDetails.email,
    //     templateName: 'userDetailsSubmission',
    //     dynamicTemplateData: userDetails,
    //   }),
    // });
  };
  useEffect(() => {
    if (
      donationDetailsFormData?.donationFixedAmount > 0 ||
      donationDetailsFormData?.otherAmount > 0
    ) {
      setDonationDetails(donationDetailsFormData);
    }
  }, []);

  useEffect(() => {
    setPaymentDetails({
      amount:
        Number(donationDetails.otherAmount) > 0
          ? Number(donationDetails.otherAmount)
          : Number(donationDetails.donationFixedAmount) > 0
            ? Number(donationDetails.donationFixedAmount)
            : 1,
    });
  }, [donationDetails]);

  // useEffect(() => {
  //   configureStripeOptions();
  //   // 👇 The dependency array is correct and won't cause a loop.
  // }, [paymentDetails.amount, donationDetails.supportType]);

  {
    // useEffect(() => {
    //   console.log('clientSecret: ', clientSecret);
    //   if (clientSecret) {
    //     if (donationDetails.supportType === 'Recurring') {
    //       setElementsOptions({
    //         appearance,
    //         mode: 'setup',
    //         currency: 'gbp',
    //         clientSecret: clientSecret,
    //       } as unknown as StripeElementsOptions);
    //     } else {
    //       setElementsOptions({
    //         appearance,
    //         mode: 'payment',
    //         amount: Number(paymentDetails.amount) * 100,
    //         currency: 'gbp',
    //         clientSecret: clientSecret,
    //       } as unknown as StripeElementsOptions);
    //     }
    //   }
    // }, [clientSecret, donationDetails.supportType, paymentDetails.amount]);
  }
  return (
    <section className={styles.donation}>
      <Container>
        <div className={styles.stepbarWrapper}>
          <StepBar
            numOfSteps={NUMBER_OF_STEPS}
            step={step}
            successMessage={paymentSucceeded ? 'All Done! 🎉' : ''}
          />
          {step > 1 && !paymentSucceeded && (
            <Button onClick={handleStepBack} customClass={styles.btnStepBack}>
              Back
            </Button>
          )}
        </div>
        {!paymentSucceeded && (
          <div className={styles.flex}>
            <div className={styles.flexCol}>
              <DonationDetailsBox
                project={project}
                setProject={setProject}
                projects={PROJECTS}
                handleClick={handleStepChange}
                step={step}
                donationDetails={donationDetails}
                setDonationDetails={setDonationDetails}
                // isFetchingUser={isFetchingUser}
                // isLoggedIn={isLoggedIn}
                // setClientSecret={setClientSecret}
                // paymentDetails={paymentDetails}
              />
              <UserDetailsBox
                project={project}
                setProject={setProject}
                projects={PROJECTS}
                handleClick={handleStepChange}
                step={step}
                donationDetails={donationDetails}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                setClientSecret={setClientSecret}
              />
              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={
                    {
                      clientSecret,
                      appearance,
                      // amount:
                      //   donationDetails.supportType === 'Recurring'
                      //     ? undefined
                      //     : Number(paymentDetails.amount) * 100,
                      // mode: donationDetails.supportType === 'Recurring' ? undefined : 'payment',
                      // currency: 'gbp',
                    } as StripeElementsOptions
                  }
                >
                  <PaymentDetailsBox
                    project={project}
                    setProject={setProject}
                    projects={PROJECTS}
                    handleClick={handleStepChange}
                    step={step}
                    setPaymentDetails={setPaymentDetails}
                    setPaymentSucceeded={setPaymentSucceeded}
                    donationDetails={donationDetails}
                    clientSecret={clientSecret}
                    sendEmail={handleEmail}
                  />
                </Elements>
              ) : (
                <section className={styles.paymentBoxEmpty}>
                  <Heading level={2} className={styles.paymentBoxEmpty__heading}>
                    {step !== 3 && (
                      <span className={[styles.stepCompletionIcon].join(' ')}>
                        {/* <CheckVerified /> */}
                      </span>
                    )}
                    <span>Payment Details</span>
                  </Heading>
                </section>
              )}
            </div>
            <div className={styles.flexCol}>
              <div className={styles.donationCart}>
                <h2 className={styles.donationCartHeading}>Your Donation </h2>
                <div className={styles.flex}>
                  <div className={styles.projectName}>
                    <h3>{project.name}</h3>
                    <p>
                      {project.amountOptions
                        .filter((opt) => {
                          return Number(opt.amount) === Number(paymentDetails.amount);
                        })
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
                      {project.amountOptions[0].symbol} {paymentDetails.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {paymentSucceeded && (
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
        )} */}
      </Container>
    </section>
  );
}
