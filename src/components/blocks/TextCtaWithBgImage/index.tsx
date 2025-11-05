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
            Deaf Education Initiative (Charity Commission No. 1209822) is a UK-registered charity
            that supports the education of underprivileged deaf children in Pakistan. The Initiative
            provides funding and strategic support for the Deaf Reach program run by the Family
            Educational Services Foundation (FESF) in Pakistan, ensuring access to schooling,
            transportation, and essential resources for deaf children and their families.
          </p>
          <Button size="large" icons={{ leading: true }}>
            View Certification
          </Button>
        </div>
      </Container>
    </section>
  );
}
