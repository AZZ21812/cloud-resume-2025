/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export for S3 hosting
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_COUNTER_API: process.env.NEXT_PUBLIC_COUNTER_API || 'https://2ms252nedqgbwiys42j2xczxpu0ctegn.lambda-url.us-east-1.on.aws/',
    NEXT_PUBLIC_CHATBOT_API: process.env.NEXT_PUBLIC_CHATBOT_API || 'https://44vnpqjbuljusdcyw32mh3jheq0uzsoz.lambda-url.us-east-1.on.aws/',
  },

  // Trailing slash for S3 compatibility
  trailingSlash: true,
}

module.exports = nextConfig
