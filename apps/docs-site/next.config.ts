import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yd-ds/ui", "@yd-ds/themes", "@yd-ds/tokens"],
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
