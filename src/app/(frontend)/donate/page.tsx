import Banner from '@/components/blocks/Banner';
import BannerImage from '@/assets/deaf-children-in-classroom.webp';
import HeadingDescription from '@/components/blocks/HeadingDescription';
import Donation from '@/components/blocks/Donation';

import { cookies } from 'next/headers';
import { fetchProjects } from '@/app/lib/payload/fetchProjects';

export default async function Donate() {
  const cookieStore = await cookies();
  const donationDataCookie = cookieStore.get('donationData');
  const donationData = donationDataCookie ? JSON.parse(donationDataCookie.value) : {};

  let projects = await fetchProjects();

  if (projects.length === 0) {
    return (
      <section style={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Donations are temporarily unavailable.</h2>
        <p>Please check back later.</p>
      </section>
    );
  }

  const content = {
    heading: { text: 'Give Deaf Children the Chance to Learn' },
    subHeading: 'Transform Lives Today',
    description: {
      text: 'Your generous support today can enable countless deaf children to access their basic right to education and turn their dreams into reality.',
    },
  };

  return (
    <>
      <Banner src={BannerImage} alt="Banner Image" />
      <HeadingDescription content={content} />
      <Donation projects={projects} donationDetailsFormData={donationData} />
    </>
  );
}
