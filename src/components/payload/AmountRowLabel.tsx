'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function AmountRowLabel() {
  const { data } = useRowLabel<{ amount?: string }>();
  return <>{data?.amount || 'Amount'}</>;
}
