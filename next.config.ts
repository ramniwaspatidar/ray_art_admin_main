import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: [
        'localhost:3000',
        'localhost:4000',
         'https://manage-dev.thefoundery.in',
         'https://manage.thefoundery.in',



      ],
    },
  },
};

export default nextConfig;
