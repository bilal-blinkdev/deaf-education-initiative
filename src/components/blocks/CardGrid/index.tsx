import Container from '@/components/layout/Container';
import { CardGrid as CardGridType } from '@/payload-types';
import { Media } from '@/components/elements/Media';
import GraduationCap from '@/graphics/GraduationCap';
import Monitor from '@/graphics/Monitor';
import SheetSigning from '@/graphics/SheetSigning';
import styles from './styles.module.scss';
import { getPaddingInRem } from '@/utils/getPaddingInRem';

type CardGridProps = {
  cardGrid: CardGridType;
};

const iconMap = {
  GraduationCap: GraduationCap,
  Monitor: Monitor,
  SheetSigning: SheetSigning,
};

export default function CardGrid({ cardGrid }: CardGridProps) {
  const { heading, subheading, description, cards, paddingTop, paddingBottom, colors } = cardGrid;

  return (
    <section
      className={styles.cards}
      style={{
        backgroundColor: colors?.backgroundColor || undefined,
        paddingTop: getPaddingInRem(paddingTop) || undefined,
        paddingBottom: getPaddingInRem(paddingBottom) || undefined,
      }}
    >
      <Container>
        {subheading && (
          <p className={styles.subHeading} style={{ color: colors?.headingColor || undefined }}>
            {subheading}
          </p>
        )}

        {heading && (
          <h2 className={styles.heading} style={{ color: colors?.headingColor || undefined }}>
            {heading}
          </h2>
        )}

        {description && (
          <p
            className={styles.description}
            style={{ color: colors?.descriptionColor || undefined }}
          >
            {description}
          </p>
        )}

        {cards && cards.length > 0 && (
          <section className={styles.cardsBox}>
            {cards.map((card, index) => {
              const IconComponent =
                card.iconType === 'predefined' && card.predefinedIcon
                  ? iconMap[card.predefinedIcon as keyof typeof iconMap]
                  : null;

              return (
                <div className={styles.card} key={index}>
                  <div className={styles.cardImage}>
                    {card.image && <Media resource={card.image} />}
                  </div>

                  {(card.iconType === 'predefined' || card.iconType === 'custom') && (
                    <div className={styles.cardIcon}>
                      {card.iconType === 'predefined' && IconComponent ? (
                        <IconComponent />
                      ) : card.iconType === 'custom' && card.customIcon ? (
                        <Media resource={card.customIcon} />
                      ) : null}
                    </div>
                  )}

                  <h3
                    className={styles.cardTitle}
                    style={{ color: colors?.cardTitleColor || undefined }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={styles.cardDescription}
                    style={{ color: colors?.cardDescriptionColor || undefined }}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </section>
        )}
      </Container>
    </section>
  );
}
