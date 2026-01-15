import type { NextConfig } from "next";

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
};

export default nextConfig;

