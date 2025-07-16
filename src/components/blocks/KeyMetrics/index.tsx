import { Fragment, ReactNode } from 'react';
import Container from '@/components/layout/Container';
import styles from './styles.module.scss';

type KeyMetricsProps = {
  keyMetrics: {
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
    bg: 'white' | 'darkblue';
  };
  customClass?: string;
};

export default function KeyMetrics({ keyMetrics, colors, customClass }: KeyMetricsProps) {
  return (
    <section
      className={`${styles.keyMetrics} ${styles[colors?.bg || 'white']} ${
        styles[customClass ?? ''] ?? null
      }`}
    >
      <Container>
        {keyMetrics?.subHeading && <p className={styles.subHeading}>{keyMetrics.subHeading}</p>}
        <h2 className={styles.heading}>
          {keyMetrics.heading.content &&
            keyMetrics.heading.content.map((item, index) => (
              <Fragment key={index}>
                {item.format === 'bold' && <span className={styles.bold}>{item.text}</span>}
                {item.format === 'break' && <br />}
                {item.format === 'normal' && item.text}
              </Fragment>
            ))}
        </h2>
        {keyMetrics.description.content && (
          <p className={styles.description}>
            {keyMetrics.description.content.map((item, index) => (
              <Fragment key={index}>
                {item.format === 'bold' && <span className={styles.bold}>{item.text}</span>}
                {item.format === 'break' && <br />}
                {item.format === 'normal' && item.text}
              </Fragment>
            ))}
          </p>
        )}

        {keyMetrics.metrics && (
          <section className={styles.metrics}>
            {keyMetrics.metrics.map((metric, index) => (
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
