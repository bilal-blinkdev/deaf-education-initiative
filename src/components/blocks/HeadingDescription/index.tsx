import styles from "./styles.module.scss";

type DeafGirlStudyingProps = {
  content: {
    heading: { text: string };
    subHeading?: string;
    description: { text: string };
  };
};

export default function HeadingDescription({ content }: DeafGirlStudyingProps) {
  return (
    <section className={styles.headingDescription}>
      {content.subHeading && (
        <p className={styles.subHeading}>{content.subHeading}</p>
      )}
      <h2 className={styles.heading}>{content.heading.text}</h2>
      <p className={styles.description}>{content.description.text}</p>
    </section>
  );
}
