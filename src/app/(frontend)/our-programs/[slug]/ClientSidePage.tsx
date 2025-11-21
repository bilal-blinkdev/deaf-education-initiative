import { Program, Project } from '@/payload-types';
import TwoColumnCard from '@/components/blocks/TwoColumnCard';
import SubscriptionBlock from '@/components/blocks/Subscription';
import MainBanner from '@/assets/programs/internal/boy-raising-hand-smiling.webp';
import Banner from '@/components/blocks/Banner';
import Text from '@/components/blocks/Text';
import Container from '@/components/layout/Container';
import HandDrawnUnderlines from '@/graphics/HandDrawnUnderlines';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import Image from 'next/image';
import ThreeLinesAccent from '@/graphics/ThreeLinesAccent';
import SwigglyLineAccent from '@/graphics/SwigglyLineAccent';
import DonationDetailsGlobal from '@/components/sections/DonationDetailsGlobal';
import styles from './styles.module.scss';
import { RenderHero } from '@/components/heros/RenderHero';

type OurProgramClientSideProps = {
  projects: Project[];
  program: Program;
  slug: string;
};

export default function OurProgramClientSide({
  projects,
  program,
  slug,
}: OurProgramClientSideProps) {
  const { hero, layout } = program;
  return (
    <>
      <RenderHero {...hero} slug={slug} />
      {layout?.map((block, index) => {
        if (block.blockType === 'pageIntro') {
          const textContent = {
            heading: {
              text: block.title,
              align: block.alignment || 'center',
              color: block.headingColor || undefined,
            },
            headingOverline: {
              text: block.overline || '',
              align: block.alignment || 'center',
              color: block.overlineColor || undefined,
            },
            description: {
              text: block.description || '',
              align: block.alignment || 'center',
            },
          };

          return <Text key={index} content={textContent} />;
        }
        if (block.blockType === 'imageGrid') {
          return (
            <section key={index} className={styles.imageGrid}>
              <Container>
                <div className={styles.imagesGrid}>
                  {block.images?.slice(0, 4).map((item, imgIndex) => {
                    if (typeof item.image !== 'object' || !item.image?.url) {
                      return null;
                    }
                    if (imgIndex === 1) {
                      return (
                        <div key={item.id} className={styles.imagesGrid__gridItem}>
                          <p className={styles.imageText}>
                            <span>{block.imageText}</span>
                            <span>
                              <HandDrawnUnderlines
                                color="var(--sandy-brown)"
                                svgClass={styles.handDrawnLinesIcon}
                              />
                            </span>
                          </p>
                          <div
                            className={styles.imagesGrid__imageContainer}
                            style={{
                              backgroundImage: `url("${item.image?.url}")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={item.id} className={styles.imagesGrid__gridItem}>
                        <div
                          className={styles.imagesGrid__imageContainer}
                          style={{
                            backgroundImage: `url("${item.image?.url}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }
        if (block.blockType === 'cardGrid') {
          return (
            <section key={index} className={styles.features}>
              <Container>
                <Heading level={2} align="center">
                  {block.heading}
                </Heading>
                <Paragraph align="center">{block.subheading}</Paragraph>
                <div className={styles.featureCards}>
                  {block.cards.map((card) => {
                    if (typeof card.image !== 'object' || !card.image?.url) {
                      return null;
                    }
                    if (
                      typeof card.image !== 'object' ||
                      !card.image?.url ||
                      !card.image.width ||
                      !card.image.height
                    ) {
                      return null;
                    }

                    return (
                      <div key={card.id} className={styles.featureCard}>
                        <figure className={styles.featureCardFigure}>
                          <Image
                            src={card.image.url}
                            width={card.image.width}
                            height={card.image.height}
                            alt={card.image.alt ?? ''}
                            className={styles.featureCardImage}
                          />
                        </figure>
                        <div className={styles.featureCardBody}>
                          <Heading
                            level={3}
                            color="var(--dark-blue)"
                            className={styles.featureCardTitle}
                          >
                            {card.title}
                          </Heading>
                          <Paragraph>{card.description}</Paragraph>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </section>
          );
        }
        if (block.blockType === 'donationForm') {
          return (
            <section key={index} className={styles.donation}>
              <Container>
                <div className={styles.donationForm}>
                  <DonationDetailsGlobal
                    projects={projects}
                    customClass={styles.forPrograms}
                    slug={slug}
                  />
                </div>
              </Container>
            </section>
          );
        }
      })}
      <section className={styles.video}>
        <Container>
          <Heading level={2} align="center">
            Making Education a Reality for Deaf Children
          </Heading>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'visible',
              borderRadius: '12px',
              border: 'thick solid var(--sandy-brown)',
            }}
          >
            <div className={styles.video__videoBottomLeft}>
              <ThreeLinesAccent />
            </div>
            <div className={styles.video__videoTopRight}>
              <SwigglyLineAccent />
            </div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hSLYfnMlXpI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            ></iframe>
          </div>
        </Container>
      </section>
      <TwoColumnCard />
      <SubscriptionBlock />
    </>
  );
}
