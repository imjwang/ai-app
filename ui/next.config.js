/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
