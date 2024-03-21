/** @type {import('next').NextConfig} */
module.exports = {
  // NOTE: インターナルパッケージは、transpilePackages に設定する
  transpilePackages: ["@repo/ui", "@repo/math-helpers"],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};
