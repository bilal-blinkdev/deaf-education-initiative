import type { Access } from 'payload';

export const isAdmin: Access = ({ req: { user } }) => {
  if (user && user.collection === 'users') {
    return Boolean(user?.roles?.includes('admin'));
  }

  return false;
};
