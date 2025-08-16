import Container from '@/components/layout/Container';

import Heading from '@/components/elements/Heading';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Paragraph from '@/components/elements/Paragraph';
import styles from './styles.module.scss';

type TextProps = {
  content: {
    heading: {
      align?: 'left' | 'right' | 'center' | 'justify';
      color?: string;
      text: string;
    };
    headingOverline: {
      align?: 'left' | 'right' | 'center' | 'justify';
      color?: string;
      text: string;
    };
    description: {
      align?: 'left' | 'right' | 'center' | 'justify';
      color?: string;
      text: string;
    };
  };
  sectionClass?: string;
  customClass?: string;
};

export default function Text({ content, sectionClass, customClass }: TextProps) {
  return (
    <section className={`${styles.text} ${styles[sectionClass ?? '']} ${customClass}`}>
      <Container customClass={styles.container}>
        <HeadingOverline
          align={content.headingOverline.align}
          color={content.headingOverline.color}
        >
          {content.headingOverline.text}
        </HeadingOverline>
        <Heading level={2} align={content.heading.align} color={content.heading.color}>
          {content.heading.text}
        </Heading>
        <Paragraph align={content.description.align} color={content.description.color}>
          {content.description.text}
        </Paragraph>
      </Container>
    </section>
  );
}
