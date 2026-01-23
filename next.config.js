/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beeimg.com',
      },
    ],
  },
};

module.exports = nextConfig;
