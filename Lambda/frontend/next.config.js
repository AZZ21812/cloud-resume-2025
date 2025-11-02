/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_COUNTER_API: process.env.NEXT_PUBLIC_COUNTER_API,
    NEXT_PUBLIC_CHATBOT_API: process.env.NEXT_PUBLIC_CHATBOT_API,
  },
}

module.exports = nextConfig