import { Fragment, ReactNode } from 'react';
import Container from '@/components/layout/Container';
import styles from './styles.module.scss';

type KeyMetricsProps = {
  keyMetrics: {
    content: {
      heading: { content: { format: string; text?: string }[] };
      subHeading?: string;
      description: { content: { format: string; text?: string }[] };
      metrics: {
        icon: ReactNode;
        numbers: string;
        text: string;
      }[];
    };
    colors?: {
      mainSection?: { bgColor: string };
      keyMetricsSection?: { bgColor: string };
      heading?: { textColor: string };
      subHeading?: { textColor: string };
      description?: { textColor: string };
      metrics?: { numbersColor: string; textColor: string };
    };
    customClass?: string;
  };
};

export default function KeyMetrics({ keyMetrics }: KeyMetricsProps) {
  const { content, colors, customClass } = keyMetrics;

  return (
    <section
      className={`${styles.keyMetrics}  ${styles[customClass ?? ''] ?? null}`}
      style={{ background: colors?.mainSection?.bgColor }}
    >
      <Container>
        {content?.subHeading && (
          <p className="sub_heading__block" style={{ color: colors?.subHeading?.textColor }}>
            {content.subHeading}
          </p>
        )}
        <h2 className="heading__block" style={{ color: colors?.heading?.textColor }}>
          {content?.heading.content &&
            content.heading.content.map((item, index) => (
              <Fragment key={index}>
                {item.format === 'bold' && <span className={styles.bold}>{item.text}</span>}
                {item.format === 'break' && <br />}
                {item.format === 'normal' && item.text}
              </Fragment>
            ))}
        </h2>
        {content?.description.content && (
          <p className="description__block" style={{ color: colors?.description?.textColor }}>
            {content.description.content.map((item, index) => (
              <Fragment key={index}>
                {item.format === 'bold' && <span className={styles.bold}>{item.text}</span>}
                {item.format === 'break' && <br />}
                {item.format === 'normal' && item.text}
              </Fragment>
            ))}
          </p>
        )}

        {content?.metrics && (
          <section className={styles.metrics}>
            {content.metrics.map((metric, index) => (
              <div className={styles.metric} key={index}>
                <div className={styles.metricIcon}>{metric.icon}</div>
                <p className={styles.metricFigure}>{metric.numbers}</p>
                <p className={styles.metricName}>{metric.text}</p>
              </div>
            ))}
          </section>
        )}
      </Container>
    </section>
  );
}
