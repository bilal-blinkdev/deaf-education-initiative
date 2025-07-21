'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import DonatingHand from '@/assets/hand-donating.webp';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [shouldValidateAndSubmit, setShouldValidateAndSubmit] = useState(false);

  useEffect(() => {
    console.log(donationDetails);

    if (donationDetails?.donationFixedAmount > 1) {
      console.log('yt');
      const selectedProject = projects.find((p) => p.name === donationDetails.projectType);
      console.log('selectedProject', selectedProject);

      setSelectedProject(selectedProject);
    } else if (projects && projects.length > 0) {
      console.log('yt2');
      setSelectedProject(projects[0]);

      setDonationDetails((prev: any) => ({
        ...prev,
        projectType: projects[0].name,
        donationFixedAmount: projects[0].amountOptions[0]?.amount || '',
      }));
    }
  }, []);

  useEffect(() => {
    if (shouldValidateAndSubmit) {
      const isValid = validate();

      if (isValid) {
        if (pathname === '/donate') {
          handleClick();
        } else if (pathname === '/') {
          // Handle form submission logic here
          router.push('/donate');
        }
      }

      setShouldValidateAndSubmit(false);
    }
  }, [donationDetails, shouldValidateAndSubmit]);
  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!donationDetails.projectType) {
      newErrors.projectType = 'Please select a project.';
    }
    if (!donationDetails.supportType) {
      newErrors.supportType = 'Please choose a support type.';
    }
    if (
      !donationDetails.donationFixedAmount &&
      (!donationDetails.otherAmount || donationDetails.otherAmount <= 0)
    ) {
      newErrors.donationFixedAmount = 'Please select or enter a valid donation amount.';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'projectType') {
      const selectedProject = projects.find((p) => p.name === value);
      setSelectedProject(selectedProject);
      setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
    } else setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: any) => {
    let { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'projectType') {
      const selectedProject = projects.find((p) => p.name === value);
      setSelectedProject(selectedProject);
      setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
    } else setDonationDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      if (pathname === '/donate') {
        setShouldValidateAndSubmit(true);
      } else if (pathname === '/') {
        const form = e.currentTarget;
        const formData = new FormData(form);
        console.log('formData', formData);

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
    }
  };

  return (
    <section
      className={[styles.donationDetails, customClass && styles[customClass]].join(' ')}
      onClick={() => handleClick(1)}
    >
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
                onChange={handleSelectChange}
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
                value={donationDetails.otherAmount ?? 0}
                className={styles.input}
                placeholder="£ 500"
                onChange={handleInputChange}
              />
              {errors.otherAmount && <p className={styles.inputError}>{errors.otherAmount}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Choose donation type</p>
              <select
                className={styles.input}
                name="donationType"
                onChange={handleSelectChange}
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
      />
      <label htmlFor={inputId} className={styles.donationCustomLabel}>
        {children}
      </label>
    </div>
  );
}
