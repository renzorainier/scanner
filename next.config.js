/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(wav)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
};

module.exports = withPlugins([withImages], nextConfig);
