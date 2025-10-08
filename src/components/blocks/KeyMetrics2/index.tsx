import Container from '@/components/layout/Container';
import { KeyMetricsBlock } from '@/payload-types';
import { Media } from '@/components/elements/Media';
import Student from '@/graphics/Student';
import Employees from '@/graphics/Employees';
import Teacher from '@/graphics/Teacher';
import PeopleChatting from '@/graphics/PeopleChatting';
import Globe from '@/graphics/Globe';
import { getPaddingInRem } from '@/utils/getPaddingInRem';
import styles from './styles.module.scss';
type KeyMetricsProps = {
  keyMetrics: KeyMetricsBlock;
};

const iconMap = {
  Student: Student,
  Employees: Employees,
  Teacher: Teacher,
  PeopleChatting: PeopleChatting,
  Globe: Globe,
};

export default function KeyMetrics({ keyMetrics }: KeyMetricsProps) {
  const { heading, description, metrics, paddingTop, paddingBottom, colors } = keyMetrics;

  return (
    <section
      className={styles.keyMetrics}
      style={{
        background: colors?.mainBackgroundColor || undefined,
        paddingTop: getPaddingInRem(paddingTop) || undefined,
        paddingBottom: getPaddingInRem(paddingBottom) || undefined,
      }}
    >
      <Container>
        {heading && (
          <h2 className="heading__block" style={{ color: colors?.headingTextColor || undefined }}>
            {heading}
          </h2>
        )}

        {description && (
          <p
            className="description__block"
            style={{ color: colors?.descriptionTextColor || undefined }}
          >
            {description}
          </p>
        )}

        {metrics && metrics.length > 0 && (
          <section className={styles.metrics}>
            {metrics.map((metric, index) => {
              const IconComponent =
                metric.iconType === 'predefined' && metric.predefinedIcon
                  ? iconMap[metric.predefinedIcon as keyof typeof iconMap]
                  : null;

              return (
                <div className={styles.metric} key={index}>
                  <div className={styles.metricIcon}>
                    {metric.iconType === 'predefined' && IconComponent ? (
                      <IconComponent />
                    ) : metric.iconType === 'custom' && metric.customIcon ? (
                      <Media resource={metric.customIcon} />
                    ) : null}
                  </div>
                  <p className={styles.metricFigure}>{metric.numbers}</p>
                  <p className={styles.metricName}>{metric.text}</p>
                </div>
              );
            })}
          </section>
        )}
      </Container>
    </section>
  );
}
