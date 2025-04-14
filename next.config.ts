import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },
  // 빌드 시 lint 무시
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
