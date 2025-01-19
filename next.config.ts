import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatar.vercel.sh"], // Allow external images from this domain
  },
};

export default nextConfig;
