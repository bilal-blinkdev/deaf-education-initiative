import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import Button from '@/components/elements/Button';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';

type TwoColumnCardProps = {
  content: {
    title: string;
    titleOverline?: string;
    description: string;
    button?: {
      label: string;
      href: string;
    };
    image: {
      src: string | StaticImageData;
      alt: string;
    };
  };
  colOneBg?: string;
  imageRadius?: string;
  imageShadow?: string;
  titleColor?: string;
  titleOverlineColor?: string;
  descriptionColor?: string;
};

export default function TwoColumnCard2({
  content,
  colOneBg,
  imageRadius,
  imageShadow,
  titleColor,
  titleOverlineColor,
  descriptionColor,
}: TwoColumnCardProps) {
  return (
    <section className={styles.twoColumnCard2}>
      <Container>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <div className={styles.colOne} style={{ backgroundColor: colOneBg }}>
              {content.titleOverline && (
                <HeadingOverline color={titleOverlineColor}>
                  {content.titleOverline}
                </HeadingOverline>
              )}
              <Heading level={3} className={styles.title} color={titleColor}>
                {content.title}
              </Heading>
              <Paragraph className={styles.description} color={descriptionColor}>
                {content.description}
              </Paragraph>
              {content.button && (
                <Button size="large" width="maxContent" link={{ href: content.button.href }}>
                  {content.button.label}
                </Button>
              )}
            </div>
            <div className={styles.colTwo}>
              <div className={styles.imageHolder}>
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  className={styles.image}
                  style={{
                    borderRadius: imageRadius,
                    boxShadow: imageShadow,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
