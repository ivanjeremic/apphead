/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
