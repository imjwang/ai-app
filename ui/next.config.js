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
};

module.exports = nextConfig;
