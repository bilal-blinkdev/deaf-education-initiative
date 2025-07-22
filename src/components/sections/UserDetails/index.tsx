import { ReactNode, useEffect, useState } from 'react';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import styles from './styles.module.scss';

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic (Czechia)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini (fmr. Swaziland)',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  useEffect(() => {
    setProject(projects[0]);
  }, []);
  useEffect(() => {
    console.log(errors);
  });

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
      // if (pathname === '/donate') setIsValid(false);
      return false;
    } else {
      // no errors
      // if (pathname === '/donate') setIsValid(true);
      setErrors({});
      // proceed to next step
      // e.g. setStep(2) or navigate
      return true;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setUserDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    console.log('isValid', isValid);

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
                value={userDetails.country}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <p className={styles.inputError}>{errors.country}</p>}{' '}
            </div>
            <div className={styles.inputGroup}>
              <p className={styles.inputGroupLabel}>
                City<span className={styles.required}>*</span>
              </p>
              <select
                className={styles.input}
                name="city"
                value={userDetails.city}
                onChange={handleChange}
              >
                <option value="">Select a city</option>
                {countries.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
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
