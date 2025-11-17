import { ReactNode, useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import styles from './styles.module.scss';
import { Project } from '@/payload-types';

// type Project = {
//   name: string;
//   hint: string;
//   amountOptions: { symbol: string; amount: string; period?: string | null }[];
// };
type PaymentDetailsProps = {
  customClass?: string;
  project: Project;
  setProject: Function;
  projects: Project[];
  step: number;
  handleClick: (jumpToStep?: number) => void;
  setPaymentDetails: any;
  setPaymentSucceeded: any;
  donationDetails: any;
  clientSecret: string;
  sendEmail: () => void;
};
type customRadioProps = {
  children: ReactNode;
  inputType: 'radio';
  inputId: string;
  inputName: string;
  inputValue: string;
  handleChange: any;
};

export default function PaymentDetails({
  customClass,
  project,
  setProject,
  projects,
  step,
  handleClick,
  setPaymentDetails,
  setPaymentSucceeded,
  donationDetails,
  clientSecret,
  sendEmail,
}: PaymentDetailsProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProject(projects[0]);
  }, []);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // A check to guide users to log in for recurring payments
    // if (donationDetails.supportType === 'Recurring' && !isLoggedIn) {
    //   console.log('isLoggedIn', isLoggedIn);
    //   // Check login here
    //   setErrorMessage('Please log in or sign up to start a recurring donation.');
    //   setLoading(false);
    //   return;
    // }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    let error;

    const return_url = `${window.location.origin}/donate/thank-you`;

    if (donationDetails.supportType === 'Recurring') {
      // For 'setup' mode, use confirmSetup
      const { error: setupError } = await stripe.confirmSetup({
        elements,
        clientSecret,
        confirmParams: {
          return_url,
        },
        redirect: 'if_required',
      });
      error = setupError;
    } else {
      // For 'payment' mode, use confirmPayment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url,
        },
        redirect: 'if_required',
      });
      error = paymentError;
    }

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setPaymentSucceeded(false);
    } else {
      // Success! No error was returned.
      setPaymentSucceeded(true);
      sendEmail();
      window.location.href = return_url;
    }

    setLoading(false);
  };
  return (
    <section className={[styles.donation, customClass && styles[customClass]].join(' ')}>
      <div className={styles.donationCard}>
        <section className={styles.donationCardHeader}>
          <h2 className={[styles.donationCardHeading, step !== 3 && styles.marginBottom].join(' ')}>
            {step !== 3 && (
              <span className={[styles.stepCompletionIcon].join(' ')}>
                <CheckVerified />
              </span>
            )}
            <span>Payment Details</span>
          </h2>
        </section>
        {step == 3 && (
          <form onSubmit={handleSubmit} className={styles.userDetails}>
            <PaymentElement />
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <Button
              type="submit"
              size="large"
              width="full"
              icons={{ leading: true }}
              disabled={!stripe || loading}
              customClass={styles.btnPayment}
            >
              {!loading ? 'Complete Donation' : 'Processing...'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
