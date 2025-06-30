/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13+
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // WebSocket HMR fixes for better HMR reliability
    if (!isServer && dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 800, // Check for changes every 800ms
        aggregateTimeout: 300, // Delay the rebuild after the first change
      };
    }
    return config;
  },
}

module.exports = nextConfig
