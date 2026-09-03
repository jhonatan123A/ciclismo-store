/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Deshabilitar el telemetría
  telemetry: false,
};

module.exports = nextConfig;