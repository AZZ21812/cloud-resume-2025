/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_COUNTER_API: process.env.NEXT_PUBLIC_COUNTER_API || 'https://2ms252nedqgbwiys42j2xczxpu0ctegn.lambda-url.us-east-1.on.aws/',
    NEXT_PUBLIC_CHATBOT_API: process.env.NEXT_PUBLIC_CHATBOT_API || 'https://44vnpqjbuljusdcyw32mh3jheq0uzsoz.lambda-url.us-east-1.on.aws/',
  },
}

module.exports = nextConfig
