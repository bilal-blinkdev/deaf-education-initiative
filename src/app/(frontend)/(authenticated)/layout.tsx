import { redirect } from 'next/navigation';
import { getUser } from './_actions/getUser';

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const user = await getUser();

  if (!user) redirect('/login');

  return <>{children}</>;
}
