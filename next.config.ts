import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dashboard", destination: "/home", permanent: false },
      { source: "/pricing", destination: "/plan", permanent: false },
    ];
  },
};

export default nextConfig;
