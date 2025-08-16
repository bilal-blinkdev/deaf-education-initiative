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
            Deaf Education Initiative, a program of FESFUK, is a U.K. based 501(c)(3) tax-exempt
            nonprofit organization (EIN 47-5488861) to support the education of underprivileged deaf
            children in Pakistan. Deaf Education Initiative supports Deaf Reach programs of the
            Family Educational Services Foundation (FESF) in Pakistan. To learn more about FESF
            Pakistan, visit their website. 
            <a href="/" className={styles.link}>
              www.fesf.org.pk
            </a>
          </p>
          <Button size="large" icons={{ leading: true }}>
            View Certification
          </Button>
        </div>
      </Container>
    </section>
  );
}
