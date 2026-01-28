// src/payload/collections/AnalyticsPlatforms.ts
import type { CollectionConfig, Validate } from 'payload';

export const AnalyticsPlatforms: CollectionConfig = {
  slug: 'analytics-platforms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'platform', 'enabled'],
    group: 'Settings',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Platform Name',
      admin: {
        description:
          'A descriptive name for this analytics instance (e.g., "Main Site GA4", "US Market Pixel")',
      },
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      label: 'Platform Type',
      options: [
        {
          label: 'Google Analytics 4',
          value: 'google-analytics',
        },
        {
          label: 'Google Tag Manager',
          value: 'google-tag-manager',
        },
        {
          label: 'Meta Pixel (Facebook)',
          value: 'meta-pixel',
        },
        {
          label: 'Meta Conversions API',
          value: 'meta-conversions-api',
        },
        {
          label: 'LinkedIn Insight Tag',
          value: 'linkedin-insight',
        },
      ],
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enabled',
      admin: {
        description: 'Enable or disable this analytics platform',
      },
    },
    // Google Analytics Configuration
    {
      name: 'gaTrackingId',
      type: 'text',
      label: 'GA4 Measurement ID',
      admin: {
        condition: (data) => data.platform === 'google-analytics',
        description: 'Format: G-XXXXXXXXXX',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'google-analytics') {
          if (!val) return 'GA4 Measurement ID is required';
          if (!val.match(/^G-[A-Z0-9]+$/)) {
            return 'Invalid GA4 Measurement ID format. Should start with G-';
          }
        }
        return true;
      }) as Validate,
    },
    {
      name: 'gaDebugMode',
      type: 'checkbox',
      label: 'Enable Debug Mode',
      admin: {
        condition: (data) => data.platform === 'google-analytics',
      },
    },
    // Google Tag Manager Configuration
    {
      name: 'gtmId',
      type: 'text',
      label: 'GTM Container ID',
      admin: {
        condition: (data) => data.platform === 'google-tag-manager',
        description: 'Format: GTM-XXXXXXX',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'google-tag-manager') {
          if (!val) return 'GTM Container ID is required';
          if (!val.match(/^GTM-[A-Z0-9]+$/)) {
            return 'Invalid GTM ID format. Should start with GTM-';
          }
        }
        return true;
      }) as Validate,
    },
    // Meta Pixel Configuration
    {
      name: 'metaPixelId',
      type: 'text',
      label: 'Meta Pixel ID',
      admin: {
        condition: (data) => data.platform === 'meta-pixel',
        description: 'Your Facebook Pixel ID (numeric)',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'meta-pixel') {
          if (!val) return 'Meta Pixel ID is required';
          if (!val.match(/^\d+$/)) {
            return 'Meta Pixel ID should be numeric';
          }
        }
        return true;
      }) as Validate,
    },
    // Meta Conversions API Configuration
    {
      name: 'metaConversionsApiPixelId',
      type: 'text',
      label: 'Pixel ID',
      admin: {
        condition: (data) => data.platform === 'meta-conversions-api',
        description: 'Your Meta Pixel ID (numeric)',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'meta-conversions-api') {
          if (!val) return 'Pixel ID is required';
          if (!val.match(/^\d+$/)) {
            return 'Pixel ID should be numeric';
          }
        }
        return true;
      }) as Validate,
    },
    {
      name: 'metaConversionsApiToken',
      type: 'text',
      label: 'Conversions API Access Token',
      admin: {
        condition: (data) => data.platform === 'meta-conversions-api',
        description: 'Your Meta Conversions API access token',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'meta-conversions-api' && !val) {
          return 'Access Token is required';
        }
        return true;
      }) as Validate,
    },
    {
      name: 'metaConversionsApiTestCode',
      type: 'text',
      label: 'Test Event Code (Optional)',
      admin: {
        condition: (data) => data.platform === 'meta-conversions-api',
        description: 'For testing events in Meta Events Manager',
      },
    },
    // LinkedIn Insight Tag Configuration
    {
      name: 'linkedinPartnerId',
      type: 'text',
      label: 'LinkedIn Partner ID',
      admin: {
        condition: (data) => data.platform === 'linkedin-insight',
        description: 'Your LinkedIn Partner ID',
      },
      validate: ((val, { data }) => {
        if (data.platform === 'linkedin-insight' && !val) {
          return 'LinkedIn Partner ID is required';
        }
        return true;
      }) as Validate,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        description: 'Internal notes about this analytics platform',
      },
    },
  ],
};
