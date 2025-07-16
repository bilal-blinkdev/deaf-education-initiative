import styles from "./styles.module.scss";

type StepBarProps = {
  numOfSteps: number;
  step: number;
  successMessage?: string;
};

export default function StepBar({
  numOfSteps,
  step,
  successMessage,
}: StepBarProps) {
  const BAR_WIDTH = 840;
  const THUMB_WIDTH = 280;
  return (
    <div className={styles.stepbar}>
      <p className={styles.stepbar__counter}>
        {successMessage ? successMessage : `Steps ${step} of ${numOfSteps}`}
      </p>
      <div className={styles.stepbar__bar} style={{ width: BAR_WIDTH }}>
        <div
          className={[styles.stepbar__thumb].join(" ")}
          style={{ width: THUMB_WIDTH * step }}
        ></div>
      </div>
    </div>
  );
}
