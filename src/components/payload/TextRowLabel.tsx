'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function TextRowLabel() {
  const { data } = useRowLabel<{ text?: string }>();
  return <>{data?.text || 'Title'}</>;
}
