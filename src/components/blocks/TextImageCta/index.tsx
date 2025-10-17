import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import CivilAward from '@/assets/civil-award-to-deaf-reach.webp';
import Medal from '@/assets/tamgha-e-imtiaz.webp';
import styles from './styles.module.scss';

type TextImageCtaProps = {
  sectionClass: string;
  customClass?: string;
};

export default function TextImageCta({ sectionClass, customClass }: TextImageCtaProps) {
  return (
    <section className={`${styles[sectionClass ?? '']} ${customClass}`}>
      <Container customClass={styles.container}>
        <Image src={Medal} alt="" className={styles.medalImage} />
        <div className={styles.flexBox}>
          <div className={styles.flexCol}>
            <p className={styles.subHeading}>Awards & Recognition</p>
            <h2 className={styles.heading}>Civil Award of Sitara-i-Khidmat</h2>
            <blockquote className={styles.quote}>
              <p className={styles.description}>
                &ldquo;If we view the Deaf community not as a disability group, but as a minority
                culture that speaks another language (Sign Language), our perception changes. We
                then realize that to succeed, the Deaf simply need empowerment through education —
                the same opportunity that is everyone&apos;s right.&rdquo;
              </p>
            </blockquote>
            <p className={styles.quoteAuthor}>
              — Richard Geary,{' '}
              <cite className={styles.quoteCite}>
                recipient of the Sitara-i-Khidmat civil award in 2020, presented by the President of
                Pakistan
              </cite>
            </p>
            <Button style="outline" size="large" icons={{ leading: true }}>
              Read More
            </Button>
          </div>
          <div className={styles.flexCol}>
            <Image src={CivilAward} alt="Civil award" className={styles.image} />
          </div>
        </div>
      </Container>
    </section>
  );
}
