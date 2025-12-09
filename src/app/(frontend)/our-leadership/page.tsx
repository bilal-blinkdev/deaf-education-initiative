import PageTitle from '@/components/blocks/PageTitle';
import UsmanJavaid from '@/assets/team/usman-javaid-chair.webp';
import Butool from '@/assets/team/butool-shakil-abbas-trustee.webp';
import Sajida from '@/assets/team/sajida-bandukwala-trustee.webp';
import AtifAlvi from '@/assets/team/atif-alvi-trustee.webp';
import Richard from '@/assets/team/richard-geary-founder.webp';
import Heidi from '@/assets/team/heidi-gustanski-geary-advisor.webp';
import MuhammadAmin from '@/assets/team/amin-markatia-fesfna.webp';
import IrfanBurney from '@/assets/team/irfan-burney.webp';
import TeamMembers from '@/components/blocks/TeamMembers';
import LogoSliderBlock from '@/components/blocks/LogoSlider';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';

export default function OurLeadership() {
  const trustees = [
    {
      name: 'Usman Javaid',
      image: UsmanJavaid,
      role: 'Chair',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
    {
      name: 'Butool Shakil Abbas',
      image: Butool,
      role: 'Trustee',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
    {
      name: 'Sajida Bandukwala',
      image: Sajida,
      role: 'Trustee',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
    {
      name: 'Atif Alvi',
      image: AtifAlvi,
      role: 'Trustee',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
  ];
  const management = [
    {
      name: 'Richard Geary',
      image: Richard,
      role: 'Founder & Director Programs, Deaf Reach',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
    {
      name: 'Heidi Gustanski-Geary',
      image: Heidi,
      role: 'Deaf Education Advisor',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
  ];
  const advisory = [
    {
      name: 'Muhammad Amin Markatia',
      image: MuhammadAmin,
      role: 'Advisor',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
    {
      name: 'Irfan Burney',
      image: IrfanBurney,
      role: 'Advisor',
      socialLinks: { linkedIn: { url: 'https://linkedin.com', alt: '' } },
    },
  ];
  return (
    <>
      <PageTitle
        title="Meet Our Team"
        breadcrumbs="About > Team"
        description="Committed to building a brighter future for the Deaf, meet the team who makes it all possible."
      />
      <TeamMembers teamName="Trustees" teamMembers={trustees} />
      <TeamMembers teamName="Management Team" teamMembers={management} />
      <TeamMembers teamName="Advisory Team" teamMembers={advisory} />
      <LogoSliderBlock />
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
