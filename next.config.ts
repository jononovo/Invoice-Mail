import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["be32f71b-6536-49ae-96ef-c1be587f549d-00-24pamaniv5fki.kirk.replit.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
