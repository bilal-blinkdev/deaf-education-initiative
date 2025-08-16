import Container from '@/components/layout/Container';
import styles from './styles.module.scss';

type PageTitleProps = {
  title: string;
  breadcrumbs: string;
  description: string;
};
export default function PageTitle({ title, breadcrumbs, description }: PageTitleProps) {
  return (
    <section className={styles.pageTitle}>
      <Container>
        <ul className={styles.breadCrumbs}>
          <li className={styles.breadCrumbs__crumb}>{breadcrumbs}</li>
        </ul>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </Container>
    </section>
  );
}
