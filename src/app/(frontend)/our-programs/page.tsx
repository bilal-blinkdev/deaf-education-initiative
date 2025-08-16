import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';
import MainBanner from '@/assets/programs/student-sitting-in-class-smiling.webp';
import Banner from '@/components/blocks/Banner';
import Text from '@/components/blocks/Text';
import CardsSlider from '@/components/blocks/CardsSlider';
import JobPlacement from '@/components/blocks/JobPlacement';
import TeacherTraining from '@/components/blocks/TeacherTraining';
import ParentTraining from '@/components/blocks/ParentTraining';
import DigitalSignTraining from '@/components/blocks/DigitalSignTraining';

export default function OurPrograms() {
  const textBlockContent = {
    heading: { text: 'So Here’s What We Do...', align: 'center' },
    headingOverline: { text: 'Our Programs', align: 'center', color: 'var(--dodger-blue)' },
    description: {
      text: 'Through the Deaf Reach Program, DEI works to address the critical need for Deaf education and empowerment in Pakistan. Deaf Reach is continually expanding its programs to empower marginalized urban and rural deaf youth, the majority of whom are economically challenged, to provide them a brighter future.',
      align: 'center',
    },
  } as const;
  return (
    <>
      <Banner src={MainBanner} alt="Student sitting in the class smiling" />
      <Text content={textBlockContent} />
      <CardsSlider />
      <JobPlacement />
      <TeacherTraining />
      <ParentTraining />
      <DigitalSignTraining />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
