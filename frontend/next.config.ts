import type { NextConfig } from "next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['172.16.1.81'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.16.1.81',
        port: "",
        pathname: '/media/**',
      },
    ],
  },
}

module.exports = nextConfig

export default nextConfig;