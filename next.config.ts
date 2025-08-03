import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://placehold.co/*")],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // or 'DENY'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
