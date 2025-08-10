const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',  
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/location-from-me',
        destination: '/location-from-me/locationfromme',
        permanent: true, // set to false if this is temporary
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/card1/how-far-is-:destination-from-me',
        destination: '/card1/how-far-is-:destination-from-me', 
      },
      {
        source: '/card1/how-far-is-:destination-from-me/',
        destination: '/card1/how-far-is-:destination-from-me',
      }
    ];
  },
  experimental: {
    // Your experimental config
  },
  images: {
    domains: ['cdnjs.cloudflare.com', 'unpkg.com'],
  },
};

module.exports = nextConfig;