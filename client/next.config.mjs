// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
  
    images: {
      domains: ['example.com'],
    },
  
    webpack(config, options) {
      return config;
    },
  
 
    async redirects() {
      return [
        {
          source: '/old-route',
          destination: '/new-route',
          permanent: true,
        },
      ];
    },
  
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  