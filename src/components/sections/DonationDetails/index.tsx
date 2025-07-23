'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import DonatingHand from '@/assets/hand-donating.webp';
import styles from './styles.module.scss';

type Project = {
  name: string;
  hint: string;
  amountOptions: { symbol: string; amount: string; period?: string | null }[];
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
  setIsValid?: any;
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
  setIsValid,
}: DonationDetailsProps) {
  const pathname = usePathname();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(projects[0]);
  const [disableAmountOptions, setDisableAmountOptions] = useState(false);
  const otherAmountRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (donationDetails?.donationFixedAmount > 0 || donationDetails?.otherAmount > 0) {
      const selectedProject = projects.find((p) => p.name === donationDetails.projectType);

      setSelectedProject(selectedProject);
      setProject(selectedProject);
    } else if (projects && projects.length > 0) {
      setSelectedProject(projects[0]);
      setDonationDetails((prev: any) => ({
        ...prev,
        projectType: projects[0].name,
        donationFixedAmount: projects[0].amountOptions[0]?.amount || '',
      }));
    }
    if (otherAmountRef.current && Number(otherAmountRef.current.value) > 0) {
      setDisableAmountOptions(true);
    } else {
      setDisableAmountOptions(false);
    }
  }, []);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!donationDetails.projectType) {
      newErrors.projectType = 'Please select a project.';
    }
    if (!donationDetails.supportType) {
      newErrors.supportType = 'Please choose a support type.';
    }
    if (donationDetails.donationFixedAmount <= 1 && donationDetails.otherAmount <= 1) {
      newErrors.donationFixedAmount = 'Please select or enter a valid donation amount.';
      newErrors.otherAmount = 'Please select or enter a valid donation amount.';
    }

    if (!donationDetails.donationType) {
      newErrors.donationType = 'Please choose donation type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (pathname === '/donate') setIsValid(false);
      return false;
    }

    // no errors
    if (pathname === '/donate') setIsValid(true);
    setErrors({});
    // proceed to next step
    // e.g. setStep(2) or navigate
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;

    if (name === 'projectType') {
      const selectedProject = projects.find((p) => p.name === value);
      setSelectedProject(selectedProject);
    }
    if (name === 'otherAmount' && Number(value) > 0) {
      setDisableAmountOptions(true);
    } else {
      setDisableAmountOptions(false);
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      if (pathname === '/donate') {
        // setIsValid(true);
        handleClick();
      } else if (pathname === '/') {
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
          await axios.post('/donation-form', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          router.refresh();
          router.push('/donate');
          const t = setInterval(() => {
            router.push('/donate');
          }, 1000);
        } catch (error) {
          console.error('Donation form submission failed:', error);
        }
      }
    }
  };

  return (
    <section className={[styles.donationDetails, customClass && styles[customClass]].join(' ')}>
      <div className={styles.donationCard}>
        <section className={styles.donationCardHeader}>
          {pathname === '/' && (
            <>
              <Image src={DonatingHand} className={styles.donatingHandIcon} alt="Donating Hand" />
              <h1 className={styles.donationCardHeadingHome}>Take Action for Deaf Education</h1>
            </>
          )}
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
        {(pathname === '/' || step == 1) && (
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
              </select>{' '}
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
                >
                  Recurring Donation
                </CustomRadio>
              </div>
              {errors.supportType && <p className={styles.inputError}>{errors.supportType}</p>}{' '}
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
                value={donationDetails.otherAmount ? donationDetails.otherAmount : 0}
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
                <option value="zakat">Zakat</option>
                <option value="charity">Charity</option>
              </select>
              {errors.donationType && <p className={styles.inputError}>{errors.donationType}</p>}{' '}
              {!errors.donationType && (
                <p className={styles.inputHint}>This is a hint text to help user.</p>
              )}
            </div>
            <Button type="submit" size="large" width="full" icons={{ leading: true }}>
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
