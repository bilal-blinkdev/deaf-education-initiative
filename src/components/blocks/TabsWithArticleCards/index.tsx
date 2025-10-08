'use client';

import Image, { StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import SchoolGirlsRaisingHands from '@/assets/school-girls-raising-hands.webp';
import Heading from '@/components/elements/Heading';
import QuestionMarkRoundedFilled from '@/graphics/QuestionMarkRoundedFilled';
import Paragraph from '@/components/elements/Paragraph';
import { useState } from 'react';
import Link from 'next/link';
import ArrowUpRight from '@/graphics/ArrowUpRIght';
import styles from './styles.module.scss';

type ImageType = {
  url: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
};

type Tab = {
  id: string;
  label: string;
};

export type Card = {
  id: string;
  image: ImageType;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; image: ImageType };
  duration: string;
  link: { href: string };
};

type TabsWithCardsProps = {
  tabs: Tab[];
  cards: Card[];
};

export default function TabsWithArticleCards({ tabs, cards }: TabsWithCardsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCards =
    activeTab === 'all' ? cards : cards.filter((card) => card.category.toLowerCase() === activeTab);
  return (
    <section className={styles.tabsWithCards}>
      <Container>
        <div className={styles.tabsWithCards__tabs}>
          {tabs.map((tab) => (
            <Button
              style="text"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              customClass={`${styles.tabsWithCards__tab} ${
                activeTab === tab.id ? styles.active : undefined
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className={styles.tabsWithCards__articleCards}>
          {filteredCards.map((card) => (
            <div className={styles.articleCard} key={card.id}>
              <div className={styles.articleCard__header}>
                <figcaption className={styles.articleCard__figure}>
                  <Image
                    src={card.image.url}
                    className={styles.articleCard__image}
                    width={card.image.width}
                    height={card.image.height}
                    alt={card.image.alt}
                  />
                </figcaption>
              </div>

              <div className={styles.articleCard__body}>
                <div className={styles.articleCard__tags}>
                  <div className={styles.articleCard__tag}>{card.category}</div>
                  <div className={styles.articleCard__tag}>{card.duration}</div>
                </div>
                <div className={styles.articleCard__title__wrapper}>
                  <h3 className={styles.articleCard__title}>{card.title}</h3>
                  {card.link?.href && (
                    <Link href={card.link?.href} className={styles.articleCard__link}>
                      <ArrowUpRight />
                    </Link>
                  )}
                </div>
                <p className={styles.articleCard__description}>{card.excerpt}</p>
              </div>

              <div className={styles.articleCard__footer}>
                <div className={styles.articleCard__meta}>
                  <Image
                    src={card.author.image.url}
                    width={card.author.image.width}
                    height={card.author.image.height}
                    className={styles.articleCard__authorImage}
                    alt={card.author.image.alt}
                  />
                  <div>
                    <p className={styles.articleCard__authorName}>{card.author.name}</p>
                    <p className={styles.articleCard__publishDate}>{card.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
