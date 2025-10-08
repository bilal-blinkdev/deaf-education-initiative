import { FieldHook } from 'payload';
import type { User } from '@/payload-types';

export const protectRoles: FieldHook<{ id: string } & User> = ({ req, data }) => {
  if (req.user?.collection === 'users') {
    const isAdmin = req.user?.roles?.includes('admin');

    if (!isAdmin) {
      return ['viewer'];
    }

    const UserRoles = new Set(data?.roles || []);
    UserRoles.add('viewer');
    return [...UserRoles.values()];
  }
};
