import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import ActionCare from '@/assets/partner-logos/action-care.webp';
import AfeefGroup from '@/assets/partner-logos/afeef-group.webp';
import AustralianAid from '@/assets/partner-logos/australian-aid.webp';
import CoinCanada from '@/assets/partner-logos/coin-canada.webp';
import Cosaraf from '@/assets/partner-logos/cosaraf.webp';
import EdtechHub from '@/assets/partner-logos/edtech-hub.webp';
import EtihadAirways from '@/assets/partner-logos/etihad-airways.webp';
import Facebook from '@/assets/partner-logos/facebook.webp';
import HumanConcernInternational from '@/assets/partner-logos/human-concern-international.webp';
import Idrf from '@/assets/partner-logos/idrf.webp';
import Kfc from '@/assets/partner-logos/kfc.webp';
import KhakiFoundation from '@/assets/partner-logos/khaki-foundation.webp';
import Philips from '@/assets/partner-logos/philips.webp';
import theICareFoundation from '@/assets/partner-logos/the-i-care-foundation.webp';
import UsAid from '@/assets/partner-logos/us-aid.webp';
import styles from './styles.module.scss';

export default function LogosGrid() {
  const logos = [
    { logo: { image: ActionCare } },
    { logo: { image: AfeefGroup } },
    { logo: { image: AustralianAid } },
    { logo: { image: CoinCanada } },
    { logo: { image: Cosaraf } },
    { logo: { image: EdtechHub } },
    { logo: { image: EtihadAirways } },
    { logo: { image: Facebook } },
    { logo: { image: HumanConcernInternational } },
    { logo: { image: Idrf } },
    { logo: { image: Kfc } },
    { logo: { image: KhakiFoundation } },
    { logo: { image: Philips } },
    { logo: { image: theICareFoundation } },
    { logo: { image: UsAid } },
  ];
  return (
    <section className={styles.logosGrid}>
      <Container>
        <div className={styles.grid}>
          {logos.map((logo, index) => (
            <div className={styles.gridItem} key={index}>
              <Image src={logo.logo.image} alt="" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
