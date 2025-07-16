import Banner from '@/components/blocks/Banner';
import DeafGirlStudying from '@/assets/deaf-girl-studying.webp';
import HeadingDescription from '@/components/blocks/HeadingDescription';
import Donation from '@/components/blocks/Donation';

export default function Donate() {
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
      <Donation />
    </>
  );
}
