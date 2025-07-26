/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // Proxy to Express
      },
    ];
  },
  experimental: {
  
  },
  images: {
    domains: ['cdnjs.cloudflare.com', 'unpkg.com'],
  },
};

module.exports = nextConfig;
