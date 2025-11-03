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

export default function About() {
  const keyMetrics = {
    content: {
      heading: {
        content: [
          {
            format: 'normal',
            text: 'Transforming Lives of Deaf Children',
          },
          {
            format: 'break',
          },
          {
            format: 'normal',
            text: ' Through Quality Education',
          },
        ],
      },
      // subHeading: 'About Us',
      description: {
        content: [
          {
            format: 'normal',
            text: 'Deaf Education Initiative is a non-profit organization committed to the education and empowerment of deaf children and youth in Pakistan. We believe every child deserves access to language, learning, and the tools to reach their full potential.',
          },
        ],
      },
      metrics: [
        {
          icon: <Student />,
          numbers: '2380+',
          text: 'Students currently enrolled across our 9 campuses',
        },
        {
          icon: <Employees />,
          numbers: '50,000+',
          text: 'Direct beneficiaries to date',
        },
        {
          icon: <Teacher />,
          numbers: '2750+',
          text: 'Deaf youth and adults found meaningful employment',
        },
      ],
    },
    // colors: {
    //   mainSection: { bgColor: 'var(--$dark-blue)' },
    //   heading: { textColor: 'var(--alabaster)' },
    //   description: { textColor: 'var(--alabaster)' },
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
