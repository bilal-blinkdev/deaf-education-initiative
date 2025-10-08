'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function HeadingRowLabel() {
  const { data } = useRowLabel<{ heading?: string }>();

  return <div>Key Metrics {data?.heading ? `- ${data.heading}` : ''}</div>;
}
