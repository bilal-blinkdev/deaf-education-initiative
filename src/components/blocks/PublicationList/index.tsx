'use client'; // This component needs to be a client component

import dynamic from 'next/dynamic';
import { Publication } from '@/payload-types';
import styles from './styles.module.scss';

// Dynamically import the PublicationCard component with SSR turned off
const PublicationCard = dynamic(() => import('@/components/blocks/PublicationCard'), {
  ssr: false,
  // loading: () => <p>Loading card...</p>, // Optional loading state
});

type PublicationsListProps = {
  publications: Publication[];
};

export default function PublicationsList({ publications }: PublicationsListProps) {
  console.log(publications);
  // The map loop and dynamic import happen here, on the client
  return (
    <div className={styles.cards}>
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
