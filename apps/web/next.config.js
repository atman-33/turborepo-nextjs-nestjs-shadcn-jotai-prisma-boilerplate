/** @type {import('next').NextConfig} */
module.exports = {
  // NOTE: 自作パッケージは、transpilePackages に設定する
  transpilePackages: ["@repo/web-ui", "@repo/shared-math-helpers"],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};
