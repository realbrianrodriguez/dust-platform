/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: {
    domains: [
      'ipfs.io',
      'ipfs.fleek.co',
      'cloudflare-ipfs.com',
      'gateway.pinata.cloud',
    ],
  },
};

module.exports = nextConfig; 