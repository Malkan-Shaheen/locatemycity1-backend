// next.config.js
const { withNetlify } = require('@netlify/next');

module.exports = withNetlify({
  images: {
    domains: ['cdnjs.cloudflare.com', 'unpkg.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*'
      }
    ];
  }
});
