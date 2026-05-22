import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/my-tech-blog',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
