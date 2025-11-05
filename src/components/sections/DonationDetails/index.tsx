'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import DonatingHand from '@/assets/hand-donating.webp';
import styles from './styles.module.scss';
import ChevronDown from '@/graphics/ChevronDown';
import CircleNotch from '@/graphics/CircleNotch';
import Link from 'next/link';

type Project = {
  name: string;
  hint: string;
  amountOptions: { id: string; symbol: string; amount: string; period?: string | null }[];
};
type DonationDetailsProps = {
  customClass?: string;
  project: Project;
  setProject: any;
  projects: Project[];
  step?: number;
  handleClick: (jumpToStep?: number) => void;
  donationDetails: any;
  setDonationDetails: any;
  setClientSecret?: (secret: string) => void;
  paymentDetails?: any;
  isFetchingUser: boolean;
  isLoggedIn: boolean;
  slug?: string;
};
type customRadioProps = {
  children: ReactNode;
  inputType: 'radio';
  inputId: string;
  inputName: string;
  inputValue: string;
  handleChange: any;
  checked: any;
  disabled?: boolean;
};

export default function DonationDetails({
  customClass,
  project,
  setProject,
  projects,
  step,
  handleClick,
  donationDetails,
  setDonationDetails,
  paymentDetails,
  setClientSecret,
  isFetchingUser = false,
  isLoggedIn = false,
  slug = 'home',
}: DonationDetailsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(projects[0]);
  const [disableAmountOptions, setDisableAmountOptions] = useState(false);
  const [isStripeIntentLoading, SetIsStripeIntentLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const otherAmountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (donationDetails?.donationFixedAmount > 0 || donationDetails?.otherAmount > 0) {
      const proj = projects.find((p) => p.name === donationDetails.projectType);

      setSelectedProject(proj);
      setProject(proj);
    } else if (projects && projects.length > 0) {
      setSelectedProject(projects[0]);
      setProject(projects[0]);
      setDonationDetails((prev: any) => ({
        ...prev,
        projectType: projects[0].name,
        donationFixedAmount: projects[0].amountOptions[0]?.amount || '',
      }));
    }
  }, []);
  useEffect(() => {
    if (otherAmountRef.current && Number(otherAmountRef.current.value) > 0) {
      setDisableAmountOptions(true);
    } else {
      setDisableAmountOptions(false);
    }
  }, [selectedProject]);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!donationDetails.projectType) {
      newErrors.projectType = 'Please select a project.';
    }
    if (!donationDetails.supportType) {
      newErrors.supportType = 'Please choose a support type.';
    }
    if (donationDetails.donationFixedAmount <= 1 && donationDetails.otherAmount < 1) {
      newErrors.donationFixedAmount = 'Please select or enter a valid donation amount.';
      newErrors.otherAmount = 'Please select or enter a valid donation amount.';
    }

    if (!donationDetails.donationType) {
      newErrors.donationType = 'Please choose donation type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (pathname === '/donate') return false;
    }

    // no errors
    if (pathname === '/donate') setErrors({});
    // proceed to next step
    // e.g. setStep(2) or navigate
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;

    if (name === 'projectType') {
      const proj = projects.find((p) => p.name === value);
      setSelectedProject(proj);
      setProject(proj);
      setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
    } else if (name === 'otherAmount' && Number(value) >= 1) {
      setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
      setDisableAmountOptions(true);
    } else if (name === 'otherAmount' && Number(value) < 1) {
      setDonationDetails((prev: any) => ({ ...prev, [name]: '' }));
      setDisableAmountOptions(false);
    } else {
      setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
      setDisableAmountOptions(false);
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    console.log(selectedProject);

    if (pathname === '/donate' && typeof setClientSecret === 'function' && paymentDetails) {
      SetIsStripeIntentLoading(true);
      try {
        let priceId: string | null = null;
        let endpoint = '/api/stripe/create-payment-intent';
        let body: object;

        if (donationDetails.supportType === 'Recurring') {
          if (!isLoggedIn) {
            setErrors({ supportType: 'Please log in for recurring donations.' });
            return;
          }
          console.log(project);

          const selectedOption = selectedProject?.amountOptions.find(
            (opt) => opt.amount === donationDetails.donationFixedAmount,
          );

          if (!selectedOption?.id) {
            // We check for 'id' which is your priceId
            setErrors({ donationFixedAmount: 'Please select a valid recurring plan.' });
            return;
          }
          priceId = selectedOption.id;
          console.log(priceId);

          endpoint = '/api/stripe/create-setup-intent';
          body = { priceId };
        } else {
          body = { amount: Number(paymentDetails.amount) * 100 };
        }
        console.log(body);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          handleClick();
        } else {
          // Handle cases where the API call fails
          setErrors({ projectType: data.error || 'Failed to initialize payment.' });
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ projectType: 'An unknown error occurred.' });
      } finally {
        SetIsStripeIntentLoading(false);
      }
    } else if (pathname === '/' || pathname.includes(slug)) {
      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
        await axios.post('/donation-form', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        router.push('/donate');
      } catch (error) {
        console.error('Donation form submission failed:', error);
      }
    }
  };

  return (
    <section className={[styles.donationDetails, customClass && customClass].join(' ')}>
      <div className={styles.donationCard}>
        <section className={styles.donationCardHeader}>
          {pathname === '/' || pathname.includes(slug) || pathname.includes('/our-programs/') ? (
            <>
              <Image src={DonatingHand} className={styles.donatingHandIcon} alt="Donating Hand" />
              <h1 className={styles.donationCardHeadingHome}>Take Action for Deaf Education</h1>
            </>
          ) : null}
          {pathname === '/donate' && (
            <h2
              className={[styles.donationCardHeading, step !== 1 && styles.marginBottom].join(' ')}
            >
              {step !== 1 && (
                <span className={[styles.stepCompletionIcon].join(' ')}>
                  <CheckVerified />
                </span>
              )}
              <span>Donation Details</span>
            </h2>
          )}
        </section>
        {(pathname === '/' ||
          pathname.includes(slug) ||
          pathname.includes('/our-programs/') ||
          step == 1) && (
          <form className={styles.donationForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Project Supported </p>
              <select
                name="projectType"
                value={donationDetails.projectType}
                className={styles.input}
                onChange={handleInputChange}
              >
                {projects.map((project, index) => (
                  <option value={project.name} className={styles.option} key={index}>
                    {project.name}
                  </option>
                ))}
              </select>
              <div className={styles.iconSelect}>
                <ChevronDown />
              </div>{' '}
              {errors.projectType && <p className={styles.inputError}>{errors.projectType}</p>}{' '}
              {!errors.projectType && <p className={styles.inputHint}>{selectedProject?.hint}</p>}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Choose support type</p>
              <div className={styles.donationButtons}>
                <CustomRadio
                  inputType="radio"
                  inputId="giveOnce"
                  inputName="supportType"
                  inputValue="Give Once"
                  handleChange={handleInputChange}
                  checked={donationDetails.supportType}
                >
                  Give Once
                </CustomRadio>
                <CustomRadio
                  inputType="radio"
                  inputId="recurring"
                  inputName="supportType"
                  inputValue="Recurring"
                  handleChange={handleInputChange}
                  checked={donationDetails.supportType}
                  disabled={!isLoggedIn}
                >
                  {isFetchingUser ? (
                    <CircleNotch color="var(--dark-blue)" className={styles.loadingIcon} />
                  ) : (
                    'Recurring Donation'
                  )}
                </CustomRadio>
              </div>
              {errors.supportType && <p className={styles.inputError}>{errors.supportType}</p>}{' '}
              {/* {!isLoggedIn && (
                <p className={styles.loginMessage}>
                  Please{' '}
                  <Link href="/login" className={styles.loginLink}>
                    login
                  </Link>{' '}
                  for recurring payments
                </p>
              )}{' '} */}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Choose an amount to give once</p>
              <div className={styles.donationFixedAmounts}>
                {selectedProject &&
                  selectedProject?.amountOptions.map((amount, index) => (
                    <CustomRadio
                      inputType="radio"
                      inputId={amount.amount}
                      inputName="donationFixedAmount"
                      inputValue={amount.amount}
                      handleChange={handleInputChange}
                      checked={donationDetails.donationFixedAmount}
                      disabled={disableAmountOptions}
                      key={index}
                    >
                      {amount.symbol} {amount.amount}
                      {amount?.period &&
                      amount.period.includes('month') &&
                      amount.period.includes('year')
                        ? '/' + amount.period
                        : amount.period && amount.period.includes('')
                          ? ' - ' + amount.period
                          : null}
                    </CustomRadio>
                  ))}
              </div>
              {errors.donationFixedAmount && (
                <p className={styles.inputError}>{errors.donationFixedAmount}</p>
              )}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Other amount</p>
              <input
                type="number"
                name="otherAmount"
                value={donationDetails.otherAmount ? donationDetails.otherAmount : ''}
                className={styles.input}
                placeholder="£ 500"
                onChange={handleInputChange}
                ref={otherAmountRef}
              />
              {errors.otherAmount && <p className={styles.inputError}>{errors.otherAmount}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Choose donation type</p>
              <select
                className={styles.input}
                name="donationType"
                onChange={handleInputChange}
                value={donationDetails.donationType}
              >
                <option value="donation">Donation</option>
                <option value="zakat">Zakat</option>
              </select>
              <div className={styles.iconSelect}>
                <ChevronDown />
              </div>
              {errors.donationType && <p className={styles.inputError}>{errors.donationType}</p>}{' '}
              {/* {!errors.donationType && (
                <p className={styles.inputHint}>This is a hint text to help user.</p>
              )} */}
            </div>
            <Button
              type="submit"
              size="large"
              width="full"
              icons={{ leading: true }}
              loading={isStripeIntentLoading}
              disabled={isStripeIntentLoading}
            >
              {pathname === '/donate' ? 'Continue to Personal Details' : 'Donate Now'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function CustomRadio({
  children,
  inputType,
  inputId,
  inputName,
  inputValue,
  handleChange,
  checked,
  disabled,
}: customRadioProps) {
  return (
    <div className={styles.customRadio}>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
        checked={checked === inputValue}
        disabled={disabled}
      />
      <label htmlFor={inputId} className={styles.donationCustomLabel}>
        {children}
      </label>
    </div>
  );
}
