/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/web-ui", "@repo/shared-math-helpers"],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};
