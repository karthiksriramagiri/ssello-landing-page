/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force rebuild timestamp: 2025-07-09 23:11:45 UTC
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
