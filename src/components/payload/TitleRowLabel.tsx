'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function TitleRowLabel() {
  const { data } = useRowLabel<{ title?: string }>();
  return <>{data?.title || 'Title'}</>;
}
