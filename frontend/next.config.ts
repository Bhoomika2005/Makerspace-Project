import type { NextConfig } from "next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['makerspace.iiti.ac.in'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makerspace.iiti.ac.in',
        port: "",
        pathname: '/media/**',
      },
    ],
  },
}

module.exports = nextConfig

export default nextConfig;