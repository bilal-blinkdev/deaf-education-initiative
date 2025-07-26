import React, { ReactNode, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import ChevronDown from '../../../graphics/ChevronDown';
import styles from './styles.module.scss';
import { SelectField } from 'payload';

type Project = {
  name: string;
  hint: string;
  amountOptions: { symbol: string; amount: string; period?: string | null }[];
};
type UserDetailsFormProps = {
  customClass?: string;
  project: Project;
  setProject: Function;
  projects: Project[];
  step: number;
  handleClick: (jumpToStep?: number) => void;
  userDetails: any;
  setUserDetails: any;
};
type customRadioProps = {
  children: ReactNode;
  inputType: 'radio';
  inputId: string;
  inputName: string;
  inputValue: string;
  handleChange: any;
};
type Country = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: number;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symol: string;
  native: string;
  region: string;
  subregion: string;
  emoji: string;
  tld: string;
  latitude: string;
  longitude: string;
  hasStates: boolean;
};
type State = {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  hasCities: boolean;
};

export default function UserDetails({
  customClass,
  project,
  setProject,
  projects,
  step,
  handleClick,
  userDetails,
  setUserDetails,
}: UserDetailsFormProps) {
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [states, setStates] = useState<IState[]>();
  const [cities, setCities] = useState<ICity[]>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setProject(projects[0]);
  }, []);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!userDetails.firstName) {
      newErrors.firstName = 'Please enter your first name.';
    }
    if (!userDetails.lastName) {
      newErrors.lastName = 'Please enter your last name.';
    }
    if (!userDetails.email) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!userDetails.country) {
      newErrors.country = 'Please select your country.';
    }
    if (!userDetails.state) {
      newErrors.state = 'Please enter your state.';
    }
    if (!userDetails.city) {
      newErrors.city = 'Please enter your city.';
    }
    if (!userDetails.address) {
      newErrors.address = 'Please enter your full address.';
    }
    if (!userDetails.zipCode) {
      newErrors.zipCode = 'Please enter your zip or postal code.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return false;
    } else {
      // no errors
      setErrors({});
      // proceed to next step
      // e.g. setStep(2) or navigate
      return true;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setUserDetails((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleCountryStateCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const countryCode = value;
      if (countryCode === '') {
        setUserDetails((prev: any) => ({ ...prev, state: '' }));
        setUserDetails((prev: any) => ({ ...prev, city: '' }));
      }

      setSelectedCountry(countryCode);
      setCities([]);

      const fetchedStates = State.getStatesOfCountry(countryCode);
      setStates(fetchedStates);

      const country = Country.getCountryByCode(countryCode);
      setUserDetails((prev: any) => ({ ...prev, [name]: country?.name }));
      return;
    } else if (name === 'state') {
      const stateCode = value;

      if (stateCode === '') {
        setUserDetails((prev: any) => ({ ...prev, city: '' }));
      }

      const fetchedCities = City.getCitiesOfState(selectedCountry, stateCode);
      setCities(fetchedCities);

      const state = State.getStateByCodeAndCountry(stateCode, selectedCountry);

      setUserDetails((prev: any) => ({ ...prev, [name]: state?.name }));
      return;
    } else if (name === 'city') {
      setUserDetails((prev: any) => ({ ...prev, [name]: value }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setUserDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) handleClick();
  };

  return (
    <section className={[styles.donation, customClass && styles[customClass]].join(' ')}>
      <div className={styles.donationCard}>
        <section className={styles.donationCardHeader}>
          <h2 className={[styles.donationCardHeading, step !== 2 && styles.marginBottom].join(' ')}>
            {step !== 2 && (
              <span className={[styles.stepCompletionIcon].join(' ')}>
                <CheckVerified />
              </span>
            )}
            <span>Your Details</span>
          </h2>
        </section>
        {step == 2 && (
          <form onSubmit={handleSubmit} className={styles.userDetails}>
            <div className={styles.twoColumnInput}>
              <div className={styles.inputGroup}>
                <p className={styles.inputGroupLabel}>
                  First name<span className={styles.required}>*</span>
                </p>
                <input
                  type="text"
                  name="firstName"
                  value={userDetails.firstName}
                  className={styles.input}
                  placeholder="First name"
                  onChange={handleChange}
                />
                {errors.firstName && <p className={styles.inputError}>{errors.firstName}</p>}{' '}
              </div>
              <div className={styles.inputGroup}>
                <p className={styles.inputGroupLabel}>
                  Last name<span className={styles.required}>*</span>
                </p>
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  className={styles.input}
                  placeholder="Last name"
                  onChange={handleChange}
                />
                {errors.lastName && <p className={styles.inputError}>{errors.lastName}</p>}{' '}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                Email address<span className={styles.required}>*</span>
              </p>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                className={styles.input}
                placeholder="john@gmail.com"
                onChange={handleChange}
              />
              {errors.email && <p className={styles.inputError}>{errors.email}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                Phone number <span className={styles.optional}>(optional)</span>
              </p>
              <input
                type="tel"
                name="phoneNumber"
                value={userDetails.phoneNumber}
                className={styles.input}
                placeholder="+44 01539 702257"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                Country<span className={styles.required}>*</span>
              </p>
              <select
                className={styles.input}
                name="country"
                // value={userDetails.country}
                onChange={handleCountryStateCityChange}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className={styles.iconSelect}>
                <ChevronDown />
              </div>
              {errors.country && <p className={styles.inputError}>{errors.country}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                State<span className={styles.required}>*</span>
              </p>
              <select
                className={styles.input}
                name="state"
                // value={userDetails.state}
                disabled={!states?.length}
                onChange={handleCountryStateCityChange}
              >
                <option value="">Select a state</option>
                {states &&
                  states.map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
              <div className={styles.iconSelect}>
                <ChevronDown />
              </div>
              {errors.state && <p className={styles.inputError}>{errors.state}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                City<span className={styles.required}>*</span>
              </p>
              <select
                className={styles.input}
                name="city"
                // value={userDetails.city}
                disabled={!cities?.length}
                onChange={handleCountryStateCityChange}
              >
                <option value="">Select a city</option>
                {cities &&
                  cities.map((city) => (
                    <option value={city.name} key={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
              <div className={styles.iconSelect}>
                <ChevronDown />
              </div>
              {errors.city && <p className={styles.inputError}>{errors.city}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                Address<span className={styles.required}>*</span>
              </p>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                className={styles.input}
                placeholder="Enter your address here"
                onChange={handleChange}
              />
              {errors.address && <p className={styles.inputError}>{errors.address}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                Zip/Postal code<span className={styles.required}>*</span>
              </p>
              <input
                type="text"
                name="zipCode"
                value={userDetails.zipCode}
                className={styles.input}
                placeholder="N1C 4AB"
                onChange={handleChange}
              />
              {errors.zipCode && <p className={styles.inputError}>{errors.zipCode}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>Leave comment</p>
              <textarea
                name="comments"
                value={userDetails.comments}
                className={styles.input}
                placeholder="Type here"
                onChange={handleChange}
                rows={6}
              ></textarea>
            </div>
            <Button type="submit" size="large" width="full" icons={{ leading: true }}>
              Continue to Payment Details
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
}: customRadioProps) {
  return (
    <div className={styles.customRadio}>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
      />
      <label htmlFor={inputId} className={styles.donationCustomLabel}>
        {children}
      </label>
    </div>
  );
}
