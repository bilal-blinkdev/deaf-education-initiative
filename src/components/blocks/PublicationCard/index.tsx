'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Publication } from '@/payload-types';

import Button from '@/components/elements/Button';
import Heading from '@/components/elements/Heading';
import Paragraph from '@/components/elements/Paragraph';
import styles from './styles.module.scss';
import { Media } from '@/components/elements/Media';
import SmartLink from '@/components/elements/SmartLink';
import OpenBook from '@/graphics/OpenBook';
import ArrowDownToArc from '@/graphics/ArrowDownToArc';

type PublicationCardProps = {
  publication: Publication;
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  // Destructure any other fields you added, like excerpt
  const { title, featuredImage, publishedAt, reportDocuments } = publication;

  // Safety check for featured image
  if (typeof featuredImage !== 'object' || !featuredImage.url) {
    return null; // Or render a placeholder
  }
  console.log(publication);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <figure className={styles.card__figure}>
          <Media resource={featuredImage} className={styles.card__image} />
        </figure>
      </div>

      <div className={styles.card__body}>
        {publishedAt && (
          <p className={styles.card__publishDate}>{format(new Date(publishedAt), 'dd MMM yyyy')}</p>
        )}
        <Heading level={3} className={styles.card__title}>
          {title}
        </Heading>

        <div className={styles.card__buttons}>
          {reportDocuments?.map((docItem) => {
            if (typeof docItem.document !== 'object' || !docItem.document.url) {
              return null;
            }
            const docUrl = docItem.document.url;
            const docLabel = docItem.title || 'Report Document';

            return (
              <div key={docItem.id} className={styles.card__buttonGroup}>
                {!docItem.allowDownload && (
                  <Link href={docUrl} target="_blank" className={styles.card__readButton}>
                    <span className={styles.readButton__title}>{docLabel}</span>
                    {/* <span className={styles.readButton__helpText}>Read Report</span> */}
                    <span className={styles.readButton__icon}>
                      {' '}
                      <OpenBook width="24" height="24" />
                    </span>
                  </Link>
                )}

                {docItem.allowDownload && (
                  <Link
                    href={docUrl}
                    target="_blank"
                    download={true}
                    className={styles.card__downloadButton}
                  >
                    <span className={styles.downloadButton__title}>{docLabel}</span>
                    {/* <span className={styles.downloadButton__helpText}>Download Report</span> */}
                    <span className={styles.downloadButton__icon}>
                      {' '}
                      <ArrowDownToArc width="24" height="24" color="var(--white)" />
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
