import type { CollectionConfig } from 'payload';
import { protectRoles } from './hooks/protectRoles';
// import syncUserWithStripe from './hooks/syncUserWithStripe';
import editor from './access/editor';
import admin from './access/admin';
import viewer from './access/viewer';
import { checkRole } from './access/checkRole';
import { User } from '@/payload-types';

export const Users: CollectionConfig = {
  slug: 'users',
  // access: {
  //   create: admin,
  //   read: viewer,
  //   update: viewer,
  //   delete: admin,
  // },
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
  ],
};
