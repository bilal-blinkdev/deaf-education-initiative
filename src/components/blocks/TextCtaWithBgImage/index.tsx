import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import DeafReachCampus from '@/assets/deaf-reach-campus.webp';
import styles from './styles.module.scss';

type TextCtaWithBgImageProps = {
  sectionClass: string;
  customClass?: string;
};

export default function TextCtaWithBgImage({ sectionClass, customClass }: TextCtaWithBgImageProps) {
  return (
    <section
      className={`${styles[sectionClass ?? '']} ${customClass}`}
      style={{
        backgroundImage: `url(${DeafReachCampus.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <div className={styles.flexBox}>
          <h2 className={styles.heading}>Organization Information</h2>
          <p className={styles.description}>
            Deaf Education Initiative is a UK-registered charity (charity number 1209822) that is
            committed to empowering underserved deaf children and youth in Pakistan. Through Deaf
            Reach, a program of DEI, we provide education, vocational training, job placements, and
            parent and teacher training programs to empower the Deaf Community in Pakistan.
          </p>
          <Button
            size="large"
            icons={{ leading: true }}
            link={{
              href: '/Registration_Certificate_1209822-20240924125950005XJCLCACQ.pdf',
              target: '_blank',
            }}
          >
            View Certification
          </Button>
        </div>
      </Container>
    </section>
  );
}
