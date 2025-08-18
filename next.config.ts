import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize for production
  experimental: {
    optimizePackageImports: ['@payloadcms/next'],
  },
  // Handle images if needed
  images: {
    domains: ['localhost'],
  },
};

export default withPayload(nextConfig);
