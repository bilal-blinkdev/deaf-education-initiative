import Container from '@/components/layout/Container';

import Heading from '@/components/elements/Heading';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Paragraph from '@/components/elements/Paragraph';
import styles from './styles.module.scss';
import { cn } from '@/utils/ui';

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
  containerClass?: string;
};

export default function Text({ content, sectionClass, containerClass }: TextProps) {
  return (
    <section className={cn(styles.text, sectionClass)}>
      <Container customClass={cn(styles.container, containerClass)}>
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
