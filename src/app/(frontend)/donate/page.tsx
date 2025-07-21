import Banner from '@/components/blocks/Banner';
import DeafGirlStudying from '@/assets/deaf-girl-studying.webp';
import HeadingDescription from '@/components/blocks/HeadingDescription';
import Donation from '@/components/blocks/Donation';

import { cookies } from 'next/headers';

export default async function Donate() {
  const cookieStore = await cookies();
  const donationDataCookie = cookieStore.get('donationData');
  const donationData = donationDataCookie ? JSON.parse(donationDataCookie.value) : {};

  const content = {
    heading: { text: 'Give Deaf Children the Chance to Learn' },
    subHeading: 'Transform Lives Today',
    description: {
      text: 'Your generous support today can enable countless deaf children to access their basic right to education and turn their dreams into reality.',
    },
  };

  return (
    <>
      <Banner src={DeafGirlStudying} alt="Deaf Girl Studying" />
      <HeadingDescription content={content} />
      <Donation donationDetailsFormData={donationData} />
    </>
  );
}
