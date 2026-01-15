import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    quietDeps: true,
  },
  experimental: {
  },
  // @ts-expect-error - turbopack is not yet in NextConfig type
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;
