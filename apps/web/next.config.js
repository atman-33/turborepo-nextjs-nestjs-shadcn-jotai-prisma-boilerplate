/** @type {import('next').NextConfig} */
module.exports = {
  // NOTE: インターナルパッケージは、transpilePackages に設定する
  transpilePackages: [
    "@repo/ui", 
    "@repo/data-access-graphql"
  ],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};
