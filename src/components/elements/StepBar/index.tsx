import styles from './styles.module.scss';

type StepBarProps = {
  numOfSteps: number;
  step: number;
  successMessage?: string;
};

export default function StepBar({ numOfSteps, step, successMessage }: StepBarProps) {
  const BAR_WIDTH = 840;
  const THUMB_WIDTH = '33.3%';
  return (
    <div className={styles.stepbar}>
      <p className={styles.stepbar__counter}>
        {successMessage ? successMessage : `Steps ${step} of ${numOfSteps}`}
      </p>
      <div className={styles.stepbar__bar}>
        <div
          className={[styles.stepbar__thumb].join(' ')}
          style={{ width: `${(100 / numOfSteps) * step}%` }}
        ></div>
      </div>
    </div>
  );
}
