/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  experimental: {
    appDir: false, // Disable experimental app directory if using Server Actions
  },
};

module.exports = nextConfig;
