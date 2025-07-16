import { ReactNode, useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '@/components/elements/Button';
import CheckVerified from '@/graphics/CheckVerified';
import styles from './styles.module.scss';

type Project = {
  name: string;
  hint: string;
  amountOptions: { symbol: string; amount: string; period?: string | null }[];
};
type PaymentDetailsProps = {
  customClass?: string;
  project: Project;
  setProject: Function;
  projects: Project[];
  step: number;
  amount: number;
  handleClick: () => void;
  setPaymentDetails: any;
  setPaymentSucceeded: any;
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
  amount,
  handleClick,
  setPaymentDetails,
  setPaymentSucceeded,
}: PaymentDetailsProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

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
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Number(amount) * 100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log('hit');

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment Failed');
      setPaymentSucceeded(false);
      setLoading(false);
    }
    if (paymentIntent?.status == 'succeeded') {
      setLoading(false);
      setPaymentSucceeded(true);
    }
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
            {clientSecret && <PaymentElement />}
            {false && (
              <>
                <div className={styles.inputGroup}>
                  <p className={styles.inputGroupLabel}>
                    Card Holder&apos;s Name
                    <span className={styles.required}>*</span>
                  </p>
                  <input
                    type="text"
                    name="cardHolderName"
                    className={styles.input}
                    placeholder="Seen on card"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.twoColumnInput}>
                  <div className={styles.inputGroup}>
                    <p className={styles.inputGroupLabel}>
                      Expiry<span className={styles.required}>*</span>
                    </p>
                    <input
                      type="text"
                      name="expiry"
                      className={styles.input}
                      placeholder="MM/YY"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <p className={styles.inputGroupLabel}>
                      Security Code<span className={styles.required}>*</span>
                    </p>
                    <input
                      type="text"
                      name="lastName"
                      className={styles.input}
                      placeholder="CVC"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <p className={styles.inputGroupLabel}>
                    Email address<span className={styles.required}>*</span>
                  </p>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="john@gmail.com"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <p className={styles.inputGroupLabel}>
                    Country<span className={styles.required}>*</span>
                  </p>

                  <select className={styles.input} onChange={handleChange}>
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                      <option value={country} key={index}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <Button size="large" width="full" icons={{ leading: true }} onClick={handleClick}>
                  Continue to Payment Details
                </Button>
              </>
            )}
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <Button
              type="submit"
              size="large"
              width="full"
              icons={{ leading: true }}
              disabled={!stripe || loading}
            >
              {!loading ? 'Complete Donation' : 'Processing...'}
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
