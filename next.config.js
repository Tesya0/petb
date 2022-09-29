/** @type {import('next').NextConfig} */
const headers = require('./headers');

const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['images.dog.ceo'],
  },
  async headers() {
    return [
      {
        // 全てのパスに Security Headers を適用する
        source: '/(.*)',
        headers,
      },
    ];
  },
};

module.exports = nextConfig;
