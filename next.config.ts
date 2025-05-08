import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // This ignores the TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
