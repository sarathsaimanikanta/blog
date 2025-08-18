import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Blog Manager',
      favicon: '/favicon.ico',
    },
  },
  collections: [
    {
      slug: 'posts',
      admin: {
        defaultColumns: ['title', 'author', 'createdAt'],
        useAsTitle: 'title',
        description: 'Manage your blog posts here.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 200,
          admin: {
            description: 'The title of your blog post',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The main content of your blog post',
          },
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          maxLength: 100,
          admin: {
            description: 'The author of this post',
          },
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            position: 'sidebar',
            readOnly: true,
            description: 'Auto-generated from title',
          },
          hooks: {
            beforeChange: [
              ({ data }) => {
                if (data?.title) {
                  return data.title
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                }
              },
            ],
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            position: 'sidebar',
            description: 'Feature this post on homepage',
          },
        },
      ],
      hooks: {
        afterChange: [
          ({ doc, operation }) => {
            console.log(`✅ Post ${operation}: ${doc.title}`);
          },
        ],
      },
    },
    {
      slug: 'users',
      auth: {
        tokenExpiration: 7200, // 2 hours
        verify: false, // Disable email verification for development
        maxLoginAttempts: 5,
        lockTime: 600000, // 10 minutes
      },
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'role'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name of the user',
          },
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Author', value: 'author' },
          ],
          defaultValue: 'author',
          required: true,
          admin: {
            description: 'User role and permissions',
          },
        },
      ],
    },
  ],
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
    connectOptions: {
      dbName: 'blog-manager', // Specify database name
    },
  }),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  csrf: [
    'http://localhost:3000',
    'https://localhost:3000',
  ],
});
