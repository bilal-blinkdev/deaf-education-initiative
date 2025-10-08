'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function LinkRowLabel() {
  const { data } = useRowLabel<{ linkText?: string }>();
  return <>{data?.linkText || 'Link'}</>;
}
