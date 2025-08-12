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
      source: '/locationfromme',
      destination: '/location-from-me/locationfromme',
      permanent: true,
    },
    {
      source: '/location-from-location',
      destination: '/location-from-location/locationtolocation',
      permanent: true,
    },
    {
      source: '/location-from-location/:slug',
      destination: '/:slug',
      permanent: true,
    },
    {
      // Only redirect /location-from-me/:slug if slug is NOT 'locationfromme'
      source: '/location-from-me/:slug((?!locationfromme).*)',
      destination: '/:slug',
      permanent: true,
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
        source: '/:slug',
        destination: '/location-from-location/:slug',
      },
         {
        source: '/:slug',
        destination: '/location-from-me/:slug',
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