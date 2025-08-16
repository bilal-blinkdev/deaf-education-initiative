import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import Link from 'next/link';
import ArrowUpRight from '@/graphics/ArrowUpRIght';
import styles from './styles.module.scss';
import HeadingOverline from '@/components/elements/HeadingOverline';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';

type Props = {
  content: {
    heading: { format?: string; text?: string };
    subHeading?: { format?: string; text?: string };
    description: { content: { format?: string; text?: string }[] };
    cards: {
      content: {
        image: StaticImageData;
        tags?: { name: string }[];
        title: string;
        description: string;
        link?: { href: string };
      };
      cta?: { link: { href: string }; text: string };
    }[];
    cta: { link: { href: string }; text: string };
  };
};

export default function TextCtaAndTwoCards({ content }: Props) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <HeadingOverline color="var(--dodger-blue)">{content.subHeading?.text}</HeadingOverline>
            <Heading level={2}>{content.heading.text}</Heading>
            {content.description.content.map((paragraph, index) => (
              <Paragraph key={index}>{paragraph.text}</Paragraph>
            ))}
            <Button size="large" width="maxContent" link={{ href: content.cta.link.href }}>
              {content.cta.text}
            </Button>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.cards}>
              {content.cards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <figcaption className={styles.card__figure}>
                    <Image src={card.content.image} className={styles.card__image} alt="" />
                  </figcaption>
                  {card.content.tags && (
                    <div className={styles.card__tags}>
                      {card.content.tags?.map((tag, index) => (
                        <div className={styles.card__tag} key={index}>
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={styles.card__title__wrapper}>
                    <h3 className={styles.card__title}>{card.content.title}</h3>
                    {card.content.link?.href && (
                      <Link href={card.content.link?.href} className={styles.card__link}>
                        <ArrowUpRight />
                      </Link>
                    )}
                  </div>
                  <p className={styles.card__description}>{card.content.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
