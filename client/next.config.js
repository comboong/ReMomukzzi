const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  images: {
    disableStaticImages: true,
  },
});

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/server*",
        destination:
          "https://noqz6gs8ia.execute-api.ap-northeast-2.amazonaws.com/data*",
      },
    ];
  },
};

module.exports = nextConfig;
