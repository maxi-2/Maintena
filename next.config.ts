import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // This ignores the TypeScript errors during build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "psuvigwmvtqoixkeuhxi.supabase.co",
        pathname: "/**", // allows all paths
      },
    ],
  },
  
};

export default nextConfig;
