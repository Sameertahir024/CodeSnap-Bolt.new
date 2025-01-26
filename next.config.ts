import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "startup-template-sage.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
