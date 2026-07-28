import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS project. A stray package-lock.json one folder
  // up (…/Users/HP/) was making Next infer the wrong root, which corrupted the
  // Turbopack cache and caused ChunkLoadError on startup.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
