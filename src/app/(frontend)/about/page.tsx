import Banner from '@/components/blocks/Banner';
import ChildrenSmiling from '@/assets/children-smiling.webp';
import Student from '@/graphics/Student';
import Employees from '@/graphics/Employees';
import Teacher from '@/graphics/Teacher';
import KeyMetrics from '@/components/blocks/KeyMetrics';
// import OurVision from '@/components/blocks/OurVision';
import TextImageCta from '@/components/blocks/TextImageCta';
import IconTextCards from '@/components/blocks/IconTextCards';
import LogoSliderBlock from '@/components/blocks/LogoSlider';
import SubscriptionBlock from '@/components/blocks/Subscription';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import TextCtaWithBgImage from '@/components/blocks/TextCtaWithBgImage';
import OurVision from '@/components/blocks/OurVision';
import styles from './page.module.scss';
import PeopleChatting from '@/graphics/PeopleChatting';
import Globe from '@/graphics/Globe';

export default function About() {
  const keyMetrics = {
    content: {
      heading: {
        content: [
          {
            format: 'normal',
            text: 'In Pakistan, more than 95% of deaf children ',
          },
          {
            format: 'break',
          },
          {
            format: 'normal',
            text: 'of school-going age are deprived of their right to education.',
          },
        ],
      },
      description: {
        content: [
          {
            format: 'bold',
            text: 'Deaf Education Initiative is striving to ensure that no deaf child goes without literacy and learning.',
          },
          {
            format: 'break',
          },
          {
            format: 'normal',
            text: ' We are a non-profit organization, registered with the Charity Commission UK, which is working to empower underserved deaf children and youth in Pakistan. We support the Deaf Reach Program in Pakistan, which is working on empowering the Deaf Community by providing a full circle solution from education, skills training, and teacher development to parent training and job placements.',
          },
        ],
      },
      metrics: [
        {
          icon: <Student />,
          numbers: '2500+',
          text: 'Students Currently Enrolled',
        },
        {
          icon: <Employees />,
          numbers: '50,000+',
          text: 'Direct Beneficiaries',
        },
        {
          icon: <Teacher />,
          numbers: '2750+',
          text: 'Deaf Persons Employed',
        },
        {
          icon: <PeopleChatting />,
          numbers: '7500+',
          text: 'Words PSL Dictionary',
        },
        {
          icon: <Globe />,
          numbers: '107',
          text: 'Sites Across Pakistan',
        },
      ],
    },
    // colors: {
    //   mainSection: { bgColor: 'var(--white)' },
    //   heading: { textColor: 'var(--ebony)' },
    //   description: { textColor: 'var(--ebony)' },
    // },
  };
  return (
    <>
      <Banner src={ChildrenSmiling} alt="Children Smiling" />
      <KeyMetrics keyMetrics={keyMetrics} />
      <OurVision />
      <TextImageCta sectionClass="awardsAndRecognition" />
      <IconTextCards sectionClass="ourCoreValues" />
      <TextCtaWithBgImage sectionClass="organizationInfo" />
      <LogoSliderBlock />
      <TwoColumnCard className={styles.donationCtaBlock} />
      <SubscriptionBlock />
    </>
  );
}
