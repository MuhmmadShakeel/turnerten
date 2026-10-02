/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    // Avoid Windows filesystem-cache dependency warnings from Next's SWC loader.
    if (!dev) config.cache = false;
    return config;
  },
};
export default nextConfig;
