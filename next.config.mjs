import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    // Avoid Windows filesystem-cache dependency warnings from Next's SWC loader.
    if (!dev) config.cache = false;
    return config;
  },
};

export default (phase) => ({
  ...baseConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
