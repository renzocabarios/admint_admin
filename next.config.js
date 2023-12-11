// in next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["arweave.net", "res.cloudinary.com"],
  },
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
