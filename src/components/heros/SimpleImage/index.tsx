import styles from './styles.module.scss';

import { Page } from '@/payload-types';

import { Media } from '@/components/elements/Media';

export const SimpleImage: React.FC<Page['hero']> = ({ media }) => {
  return (
    <section className={styles.hero}>
      {media && typeof media === 'object' && (
        <Media imgClassName={styles.image} priority resource={media} />
      )}
    </section>
  );
};
