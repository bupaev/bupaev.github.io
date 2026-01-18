import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    quietDeps: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
