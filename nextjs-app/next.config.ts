import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages if using a project repo (not needed for user/org pages)
  // basePath: '',
  // assetPrefix: '',
}

export default nextConfig
