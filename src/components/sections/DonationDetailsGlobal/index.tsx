'use client';

import { useState } from 'react';
import DonationDetails from '../DonationDetails';
import { Project } from '@/payload-types';

type DonationDetailsGlobalProps = {
  projects: Project[];
  customClass?: string;
  slug?: string;
};
export default function DonationDetailsGlobal({
  projects,
  customClass,
  slug
}: DonationDetailsGlobalProps) {
  const [project, setProject] = useState(projects[0]);
  const [donationDetails, setDonationDetails] = useState({
    projectType: projects[0]?.name,
    supportType: 'Give Once',
    otherAmount: 0,
    donationType: 'Zakat',
    donationFixedAmount: projects[0]?.amountOptions[0]?.amount.toString() || '1',
  });

  return (
    <DonationDetails
      setProject={setProject}
      projects={projects}
      handleClick={() => {
        console.log('test');
      }}
      donationDetails={donationDetails}
      setDonationDetails={setDonationDetails}
      customClass={customClass}
      slug={slug}
    />
  );
}
