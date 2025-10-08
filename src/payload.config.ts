import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { seoPlugin } from '@payloadcms/plugin-seo';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Donors } from './collections/Donors';
import { Categories } from './collections/Categories';
import { Authors } from './collections/Authors';
import { Publications } from './collections/Publications';
import { Events } from './collections/Events';
import { Programs } from './collections/Programs';
import { Footer } from './globals/Footer';
import { Pages } from './collections/Pages';
import { Header } from './globals/Header';
import { getServerSideURL } from '@/utils/getURL';
import { Page } from '@/payload-types';

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template';
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN === 'true'
        ? {
            // email: 'b+editor@p.com',
            // password: '1234',
            email: 'bilal@blinkco.io',
            password: 'BilalNasir@Y92',
          }
        : false,
  },
  globals: [Header, Footer],
  collections: [Users, Media, Pages, Donors, Categories, Authors, Publications, Events, Programs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      dbName: 'deiuk',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({ generateTitle, generateURL }),
    // storage-adapter-placeholder
  ],
});
